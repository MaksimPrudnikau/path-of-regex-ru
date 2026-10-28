import { mkdirSync, writeFileSync } from "node:fs";
import { fetchPage, poedbUrl } from "../bestiary/poedb.mjs";
import { baseRegex, CORPUS_FILE, itemLines, kindRegex, modRegex, saveFlasks, skeleton, tierRegex } from "./lib.mjs";
import { baseLevels, EXTRA_PAGES, FLASK_PAGES, itemTexts, otherModTexts, parseBases, parseMods, parseModsView } from "./poedb.mjs";

const bases = [];
const groups = new Map();
const texts = [];

for (const [kind, slug] of Object.entries(FLASK_PAGES)) {
  const html = await fetchPoedb(slug);
  const view = parseModsView(html);
  if (view === undefined) fail(`на странице ${slug} нет данных ModsView`);
  const levels = baseLevels(html);
  for (const base of parseBases(html)) bases.push({ ...base, kind, level: levels.get(base.id) ?? 1 });
  for (const mod of parseMods(view)) addMod(mod, kind);
  texts.push(...itemTexts(html), ...otherModTexts(view));
}
for (const slug of EXTRA_PAGES) {
  const html = await fetchPoedb(slug);
  texts.push(...itemTexts(html), ...parseBases(html).map((base) => base.name));
}

const mods = mergeSameTiers([...groups.values()].map(toMod));
const corpus = { texts: [...new Set(texts)].sort((a, b) => a.localeCompare(b, "ru")) };
mkdirSync(new URL(".", CORPUS_FILE), { recursive: true });
writeFileSync(CORPUS_FILE, `${JSON.stringify(corpus, null, 1)}\n`);

const flasks = { bases, kinds: {}, mods };
const lines = itemLines(corpus, flasks);
for (const kind of Object.keys(FLASK_PAGES)) flasks.kinds[kind] = kindRegex(kind, bases, lines);
for (const base of bases) base.regex = baseRegex(base, lines);
for (const mod of mods) {
  mod.regex = modRegex(mod, lines);
  for (const tier of mod.tiers) tier.regex = tierRegex(mod, tier, lines);
}

const missing = [...bases, ...mods.flatMap((mod) => mod.tiers)].filter((item) => item.regex === null);
if (missing.length > 0) fail(`не удалось подобрать regex: ${missing.map((item) => item.name).join(", ")}`);
saveFlasks(flasks);

const withoutText = mods.filter((mod) => mod.regex === null).length;
console.log(`баз: ${bases.length}, модов: ${mods.length} (без regex по тексту ${withoutText}), строк в эталоне: ${corpus.texts.length}`);

function addMod(mod, kind) {
  const text = mod.lines.map(skeleton).join("\n");
  const key = `${mod.affix}:${text}`;
  const group = groups.get(key) ?? { affix: mod.affix, families: new Set(), kinds: new Set(), text, tiers: new Map() };
  group.families.add(mod.family);
  group.kinds.add(kind);
  const tier = group.tiers.get(mod.name) ?? { level: mod.level, lines: [], name: mod.name };
  tier.level = Math.min(tier.level, mod.level);
  tier.lines = [...new Set([...tier.lines, ...mod.lines])];
  group.tiers.set(mod.name, tier);
  groups.set(key, group);
}

function toMod(group) {
  const tiers = [...group.tiers.values()].sort((a, b) => b.level - a.level);
  return {
    affix: group.affix,
    id: `${[...group.families].join("+")}/${tiers[tiers.length - 1].name}`,
    kinds: [...group.kinds],
    text: group.text,
    tiers,
  };
}

function mergeSameTiers(list) {
  const byNames = new Map();
  for (const mod of list) {
    const key = `${mod.affix}:${mod.tiers.map((tier) => tier.name).join("|")}`;
    const known = byNames.get(key);
    if (known === undefined) {
      byNames.set(key, mod);
      continue;
    }
    known.kinds = [...new Set([...known.kinds, ...mod.kinds])];
    known.tiers = known.tiers.map((tier, index) => ({ ...tier, lines: [...tier.lines, ...mod.tiers[index].lines] }));
  }
  const merged = [...byNames.values()];
  const names = merged.flatMap((mod) => mod.tiers.map((tier) => tier.name));
  const shared = names.filter((name, index) => names.indexOf(name) !== index);
  if (shared.length > 0) console.warn(`[flasks:fetch] одно название аффикса у разных модов, такие тиры по имени не различить: ${[...new Set(shared)].join(", ")}`);
  return merged;
}

async function fetchPoedb(slug) {
  const body = await fetchPage(poedbUrl(slug));
  if (typeof body === "string") return body;
  fail(body.error);
}

function fail(message) {
  console.error(`[flasks:fetch] ${message}. Проверь вёрстку poedb.tw и обнови парсер в scripts/flasks/poedb.mjs`);
  throw new Error(message);
}
