import { fetchBeastPrices, fetchLeagues } from "./ninja";
import type { League, PriceSnapshot } from "./prices";

export async function loadPrices(knownIds: Set<string>): Promise<PriceSnapshot & { unknownIds: string[] }> {
  const unknownIds = new Set<string>();

  const leagues = await Promise.all(
    (await fetchLeagues()).map(async (name): Promise<League> => {
      const prices: League["prices"] = {};
      for (const { chaos, id } of await fetchBeastPrices(name)) {
        if (knownIds.has(id)) prices[id] = chaos;
        else unknownIds.add(id);
      }
      return { name, prices };
    }),
  );

  return { isLive: true, leagues, unknownIds: [...unknownIds], updatedAt: new Date().toISOString() };
}
