import { writeFileSync } from "node:fs";
import { loadPrices } from "~/pages/bestiary/price/loadPrices";
import { loadBestiary } from "./lib.mjs";

const { unknownIds, isLive: _, ...snapshot } = await loadPrices(
  new Set(loadBestiary().beasts.map((beast: { id: string }) => beast.id)),
);

writeFileSync(new URL("../../data/bestiary-prices.json", import.meta.url), `${JSON.stringify(snapshot, null, 1)}\n`);

if (unknownIds.length > 0) {
  console.error(`[bestiary:prices] на poe.ninja есть звери, которых нет в data/bestiary.json: ${unknownIds.join(", ")}. Запусти bun run bestiary:fetch`);
}
console.log(snapshot.leagues.map((league) => `${league.name}: ${Object.keys(league.prices).length}`).join(", "));
