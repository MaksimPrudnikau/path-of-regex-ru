const POEDB = "https://poedb.tw/ru";
const ANY_BEAST = "Любой";
const MAX_ATTEMPTS = 5;

export async function fetchPage(url, attempt = 1) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } }).catch((error) => ({
    ok: false,
    status: error.cause?.code ?? error.message,
  }));
  if (res.ok) return res.text();
  if (attempt >= MAX_ATTEMPTS) return { error: `${url}: ${res.status}` };
  await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
  return fetchPage(url, attempt + 1);
}

export function poedbUrl(slug) {
  return `${POEDB}/${encodeURIComponent(slug)}`;
}

export function parseRecipes(html) {
  const table = html.slice(html.indexOf("Рецепты Бестиария /"));
  const rows = table.slice(0, table.indexOf("</table>")).match(/<tr><td>[\s\S]*?<\/tr>/g) ?? [];
  return rows.flatMap((row) => {
    const [title, ingredients] = [...row.matchAll(/<td>([\s\S]*?)<\/td>/g)].map((m) => m[1]);
    const beasts = [...ingredients.matchAll(/href="\/ru\/([^"]+)"/g)].map((m) => decodeURIComponent(m[1]));
    if (beasts.length === 0) return [];
    const [heading, note = ""] = title.split(/<br\s*\/?>/);
    const [category, ...rest] = decode(heading).split(": ");
    const anyCount = ingredients.split(`data-bs-title="${ANY_BEAST}`).length - 1;
    return [{ any: anyCount, beasts, category, note: decode(note), title: rest.join(": ") }];
  });
}

export function parseBeast(html) {
  const name = decode(/<title>([^<]+?) - PoEDB/.exec(html)?.[1] ?? "");
  const group = /Группа: <span[^>]*><a href='\/ru\/[^']+'>([^<]+)<\/a>/.exec(html)?.[1];
  const family = /Семейство: <span[^>]*><a href='\/ru\/[^']+'>([^<]+)<\/a>/.exec(html)?.[1];
  return { family: decode(family ?? ""), group: decode(group ?? ""), name };
}

export function monsterNames(html) {
  return [...html.matchAll(/<a [^>]*href="\/ru\/[^"]+"[^>]*>([^<]+)<\/a>/g)]
    .map((m) => decode(m[1]))
    .filter((name) => /[а-яё]/i.test(name));
}

export function bestiaryModNames(html) {
  const table = html.slice(html.indexOf("Бестиарий Mods /"));
  return [...table.slice(0, table.indexOf("</table>")).matchAll(/<tr><td>\d+<\/td><td>([^<]+)<\/td>/g)]
    .map((m) => decode(m[1]));
}

export function decode(text) {
  return text
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}
