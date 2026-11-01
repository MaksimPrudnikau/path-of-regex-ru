import { writeFileSync } from "node:fs";
import { loadPrices } from "~/pages/fragments/price/loadPrices";
import { loadFragments } from "./lib.mjs";

const { unknownIds, isLive: _, ...snapshot } = await loadPrices(
  new Set(loadFragments().items.map((item: { id: string }) => item.id)),
);

writeFileSync(new URL("../../data/fragments-prices.json", import.meta.url), `${JSON.stringify(snapshot, null, 1)}\n`);

if (unknownIds.length > 0) {
  console.error(`[fragments:prices] на poe.ninja есть предметы, которых нет в data/fragments.json: ${unknownIds.join(", ")}. Запусти bun run fragments:fetch`);
}
console.log(snapshot.leagues.map((league) => `${league.name}: ${Object.keys(league.prices).length}`).join(", "));
