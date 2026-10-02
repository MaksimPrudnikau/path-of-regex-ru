// Скачивает с poedb.tw реальные русские тексты модов карт (все тиры, включая T17)
// и сохраняет их в data/poedb-map-mods.json — это эталон, по которому проверяются regex модов.
//
// Запуск: node scripts/map-regex/fetch-poedb.mjs
import { writeFileSync } from "node:fs";

const TIERS = ["low", "mid", "top", "uber"];
const GROUPS = new Set(["normal", "delve"]);

const clean = (s) =>
  s
    .replace(/<br\s*\/?>/g, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ");

// Достаёт JSON-аргумент из `new ModsView({...})` на странице poedb.
function extractModsView(html) {
  const start = html.indexOf("new ModsView(") + "new ModsView(".length;
  let depth = 0;
  let inStr = false;
  for (let i = start; i < html.length; i++) {
    const c = html[i];
    if (inStr) {
      if (c === "\\") i++;
      else if (c === '"') inStr = false;
      continue;
    }
    if (c === '"') inStr = true;
    else if (c === "{") depth++;
    else if (c === "}" && --depth === 0) return JSON.parse(html.slice(start, i + 1));
  }
  throw new Error("ModsView JSON not found");
}

const mods = [];
for (const tier of TIERS) {
  const res = await fetch(`https://poedb.tw/ru/Maps_${tier}_tier`, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  if (!res.ok) throw new Error(`poedb ${tier}: HTTP ${res.status}`);
  const data = extractModsView(await res.text());

  for (const [group, list] of Object.entries(data)) {
    if (!GROUPS.has(group) || !Array.isArray(list)) continue;
    for (const mod of list) {
      const text = clean(mod.str);
      // В игре на предмете одно число, а poedb иногда показывает диапазон "(25—30)" —
      // сохраняем оба крайних значения как отдельные варианты.
      const range = /\((-?\d+)\s*[—-]\s*(-?\d+)\)/g;
      const variants = range.test(text)
        ? [text.replace(range, "$1"), text.replace(range, "$2")]
        : [text];
      for (const variant of variants) {
        const lines = variant
          .split("\n")
          .map((l) => l.trim())
          .filter(Boolean);
        mods.push({ tier, group, family: mod.ModFamilyList, lines });
      }
    }
  }
}

const out = new URL("./data/poedb-map-mods.json", import.meta.url);
writeFileSync(out, `${JSON.stringify(mods, null, 1)}\n`);
console.log(`saved ${mods.length} mods -> ${out.pathname}`);
