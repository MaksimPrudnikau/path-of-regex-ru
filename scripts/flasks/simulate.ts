import type { FlaskBase, FlaskData, FlaskMod, FlaskTier } from "~/pages/flasks/data";
import { MAX_REGEX_LENGTH, type WindowInput } from "~/pages/flasks/regex-panel/buildFlaskRegex";
import { buildFlaskSearches } from "~/pages/flasks/regex-panel/buildFlaskSearches";
import { loadCorpus, loadFlasks, SERVICE_LINES } from "./lib.mjs";

type Affix = { mod: FlaskMod; tier: number };
type Flask = { base: FlaskBase; prefix?: Affix; suffix?: Affix; lines: string[] };
type Scenario = { title: string; windows: WindowInput[] };

const RANDOM_SCENARIOS = 300;
const RANDOM_WINDOW_SCENARIOS = 200;
const RANDOM_FLASKS_PER_SCENARIO = 1500;
const MAX_REPORTED_ERRORS = 20;
const KIND_CLASSES = { life: "Флаконы жизни", mana: "Флаконы маны", utility: "Особые флаконы" };

let seed = 42;

const data: FlaskData = loadFlasks();
const corpus: { texts: string[] } = loadCorpus();
const sharedNames = sharedTierNames();
const neutralTexts = unownedTexts();
const flasks = allFlasks();
const errors: string[] = [];
let checks = 0;
let expected = 0;

for (const scenario of scenarios()) {
  const searches = buildFlaskSearches(scenario.windows, data);
  if (searches.some((search) => search.length > MAX_REGEX_LENGTH)) continue;
  for (const flask of scenarioFlasks(scenario)) checkFlask(scenario, searches, flask);
}

console.log(`флаконов: ${flasks.length}, одинаковые названия тиров: ${[...sharedNames].join(", ") || "нет"} (ожидаемых срабатываний: ${expected})`);
for (const error of errors.slice(0, MAX_REPORTED_ERRORS)) console.log(error);
console.log(`проверок: ${checks}, ошибок: ${errors.length}`);
process.exitCode = errors.length > 0 ? 1 : 0;

function checkFlask(scenario: Scenario, searches: string[], flask: Flask) {
  const wanted = scenario.windows.map((window) => isWanted(flask, window));
  const shouldMatch = wanted.some(Boolean);
  for (const joiner of ["\n", " "]) {
    const text = flask.lines.join(joiner);
    for (const caseInsensitive of [false, true]) {
      checks++;
      if (searches.some((search) => highlights(search, text, caseInsensitive)) === shouldMatch) continue;
      if (hasSharedName(flask)) {
        expected++;
        continue;
      }
      const mode = `${caseInsensitive ? "без регистра" : "с регистром"}, строки через ${JSON.stringify(joiner)}`;
      errors.push(`${scenario.title} (${mode}): ${shouldMatch ? "не подсвечен" : "лишняя подсветка"} «${flask.lines[2]}», строки ${searches.join(" ; ")}`);
    }
  }
}

function isWanted(flask: Flask, input: WindowInput): boolean {
  if (input.bases.length > 0 && !input.bases.includes(flask.base.id)) return false;
  const wanted = (affix?: Affix) => affix !== undefined && affix.tier < (input.mods[affix.mod.id] ?? 0);
  const hasSelected = (kind: string) => data.mods.some((mod) => mod.affix === kind && input.mods[mod.id] !== undefined);
  const prefixOk = wanted(flask.prefix);
  const suffixOk = wanted(flask.suffix);
  if (input.matchBoth) return (!hasSelected("prefix") || prefixOk) && (!hasSelected("suffix") || suffixOk);
  return (!hasSelected("prefix") && !hasSelected("suffix")) || prefixOk || suffixOk;
}

function highlights(search: string, text: string, caseInsensitive: boolean): boolean {
  const terms = [...search.matchAll(/"([^"]*)"/g)].map((m) => m[1]);
  return terms.every((term) => {
    const negate = term.startsWith("!");
    const re = new RegExp(negate ? term.slice(1) : term, caseInsensitive ? "im" : "m");
    return re.test(text) !== negate;
  });
}

function scenarios(): Scenario[] {
  const tiers = data.mods.flatMap((mod) =>
    mod.tiers.map((_, index) => ({
      title: `${mod.id} T1-T${index + 1}`,
      windows: [{ bases: [], matchBoth: true, mods: { [mod.id]: index + 1 } }],
    })),
  );
  const bases = data.bases.map((base) => single(`база ${base.name}`, { bases: [base.id], matchBoth: true, mods: {} }));
  const kinds = Object.keys(data.kinds).map((kind) =>
    single(`все базы ${kind}`, { bases: data.bases.filter((base) => base.kind === kind).map((base) => base.id), matchBoth: true, mods: {} }),
  );
  const randomSingle = Array.from({ length: RANDOM_SCENARIOS }, (_, index) => single(`случайный выбор #${index + 1}`, randomInput()));
  const windows = Array.from({ length: RANDOM_WINDOW_SCENARIOS }, (_, index) => ({
    title: `несколько окон #${index + 1}`,
    windows: Array.from({ length: 2 + random(2) }, randomInput),
  }));
  return [...tiers, ...bases, ...kinds, ...randomSingle, ...windows];
}

