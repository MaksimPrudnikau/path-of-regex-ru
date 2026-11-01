const NINJA = "https://poe.ninja/poe1/api";
const ICON_HOST = "https://web.poecdn.com";
const REQUEST_TIMEOUT_MS = 8000;

export type NinjaItem = {
  id: string;
  name: string;
  icon: string;
  chaos: number;
};

export type NinjaOverview = {
  divineChaos: number | null;
  items: NinjaItem[];
};

type Response = {
  core: { rates: { divine?: number } };
  items: { id: string; name: string; image: string }[];
  lines: { id: string; primaryValue: number }[];
};

export async function fetchOverview(league: string, type: string): Promise<NinjaOverview> {
  const url = `${NINJA}/economy/exchange/current/overview?league=${encodeURIComponent(league)}&type=${type}`;
  const { core, items, lines }: Response = await getJson(url);
  const chaosById = new Map(lines.map((line) => [line.id, line.primaryValue]));
  return {
    divineChaos: core.rates.divine ? 1 / core.rates.divine : null,
    items: items.flatMap((item) => {
      const chaos = chaosById.get(item.id);
      return chaos === undefined ? [] : [{ chaos, icon: `${ICON_HOST}${item.image}`, id: item.id, name: item.name }];
    }),
  };
}

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  if (res.ok) return res.json();
  console.error(`[fragments] poe.ninja ответил ${res.status} на ${url}. Проверь адрес API в src/pages/fragments/price/ninja.ts`);
  throw new Error(`poe.ninja ${res.status}`);
}
