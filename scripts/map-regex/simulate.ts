// Сквозная проверка: собирает карты из реальных строк модов, строит строку поиска настоящим buildRegex
// и вычисляет подсветку так, как это делает игра. Проверяет оба режима регистра и оба способа склейки строк.
//
//   npx tsx scripts/map-regex/simulate.ts [mods.json]   (по умолчанию — моды из data/maps.sqlite)
import { readFileSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import { buildRegex } from "~/pages/maps/regex-area/context/buildRegex";
import { initialMapsContextState, type MapsStore } from "~/pages/maps/context/maps";
import { loadPoedb, matchMods, skeleton } from "./lib.mjs";

type Mod = { id: number; name: string; regex: string; variants: string[][] };

function loadDbMods() {
  if (process.argv[2]) return JSON.parse(readFileSync(process.argv[2], "utf8"));
  const db = new DatabaseSync(new URL("../../data/maps.sqlite", import.meta.url).pathname, { readOnly: true });
  try {
    return db.prepare("select id, name, rank, regex from maps order by id").all();
  } finally {
    db.close();
  }
}

/** Вычисляет подсветку предмета строкой поиска PoE: термы в кавычках через AND, "!" — отрицание. */
function highlights(search: string, itemText: string, caseInsensitive: boolean) {
  const terms = [...search.matchAll(/"([^"]*)"/g)].map((m) => m[1]);
  return terms.every((term) => {
    const negate = term.startsWith("!");
    const re = new RegExp(negate ? term.slice(1) : term, caseInsensitive ? "im" : "m");
    return re.test(itemText) !== negate;
  });
}

const SERVICE = ["Класс предмета: Карты", "Карта взморья", "Уровень карты: 16", "Количество предметов: +80%", "Редкость предметов: +40%", "Размер групп монстров: +25%"];

const poedb = loadPoedb();
const { matched } = matchMods(loadDbMods(), poedb) as { matched: Mod[] };
const pool = poedb.filter((m: { group: string }) => m.group === "normal").map((m: { lines: string[] }) => m.lines.filter((l) => !/[a-z]/i.test(l) && !/найденных предметов|групп монстров|больше находим/.test(l))).filter((l: string[]) => l.length);

let seed = 42;
const rand = (n: number) => ((seed = (seed * 1103515245 + 12345) % 2 ** 31), seed % n);

// Мод присутствует на карте, если все строки одного из его вариантов есть на карте дословно
// (значения модов карт фиксированы для тира, поэтому T17 +50% и обычный +40% — разные моды).
const hasMod = (lines: string[], mod: Mod) => {
  const set = new Set(lines);
  return mod.variants.some((v) => v.every((l) => set.has(l)));
};

function randomMap(force?: string[]) {
  const mods = Array.from({ length: 1 + rand(6) }, () => pool[rand(pool.length)]);
  if (force) mods.splice(rand(mods.length + 1), 0, force);
  const rarity = mods.length > 2 ? "Редкий" : "Волшебный";
  const lines = mods.flat();
  return { lines, rarity };
}

const store = (patch: Partial<MapsStore>): MapsStore => ({ ...initialMapsContextState(), ...patch });

// Мод, текст которого (без учёта чисел) целиком состоит из строк других модов (T17 = сумма двух-трёх обычных).
// Одним regex его не отличить: "исключить, если есть A и B" синтаксисом поиска PoE не выразить.
const skeletons = (mod: Mod) => new Set(mod.variants.flat().map(skeleton));
const ambiguous = new Set(
  matched
    .filter((mod) => {
      const others = new Set(matched.filter((o) => o.id !== mod.id).flatMap((o) => [...skeletons(o)]));
      return [...skeletons(mod)].every((l) => others.has(l));
    })
    .map((mod) => mod.id),
);

let failures = 0;
let expected = 0;
let checks = 0;
const fail = (msg: string) => {
  if (failures++ < 25 || process.env.ALL) console.log("FAIL", msg);
};
// Ложное срабатывание на неразличимом моде, когда на карте есть часть его строк — ожидаемо.
const partOf = (lines: string[], mod: Mod) => lines.some((l) => skeletons(mod).has(skeleton(l)));

for (const caseInsensitive of [true, false]) {
  for (const joiner of ["\n", " "]) {
    const text = (map: { lines: string[]; rarity: string }) =>
      [SERVICE[0], `Редкость: ${map.rarity}`, ...SERVICE.slice(1), ...map.lines].join(joiner);
    const mode = `[${caseInsensitive ? "без учёта" : "с учётом"} регистра, строки через ${JSON.stringify(joiner)}]`;

    for (const mod of matched) {
      for (let i = 0; i < 150; i++) {
        const withMod = i % 2 === 0;
        const map = randomMap(withMod ? mod.variants[rand(mod.variants.length)] : undefined);
        const present = hasMod(map.lines, mod);
        const t = text(map);

        // Исключение мода: подсвечено ⇔ мода нет
        checks++;
        const exclude = highlights(buildRegex(store({ negativeMods: [{ id: mod.id, regex: mod.regex }] })), t, caseInsensitive);
        if (exclude === present && !present && ambiguous.has(mod.id) && partOf(map.lines, mod)) expected++;
        else if (exclude === present) fail(`${mode} исключение #${mod.id} "${mod.regex}" ${present ? "не убрало" : "убрало"} карту:\n    ${map.lines.join(" | ")}`);

        // Включение мода: подсвечено ⇔ мод есть
        checks++;
        const include = highlights(buildRegex(store({ positiveMods: [{ id: mod.id, regex: mod.regex }] })), t, caseInsensitive);
        if (include !== present && !present && ambiguous.has(mod.id) && partOf(map.lines, mod)) expected++;
        else if (include !== present) fail(`${mode} включение #${mod.id} "${mod.regex}" ${present ? "не нашло" : "нашло лишнюю"} карту:\n    ${map.lines.join(" | ")}`);
      }
    }

    // Чекбоксы редкости / неопознанных / осквернённых
    for (const rarity of ["Волшебный", "Редкий"]) {
      const map = { ...randomMap(), rarity };
      checks++;
      const s = buildRegex(store({ includeMagicMaps: true }));
      if (highlights(s, text(map), caseInsensitive) !== (rarity === "Волшебный")) fail(`${mode} фильтр редкости "${s}" на ${rarity}`);
    }
    for (const corrupted of [true, false]) {
      const map = randomMap(["Область имеет участки осквернённой земли"]);
      const t = text(map) + (corrupted ? `${joiner}Осквернено` : "");
      checks++;
      if (highlights(buildRegex(store({ includeCorruptedMaps: true })), t, caseInsensitive) !== corrupted) fail(`${mode} фильтр осквернённых, осквернена=${corrupted}`);
      checks++;
      if (highlights(buildRegex(store({ includeUnidentifiedMaps: true })), `${t}${joiner}Неопознано`, caseInsensitive) !== true) fail(`${mode} фильтр неопознанных`);
    }
  }
}

console.log(`моды, составленные из строк других модов: ${[...ambiguous].map((id) => `#${id}`).join(", ")} (ожидаемых срабатываний: ${expected})`);
console.log(`проверок: ${checks}, ошибок: ${failures}`);
process.exit(failures ? 1 : 0);
