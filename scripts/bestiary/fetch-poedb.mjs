import { mkdirSync, writeFileSync } from "node:fs";
import { fetchBeastPrices, fetchLeagues } from "../../src/pages/bestiary/price/ninja.ts";
import { CORPUS_FILE, corpusNames, saveBestiary, shortestUniqueRegex } from "./lib.mjs";
import { bestiaryModNames, fetchPage, monsterNames, parseBeast, parseRecipes, poedbUrl } from "./poedb.mjs";

const recipes = mergeRecipes([], parseRecipes(await fetchPoedb("Bestiary_Recipe")));
const beasts = new Map();

for (let index = 0; index < recipeBeastIds().length; index++) {
  const id = recipeBeastIds()[index];
  const html = await fetchPoedb(id);
  beasts.set(id, { ...parseBeast(html), color: "red", id });
  mergeRecipes(recipes, parseRecipes(html));
}

const ninjaIds = new Set();
for (const league of await fetchLeagues()) {
  for (const { id } of await fetchBeastPrices(league)) ninjaIds.add(id);
}

const missing = [];
for (const id of ninjaIds) {
  if (beasts.has(id)) continue;
  const html = await fetchPoedb(id, { optional: true });
  if (html === undefined) {
    missing.push(id);
    continue;
  }
  beasts.set(id, { ...parseBeast(html), color: "yellow", id });
}
if (missing.length > 0) console.error(`[bestiary:fetch] на poedb нет страниц зверей с poe.ninja, они пропущены: ${missing.join(", ")}`);

const incomplete = [...beasts.values()].filter((beast) => !beast.name || !beast.group || !beast.family);
if (incomplete.length > 0) fail(`у зверей нет имени, группы или семейства: ${incomplete.map((beast) => beast.id).join(", ")}`);

const monsterPages = [await fetchPoedb("Beast"), await fetchPoedb("Monsters")];
const corpus = {
  mods: sortedUnique(bestiaryModNames(await fetchPoedb("Bestiary"))),
  monsters: sortedUnique(monsterPages.flatMap(monsterNames)),
};
mkdirSync(new URL(".", CORPUS_FILE), { recursive: true });
writeFileSync(CORPUS_FILE, `${JSON.stringify(corpus, null, 1)}\n`);

const list = [...beasts.values()];
const names = corpusNames(corpus, list);
for (const beast of list) beast.regex = shortestUniqueRegex(beast.name, names);
list.sort((a, b) => a.color.localeCompare(b.color) || a.family.localeCompare(b.family, "ru") || a.name.localeCompare(b.name, "ru"));
saveBestiary({ beasts: list, recipes });

const yellow = list.filter((beast) => beast.color === "yellow").length;
console.log(`зверей: ${list.length} (красных ${list.length - yellow}, жёлтых ${yellow}), рецептов: ${recipes.length}, имён в эталоне: ${names.size}`);

function recipeBeastIds() {
  return [...new Set(recipes.flatMap((recipe) => recipe.beasts))];
}

function mergeRecipes(target, found) {
  for (const recipe of found) {
    const isKnown = target.some((known) => known.category === recipe.category && known.title === recipe.title);
    if (!isKnown) target.push(recipe);
  }
  return target;
}

async function fetchPoedb(slug, options = {}) {
  const body = await fetchPage(poedbUrl(slug));
  if (typeof body === "string") return body;
  if (options.optional) return undefined;
  fail(body.error);
}

function sortedUnique(names) {
  return [...new Set(names)].sort((a, b) => a.localeCompare(b, "ru"));
}

function fail(message) {
  console.error(`[bestiary:fetch] ${message}. Проверь вёрстку poedb.tw и обнови парсер в scripts/bestiary/poedb.mjs`);
  throw new Error(message);
}
