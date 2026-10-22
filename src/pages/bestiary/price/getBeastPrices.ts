import { query } from "@solidjs/router";
import { beasts } from "../data";
import { loadPrices } from "./loadPrices";
import { type PriceSnapshot, savedSnapshot } from "./prices";

const CACHE_TTL_MS = 30 * 60 * 1000;

let cached: { snapshot: PriceSnapshot; loadedAt: number } | undefined;

export const getBeastPrices = query(async (): Promise<PriceSnapshot> => {
  "use server";
  if (cached && Date.now() - cached.loadedAt < CACHE_TTL_MS) return cached.snapshot;

  try {
    const { unknownIds: _, ...snapshot } = await loadPrices(new Set(beasts.map((beast) => beast.id)));
    cached = { loadedAt: Date.now(), snapshot };
    return snapshot;
  } catch (error) {
    console.error("[bestiary] Не удалось загрузить цены с poe.ninja, отдаю сохранённый снимок data/bestiary-prices.json", error);
    return savedSnapshot;
  }
}, "beast-prices");
