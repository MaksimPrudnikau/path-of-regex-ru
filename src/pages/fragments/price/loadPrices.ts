import type { League, PriceSnapshot } from "~/lib/prices";
import { fetchLeagues } from "~/pages/bestiary/price/ninja";
import { NINJA_TYPES, TABS } from "../tabs";
import { fetchOverview, type NinjaOverview } from "./ninja";

export async function loadPrices(knownIds: Set<string>): Promise<PriceSnapshot & { unknownIds: string[] }> {
  const unknownIds = new Set<string>();

  const leagues = await Promise.all(
    (await fetchLeagues()).map(async (name): Promise<League> => {
      const overviews = new Map(await Promise.all(NINJA_TYPES.map(async (type) => [type, await fetchOverview(name, type)] as const)));
      const prices: League["prices"] = {};
      for (const tab of TABS) {
        for (const { chaos, id, name: englishName } of overviews.get(tab.ninjaType)?.items ?? []) {
          if (!tab.accepts(englishName)) continue;
          if (knownIds.has(id)) prices[id] = chaos;
          else unknownIds.add(id);
        }
      }
      return { divineChaos: divineChaosOf(overviews), name, prices };
    }),
  );

  return { isLive: true, leagues, unknownIds: [...unknownIds], updatedAt: new Date().toISOString() };
}

function divineChaosOf(overviews: Map<string, NinjaOverview>): number | null {
  for (const overview of overviews.values()) if (overview.divineChaos !== null) return overview.divineChaos;
  return null;
}
