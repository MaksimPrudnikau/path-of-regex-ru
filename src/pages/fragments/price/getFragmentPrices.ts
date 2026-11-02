import { query } from "@solidjs/router";
import type { PriceSnapshot } from "~/lib/prices";
import { items } from "../data";
import { loadPrices } from "./loadPrices";
import { savedSnapshot } from "./prices";

const CACHE_TTL_MS = 30 * 60 * 1000;

let cached: { snapshot: PriceSnapshot; loadedAt: number } | undefined;

export const getFragmentPrices = query(async (): Promise<PriceSnapshot> => {
  "use server";
  if (cached && Date.now() - cached.loadedAt < CACHE_TTL_MS) return cached.snapshot;

  try {
    const { unknownIds: _, ...snapshot } = await loadPrices(new Set(items.map((item) => item.id)));
    cached = { loadedAt: Date.now(), snapshot };
    return snapshot;
  } catch (error) {
    console.error("[fragments] Не удалось загрузить цены с poe.ninja, отдаю сохранённый снимок data/fragments-prices.json", error);
    return savedSnapshot;
  }
}, "fragment-prices");
