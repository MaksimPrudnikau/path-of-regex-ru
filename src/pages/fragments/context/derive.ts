import type { PriceSnapshot } from "~/lib/prices";
import type { FragmentItem } from "../data";
import type { FragmentsStore } from "./context";

export function sortByPrice(list: FragmentItem[], prices: PriceSnapshot["leagues"][number]["prices"]): FragmentItem[] {
  return list.toSorted((a, b) => (prices[b.id] ?? -1) - (prices[a.id] ?? -1) || a.name.localeCompare(b.name, "ru"));
}

export function isInPriceRange(price: number | undefined, state: FragmentsStore): boolean {
  if (price === undefined) return false;
  return price >= (state.minChaos ?? 0) && price <= (state.maxChaos ?? Number.POSITIVE_INFINITY);
}
