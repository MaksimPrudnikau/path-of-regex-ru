import type { Beast } from "../data";
import type { League } from "../price/prices";
import type { BestiaryStore } from "./context";

export function sortByPrice(list: Beast[], prices: League["prices"]): Beast[] {
  return list.toSorted((a, b) => (prices[b.id] ?? -1) - (prices[a.id] ?? -1) || a.name.localeCompare(b.name, "ru"));
}

export function matchesFilters(beast: Beast, state: BestiaryStore): boolean {
  return (
    state.colors.includes(beast.color) &&
    (state.group === "" || beast.group === state.group) &&
    (state.family === "" || beast.family === state.family)
  );
}

export function isInPriceRange(price: number | undefined, state: BestiaryStore): boolean {
  if (price === undefined) return false;
  return price >= (state.minChaos ?? 0) && price <= (state.maxChaos ?? Number.POSITIVE_INFINITY);
}
