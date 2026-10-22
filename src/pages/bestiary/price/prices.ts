import snapshot from "@/data/bestiary-prices.json";

export type League = {
  name: string;
  prices: Partial<Record<string, number>>;
};

export type PriceSnapshot = {
  leagues: League[];
  updatedAt: string;
  isLive: boolean;
};

export const savedSnapshot: PriceSnapshot = { ...snapshot, isLive: false };

export function pricesOf(snapshotData: PriceSnapshot, league: string): League["prices"] {
  const leagues = snapshotData.leagues;
  return (leagues.find((item) => item.name === league) ?? leagues[0])?.prices ?? {};
}

export function formatChaos(price: number): string {
  if (price >= 10) return Math.round(price).toString();
  return price.toFixed(price >= 1 ? 1 : 2);
}
