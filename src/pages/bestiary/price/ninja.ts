const NINJA = "https://poe.ninja/poe1/api";
const REQUEST_TIMEOUT_MS = 8000;

export type NinjaPrice = {
  id: string;
  chaos: number;
};

export async function fetchLeagues(): Promise<string[]> {
  const index: { economyLeagues: { name: string }[] } = await getJson(`${NINJA}/data/index-state`);
  return index.economyLeagues.map((league) => league.name);
}

export async function fetchBeastPrices(league: string): Promise<NinjaPrice[]> {
  const url = `${NINJA}/economy/stash/current/item/overview?league=${encodeURIComponent(league)}&type=Beast`;
  const { lines }: { lines: { name: string; chaosValue: number }[] } = await getJson(url);
  return lines.map((line) => ({ chaos: line.chaosValue, id: idOf(line.name) }));
}

function idOf(englishName: string): string {
  return englishName.replaceAll(" ", "_");
}

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  if (res.ok) return res.json();
  console.error(`[bestiary] poe.ninja ответил ${res.status} на ${url}. Проверь адрес API в src/pages/bestiary/price/ninja.ts`);
  throw new Error(`poe.ninja ${res.status}`);
}
