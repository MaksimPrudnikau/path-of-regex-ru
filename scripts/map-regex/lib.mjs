import { readFileSync } from "node:fs";

// Строки модов, которые игра не показывает на предмете: они суммируются в свойства карты
// ("Количество предметов", "Больше карт" и т.д.).
const HIDDEN = /увеличение количества найденных предметов|повышение редкости найденных предметов|увеличение размера групп монстров|больше находим/i;

// Текст, который есть на любой карте независимо от модов. Regex мода не должен его задевать.
export const SERVICE_LINES = [
  "Класс предмета: Карты",
  "Редкость: Обычный",
  "Редкость: Волшебный",
  "Редкость: Редкий",
  "Редкость: Уникальный",
  "Карта взморья",
  "Уровень карты: 16",
  "Ур. карты: 16",
  "Качество: +20%",
  "Количество предметов: +80%",
  "Редкость предметов: +40%",
  "Размер групп монстров: +25%",
  "Больше валюты: +40%",
  "Больше карт: +30%",
  "Больше скарабеев: +30%",
  "Больше гадальных карт: +30%",
  "Неопознано",
  "Осквернено",
  "Перейдите на карту этого или более низкого уровня, использовав этот предмет в вашей Машине картоходца. Карты одноразовые.",
  "Область находится под влиянием Создателя",
  "Область находится под влиянием Древнего",
];

// Названия в БД расходятся с текстом в игре (моды переписали в патчах).
// Ключ — скелет названия из БД, значение — скелет реального текста.
const ALIASES = {
  "монстры отражают #% физического урона":
    "редкие монстры обладают физическими шипами, отражая # физического урона",
  "монстры отражают #% урона от стихий":
    "редкие монстры обладают стихийными шипами, отражая # урона от стихий",
  "монстры отражают #% урона от стихий || монстры отражают #% физического урона":
    "редкие монстры обладают стихийными шипами, отражая # урона от стихий || редкие монстры обладают физическими шипами, отражая # физического урона",
  "#% увеличение количества редких монстров || редкие монстры обладают # дополнительным свойством":
    "#% увеличение количества редких монстров || редкие монстры обладают # дополнительными свойствами",
  "на уникальных монстров действует случайный положительный эффект алтарей":
    "на уникальных монстров действует случайных положительных эффектов алтарей: #",
};

const lc = (s) => s.toLowerCase();

