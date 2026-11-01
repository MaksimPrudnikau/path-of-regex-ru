import { fetchOverview } from "../../src/pages/fragments/price/ninja.ts";
import { NINJA_TYPES, TABS } from "../../src/pages/fragments/tabs.ts";
import { fetchLeagues } from "../../src/pages/bestiary/price/ninja.ts";
import { fetchPage, poedbUrl } from "../bestiary/poedb.mjs";
import { assignRegexes, saveFragments } from "./lib.mjs";

const found = new Map();
for (const league of await fetchLeagues()) {
  for (const type of NINJA_TYPES) {
    for (const item of (await fetchOverview(league, type)).items) {
      const tab = TABS.find((candidate) => candidate.ninjaType === type && candidate.accepts(item.name));
      if (tab && !found.has(item.id)) found.set(item.id, { englishName: item.name, icon: item.icon, id: item.id, tab: tab.id });
    }
  }
}

const items = [];
const missing = [];
for (const entry of found.values()) {
  const html = await fetchPage(poedbUrl(entry.englishName.replaceAll(" ", "_")));
  const name = typeof html === "string" ? /<title>([^<]+?) - PoEDB/.exec(html)?.[1] : undefined;
  if (name === undefined) missing.push(entry.englishName);
  else items.push({ icon: entry.icon, id: entry.id, name: decodeEntities(name), tab: entry.tab });
}
if (missing.length > 0) {
  console.error(`[fragments:fetch] на poedb.tw нет русского названия для: ${missing.join(", ")}. Проверь адреса страниц и повтори`);
  process.exit(1);
}

assignRegexes(items);
items.sort((a, b) => a.tab.localeCompare(b.tab) || a.name.localeCompare(b.name, "ru"));
saveFragments({ items });
console.log(`предметов: ${items.length}`);

function decodeEntities(text) {
  return text.replaceAll("&#39;", "'").replaceAll("&#039;", "'").replaceAll("&quot;", '"').replaceAll("&amp;", "&").trim();
}
