import { fetchBeastPrices, fetchDivineChaos, fetchLeagues } from "./ninja";
import type { League, PriceSnapshot } from "./prices";

export async function loadPrices(knownIds: Set<string>): Promise<PriceSnapshot & { unknownIds: string[] }> {
  const unknownIds = new Set<string>();

  const leagues = await Promise.all(
    (await fetchLeagues()).map(async (name): Promise<League> => {
      const prices: League["prices"] = {};
      const [divineChaos, beastPrices] = await Promise.all([fetchDivineChaos(name), fetchBeastPrices(name)]);
      for (const { chaos, id } of beastPrices) {
        if (knownIds.has(id)) prices[id] = chaos;
        else unknownIds.add(id);
      }
      return { divineChaos, name, prices };
    }),
  );

  return { isLive: true, leagues, unknownIds: [...unknownIds], updatedAt: new Date().toISOString() };
}