/** Скелет строки: числа и диапазоны заменены на #, без учёта регистра и ё. */
export const skeleton = (s) =>
  lc(s)
    .replace(/ё/g, "е")
    .replace(/\(\s*[-+]?\d+\s*-\s*[-+]?\d+\s*\)/g, "#")
    .replace(/[-+]?\d+(\.\d+)?/g, "#")
    .replace(/[-+]#/g, "#")
    .replace(/;/g, ",")
    .replace(/\s+/g, " ")
    .trim();

// Строки без латиницы — латиницей poedb показывает скрытые служебные статы.
const visible = (lines) => lines.filter((l) => !HIDDEN.test(l) && !/[a-z]/i.test(l));
const keyOf = (lines) => [...new Set(lines.map(skeleton))].sort().join(" || ");

export function loadPoedb() {
  return JSON.parse(readFileSync(new URL("./data/poedb-map-mods.json", import.meta.url), "utf8"));
}

/**
 * Сопоставляет моды из БД с реальными модами poedb.
 * Возвращает моды с полем variants: строки мода, как они выглядят в игре, для каждого тира.
 */
export function matchMods(dbMods, poedb) {
  const byKey = new Map();
  for (const mod of poedb.filter((m) => m.group === "normal")) {
    const key = keyOf(visible(mod.lines));
    if (!key) continue;
    if (!byKey.has(key)) byKey.set(key, []);
    byKey.get(key).push(mod);
  }

  const matched = [];
  const missing = [];
  for (const mod of dbMods) {
    const lines = mod.name.split(" · ").filter((l) => !HIDDEN.test(l));
    const key = keyOf(lines);
    const hit = byKey.get(ALIASES[key] ?? key);
    if (!hit) {
      missing.push(mod);
      continue;
    }
    // T17 и обычный мод часто имеют одинаковый текст и отличаются только значениями —
    // оставляем варианты, значения которых попадают в диапазоны из названия мода.
    const inRange = hit.filter((m) => valuesFit(lines, visible(m.lines)));
    const sources = inRange.length ? inRange : hit;
    matched.push({ ...mod, variants: sources.map((m) => visible(m.lines)), sources });
  }
  return { matched, missing };
}

// Числа строки: "(20-40)" → [20, 40], "15" → [15, 15]; знаки не учитываются.
const ranges = (line) =>
  [...line.matchAll(/\((\d+)\s*-\s*(\d+)\)|(\d+)/g)].map(([, a, b, n]) =>
    n ? [+n, +n] : [Math.min(+a, +b), Math.max(+a, +b)],
  );

function valuesFit(nameLines, variantLines) {
  return nameLines.every((nameLine) => {
    const line = variantLines.find((l) => skeleton(l) === skeleton(nameLine));
    if (!line) return true;
    const expected = ranges(nameLine);
    const actual = ranges(line).map(([n]) => n);
    return actual.every((n, i) => !expected[i] || (n >= expected[i][0] && n <= expected[i][1]));
  });
}

/**
 * Текст, который regex мода не должен находить.
 * strict — запрещены строки всех других модов; иначе разрешены строки, совпадающие с нашими
 * (например, T17-мод включает строку обычного мода целиком — их не различить).
 */
export function forbiddenCorpus(mod, poedb, strict) {
  const own = new Set(mod.variants.flat().map(skeleton));
  const ownSources = new Set(mod.sources);
  const all = poedb.filter((m) => !ownSources.has(m));
  const lines = all
    .flatMap((m) => m.lines)
    .filter((l) => !/[a-z]/i.test(l))
    .filter((l) => strict || !own.has(skeleton(l)));

  const corpus = [...new Set([...lines, ...SERVICE_LINES])].map(lc);

  // Стыки соседних строк: если игра склеивает строки через пробел/перенос,
  // regex с пробелом может поймать конец одной строки и начало другой.
  const tails = [...new Set(corpus.map((l) => l.slice(-12)))];
  const heads = [...new Set(corpus.map((l) => l.slice(0, 12)))];
  for (const t of tails) for (const h of heads) corpus.push(`${t} ${h}`, `${t}\n${h}`);
  return corpus;
}

// Неизвестно наверняка, учитывает ли поиск в игре регистр, поэтому regex должен работать в обоих режимах:
// свой мод находить с учётом регистра (тогда найдёт и без учёта), а чужой текст не задевать без учёта
// регистра (тогда не заденет и с учётом).
export const toRegExp = (regex) => new RegExp(regex, "i");
export const toCaseSensitiveRegExp = (regex) => new RegExp(regex);

/** Regex находит мод на карте любого тира. */
export const matchesMod = (re, mod) => mod.variants.every((lines) => lines.some((l) => re.test(l)));

export const hits = (re, corpus) => corpus.filter((l) => re.test(l));

/**
 * Кандидаты в regex мода — подстроки его реального текста, от коротких к длинным.
 * literal: числа остаются как есть (нужно, чтобы отличить T17-мод от обычного с тем же текстом,
 * у них разные значения); иначе числа заменяются на \d+.
 */
export function candidates(mod, literal = false) {
  const DIGITS = "\u0001";
  const set = new Set();
  for (const line of mod.variants.flat()) {
    const s = literal ? line : line.replace(/\d+/g, DIGITS);
    for (let len = 3; len <= 20; len++) {
      for (let i = 0; i + len <= s.length; i++) {
        const c = s.slice(i, i + len);
        // число не должно обрезаться посередине: "500" найдёт и "1500"
        if (literal && (/\d/.test(s[i - 1] ?? "") && /^\d/.test(c) || /\d$/.test(c) && /\d/.test(s[i + len] ?? ""))) continue;
        const chars = literal ? /^[а-яё\d][а-яё\d ,%]*[а-яё%\d]$/i : /^[а-яё\u0001][а-яё ,%\u0001]*[а-яё%]$/i;
        if (chars.test(c) && !/ {2}/.test(c) && /[а-яё]{2}/i.test(c) && (!literal || /\d/.test(c))) {
          set.add(c.replaceAll(DIGITS, "\\d+"));
        }
      }
    }
  }
  const score = (c) =>
    c.length * 10 + (c.match(/ /g)?.length ?? 0) * 3 + (c.includes(",") ? 5 : 0) + (c.includes("\\d") ? 15 : 0);
  return [...set]
    .filter((c) => matchesMod(toCaseSensitiveRegExp(c), mod))
    .sort((a, b) => score(a) - score(b) || a.localeCompare(b));
}

/** Проверяет текущий regex мода и при необходимости подбирает новый. */
export function checkMod(mod, poedb) {
  const strict = forbiddenCorpus(mod, poedb, true);
  const relaxed = forbiddenCorpus(mod, poedb, false);
  const re = toRegExp(mod.regex);

  const problems = [];
  if (!matchesMod(re, mod)) problems.push("не находит свой мод в игре");
  else if (!matchesMod(toCaseSensitiveRegExp(mod.regex), mod)) problems.push("не находит свой мод с учётом регистра");
  const foreign = hits(re, relaxed);
  if (foreign.length) problems.push(`ловит чужой текст: ${foreign.slice(0, 2).map((l) => JSON.stringify(l.slice(0, 60))).join(", ")}`);

  const list = candidates(mod);
  const clean = (corpus) => (c) => !hits(toRegExp(c), corpus).length;
  const best =
    list.find(clean(strict)) ?? candidates(mod, true).find(clean(strict)) ?? list.find(clean(relaxed));

  // Текущий regex корректен, но ловит и T17/обычный аналог, хотя есть точнее
  if (!problems.length && hits(re, strict).length && best && !hits(toRegExp(best), strict).length) {
    problems.push("ловит T17/обычный аналог, есть точнее");
  }

  return { problems, suggestion: problems.length ? best : mod.regex };
}
