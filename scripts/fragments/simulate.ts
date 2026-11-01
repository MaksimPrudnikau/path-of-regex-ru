import { buildFragmentBatches, MAX_REGEX_LENGTH } from "~/pages/fragments/regex-panel/buildFragmentRegex";
import { loadFragments } from "./lib.mjs";

type Item = { id: string; name: string; regex: string; tab: string };

const items: Item[] = loadFragments().items;
const tabs = [...new Set(items.map((item) => item.tab))];
const ROUNDS = 200;
let errors = 0;

for (const tab of tabs) {
  const tabItems = items.filter((item) => item.tab === tab);
  for (let round = 0; round < ROUNDS; round++) {
    const shuffled = tabItems.toSorted(() => Math.random() - 0.5);
    const include = shuffled.slice(0, Math.floor(Math.random() * 20)).map((item) => item.id);
    const exclude = shuffled.slice(20, 20 + Math.floor(Math.random() * 6)).map((item) => item.id);
    const batches = buildFragmentBatches({ exclude, include }, tabItems, MAX_REGEX_LENGTH);
    const highlighted = new Set<string>();
    for (const batch of batches) {
      if (batch.length > MAX_REGEX_LENGTH) fail(tab, `строка длиннее ${MAX_REGEX_LENGTH}: ${batch.length}`);
      for (const item of tabItems.filter((candidate) => matches(batch, candidate.name))) highlighted.add(item.id);
    }
    const expected = expectedIds(tabItems, include, exclude);
    const wrong = [...new Set([...highlighted].filter((id) => !expected.includes(id)).concat(expected.filter((id) => !highlighted.has(id))))];
    if (wrong.length > 0) fail(tab, `подсветка не совпала: ${wrong.join(", ")}`);
  }
}

console.log(`вкладок: ${tabs.length}, предметов: ${items.length}, ошибок: ${errors}`);
process.exitCode = errors > 0 ? 1 : 0;

function expectedIds(tabItems: Item[], include: string[], exclude: string[]): string[] {
  if (include.length > 0) return include.filter((id) => !exclude.includes(id));
  if (exclude.length === 0) return [];
  return tabItems.filter((item) => !exclude.includes(item.id)).map((item) => item.id);
}

function matches(search: string, name: string): boolean {
  return [...search.matchAll(/"(!?)([^"]*)"/g)].every(([, negate, body]) => new RegExp(body, "i").test(name) !== (negate === "!"));
}

function fail(tab: string, message: string) {
  errors++;
  if (errors <= 10) console.error(`[fragments:simulate] ${tab}: ${message}`);
}