function single(title: string, window: WindowInput): Scenario {
  return { title, windows: [window] };
}

function randomInput(): WindowInput {
  const mods = Object.fromEntries(
    Array.from({ length: 1 + random(4) }, () => {
      const mod = data.mods[random(data.mods.length)];
      return [mod.id, 1 + random(mod.tiers.length)];
    }),
  );
  const bases = random(3) === 0 ? [data.bases[random(data.bases.length)].id] : [];
  return { bases, matchBoth: random(2) === 0, mods };
}

function scenarioFlasks(scenario: Scenario): Flask[] {
  const related = flasks.filter(
    (flask) =>
      scenario.windows.some(
        (window) =>
          window.bases.includes(flask.base.id) ||
          [flask.prefix, flask.suffix].some((affix) => affix !== undefined && window.mods[affix.mod.id] !== undefined),
      ),
  );
  const sample = Array.from({ length: RANDOM_FLASKS_PER_SCENARIO }, () => flasks[random(flasks.length)]);
  return [...related, ...sample];
}

function allFlasks(): Flask[] {
  return data.bases.flatMap((base) => {
    const prefixes = affixesFor(base, "prefix");
    const suffixes = affixesFor(base, "suffix");
    const pick = (list: Affix[]) => (random(3) === 0 ? undefined : list[random(list.length)]);
    return [
      flask(base),
      ...prefixes.map((prefix) => flask(base, prefix, pick(suffixes))),
      ...suffixes.map((suffix) => flask(base, pick(prefixes), suffix)),
    ];
  });
}

function affixesFor(base: FlaskBase, affix: string): Affix[] {
  return data.mods
    .filter((mod) => mod.affix === affix && mod.kinds.includes(base.kind))
    .flatMap((mod) => mod.tiers.map((_, tier) => ({ mod, tier })));
}

function flask(base: FlaskBase, prefix?: Affix, suffix?: Affix): Flask {
  const name = [prefix && tierOf(prefix).name, base.name, suffix && tierOf(suffix).name].filter(Boolean).join(" ");
  const isMagic = prefix !== undefined || suffix !== undefined;
  const lines = [
    `Класс предмета: ${KIND_CLASSES[base.kind]}`,
    `Редкость: ${isMagic ? "Волшебный" : "Обычный"}`,
    name,
    neutralTexts[random(neutralTexts.length)],
    ...[prefix, suffix].flatMap((affix) => (affix ? modLines(affix, base) : [])),
    SERVICE_LINES[0],
  ];
  return { base, lines, prefix, suffix };
}

function modLines(affix: Affix, base: FlaskBase): string[] {
  const tier = tierOf(affix);
  const count = affix.mod.text.split("\n").length;
  const variants = tier.lines.length / count;
  const variant = Math.min(Math.max(affix.mod.kinds.indexOf(base.kind), 0), variants - 1);
  return tier.lines.slice(variant * count, (variant + 1) * count).map(rollValues);
}

function rollValues(line: string): string {
  return line.replace(/\((\d+(?:\.\d+)?)—(\d+(?:\.\d+)?)\)/g, (_, low: string, high: string) => {
    const digits = low.split(".")[1]?.length ?? 0;
    const value = Number(low) + (random(1001) / 1000) * (Number(high) - Number(low));
    return value.toFixed(digits);
  });
}

function tierOf(affix: Affix): FlaskTier {
  return affix.mod.tiers[affix.tier];
}

function hasSharedName(flask: Flask): boolean {
  return [flask.prefix, flask.suffix].some((affix) => affix !== undefined && sharedNames.has(tierOf(affix).name));
}

function unownedTexts(): string[] {
  const known = new Set([
    ...data.bases.map((base) => base.name),
    ...data.mods.flatMap((mod) => mod.tiers.flatMap((tier) => [tier.name, ...tier.lines])),
  ]);
  return corpus.texts.filter((text) => !known.has(text));
}

function sharedTierNames(): Set<string> {
  const names = data.mods.flatMap((mod) => mod.tiers.map((tier) => tier.name));
  return new Set(names.filter((name, index) => names.indexOf(name) !== index));
}

function random(limit: number): number {
  seed = (seed * 1103515245 + 12345) % 2 ** 31;
  return seed % limit;
}
