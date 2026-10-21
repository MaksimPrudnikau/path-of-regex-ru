import { buildBestiaryBatches, buildBestiaryRegex, MAX_REGEX_LENGTH } from "~/pages/bestiary/regex-panel/buildBestiaryRegex";
import type { Beast, Recipe } from "~/pages/bestiary/data";
import { loadBestiary, loadCorpus } from "./lib.mjs";

type Entry = { text: string; beastId?: string };
type Scenario = { title: string; selected: string[] };

const RANDOM_SCENARIOS = 300;
const MAX_RANDOM_SELECTION = 10;
const MAX_REPORTED_ERRORS = 20;

let seed = 42;

const { beasts, recipes }: { beasts: Beast[]; recipes: Recipe[] } = loadBestiary();
const corpus: { monsters: string[]; mods: string[] } = loadCorpus();
const entries = menagerieEntries();
const errors: string[] = [];
let checks = 0;

for (const scenario of scenarios()) {
  checkBatches(scenario);
  for (const exclude of [false, true]) {
    const search = buildBestiaryRegex({ exclude, selected: scenario.selected }, beasts);
    for (const caseInsensitive of [false, true]) {
      checkScenario(scenario, search, exclude, caseInsensitive);
    }
  }
}

for (const recipe of recipes) {
  const length = buildBestiaryRegex({ exclude: false, selected: recipe.beasts }, beasts).length;
  if (length > MAX_REGEX_LENGTH) errors.push(`рецепт «${recipe.title}»: строка длиной ${length} > ${MAX_REGEX_LENGTH}`);
}

const allBeasts = buildBestiaryRegex({ exclude: false, selected: beasts.map((beast) => beast.id) }, beasts);
console.log(`записей в зверинце: ${entries.length}, строка со всеми зверями: ${allBeasts.length} символов`);
for (const error of errors.slice(0, MAX_REPORTED_ERRORS)) console.log(error);
console.log(`проверок: ${checks}, ошибок: ${errors.length}`);
process.exitCode = errors.length > 0 ? 1 : 0;

function checkScenario(scenario: Scenario, search: string, exclude: boolean, caseInsensitive: boolean) {
  const matches = matcher(search, caseInsensitive);
  const selected = new Set(scenario.selected);
  const mode = `${exclude ? "исключение" : "поиск"}, ${caseInsensitive ? "без регистра" : "с регистром"}`;

  for (const entry of entries) {
    checks++;
    const isSelected = entry.beastId !== undefined && selected.has(entry.beastId);
    if (matches(entry.text) === (isSelected !== exclude)) continue;
    const verdict = matches(entry.text) ? "лишняя подсветка" : "не подсвечен";
    errors.push(`${scenario.title} (${mode}): ${verdict} «${entry.text.replace("\n", " / ")}», строка ${search}`);
  }
}

function checkBatches(scenario: Scenario) {
  const batches = buildBestiaryBatches({ exclude: false, selected: scenario.selected }, beasts, MAX_REGEX_LENGTH);
  const tooLong = batches.filter((batch) => batch.length > MAX_REGEX_LENGTH);
  if (tooLong.length > 0) errors.push(`${scenario.title}: порция длиннее ${MAX_REGEX_LENGTH}: ${tooLong[0]}`);

  const matchers = batches.flatMap((batch) => [true, false].map((caseInsensitive) => matcher(batch, caseInsensitive)));
  const selected = new Set(scenario.selected);
  for (const entry of entries) {
    checks++;
    const isSelected = entry.beastId !== undefined && selected.has(entry.beastId);
    const hits = matchers.filter((matches) => matches(entry.text)).length;
    if ((hits > 0) === isSelected && (!isSelected || hits >= 2)) continue;
    errors.push(`${scenario.title} (порции): ${isSelected ? "не подсвечен" : "лишняя подсветка"} «${entry.text.replace("\n", " / ")}»`);
  }
}

function matcher(search: string, caseInsensitive: boolean) {
  const terms = [...search.matchAll(/"([^"]*)"/g)].map((m) => m[1]);
  const tests = terms.map((term) => {
    const negate = term.startsWith("!");
    const re = new RegExp(negate ? term.slice(1) : term, caseInsensitive ? "im" : "m");
    return (text: string) => re.test(text) !== negate;
  });
  return (text: string) => tests.every((test) => test(text));
}

function menagerieEntries(): Entry[] {
  const beastIdByName = new Map(beasts.map((beast) => [beast.name.toLowerCase(), beast.id]));
  const names = [...new Set([...beasts.map((beast) => beast.name), ...corpus.monsters])];
  return names.flatMap((name, index) => {
    const beastId = beastIdByName.get(name.toLowerCase());
    const mod = corpus.mods[index % corpus.mods.length];
    return [{ beastId, text: name }, { beastId, text: `${name}\n${mod}` }];
  });
}

function scenarios(): Scenario[] {
  const single = beasts.map((beast) => ({ selected: [beast.id], title: `зверь ${beast.name}` }));
  const byRecipe = recipes.map((recipe) => ({ selected: recipe.beasts, title: `рецепт «${recipe.title}»` }));
  const random = Array.from({ length: RANDOM_SCENARIOS }, (_, index) => ({
    selected: randomSelection(),
    title: `случайный выбор #${index + 1}`,
  }));
  return [...single, ...byRecipe, ...random, { selected: beasts.map((beast) => beast.id), title: "все звери" }];
}

function randomSelection(): string[] {
  const size = 1 + random(MAX_RANDOM_SELECTION);
  return Array.from({ length: size }, () => beasts[random(beasts.length)].id);
}

function random(limit: number): number {
  seed = (seed * 1103515245 + 12345) % 2 ** 31;
  return seed % limit;
}
