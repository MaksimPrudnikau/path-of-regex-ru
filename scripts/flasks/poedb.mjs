import { decode } from "../bestiary/poedb.mjs";

export const FLASK_PAGES = {
  life: "Life_Flasks",
  mana: "Mana_Flasks",
  utility: "Utility_Flasks",
};
export const EXTRA_PAGES = ["Hybrid_Flasks"];

const MOD_GROUPS = ["normal", "master", "bestiary"];
const AFFIX_TYPES = { 1: "prefix", 2: "suffix" };
const TEXT_CLASSES = "property|requirements|utilityMod|explicitMod|implicitMod|enchantMod|uniqueName|uniqueTypeLine";

export function parseModsView(html) {
  const start = html.indexOf("ModsView({");
  if (start === -1) return undefined;
  const source = html.slice(start + "ModsView(".length);
  return JSON.parse(source.slice(0, jsonEnd(source)));
}

export function parseMods(view) {
  return view.normal.map((mod) => ({
    affix: AFFIX_TYPES[mod.ModGenerationTypeID],
    family: mod.ModFamilyList.join("+"),
    level: Number(mod.Level),
    lines: modLines(mod.str),
    name: affixName(mod.Name),
  }));
}

export function otherModTexts(view) {
  return MOD_GROUPS.flatMap((group) => view[group] ?? []).flatMap((mod) => [affixName(mod.Name), ...modLines(mod.str)]);
}

export function parseBases(html) {
  const bases = [...html.matchAll(/<a class="whiteitem [A-Za-z]+" [^>]*href="([^"/]+)">([^<]+)<\/a>/g)].map((m) => ({
    id: m[1],
    name: decode(m[2]),
  }));
  return bases.filter((base) => !base.id.startsWith("Royale_"));
}

export function baseIcons(html) {
  return new Map([...html.matchAll(/href="([^"/]+)"><img loading="lazy" src="([^"]+\.webp)"/g)].map((m) => [m[1], m[2]]));
}

export function baseLevels(html) {
  return new Map(
    baseCards(html).map(([id, card]) => [id, Number(/Требуется Уровень <span class="colourDefault">(\d+)/.exec(card)?.[1] ?? "1")]),
  );
}

export function baseEffects(html) {
  const pattern = /<div class=["'](property|utilityMod|implicitMod)["']>([\s\S]*?)<\/div>/g;
  return new Map(
    baseCards(html).map(([id, card]) => [
      id,
      [...withoutValueSpans(card).matchAll(pattern)]
        .flatMap((m) => m[2].split(/<br\s*\/?>/).map((line) => ({ kind: m[1], text: decode(line) })))
        .filter((line) => line.kind !== "property" || line.text.startsWith("Восстанавливает"))
        .map((line) => line.text),
    ]),
  );
}

function baseCards(html) {
  return html
    .split('<div class="col"><div class="d-flex border-top rounded">')
    .slice(1)
    .flatMap((card) => {
      const id = /class="whiteitem [^"]*" [^>]*href="([^"/]+)">[^<]+<\/a>/.exec(card)?.[1];
      return id ? [[id, card]] : [];
    });
}

export function itemTexts(html) {
  const pattern = new RegExp(`<(?:div|span) class=["'](?:${TEXT_CLASSES})["']>([\\s\\S]*?)</(?:div|span)>`, "g");
  return [...withoutValueSpans(html).matchAll(pattern)].flatMap((m) => m[1].split(/<br\s*\/?>/)).map(decode).filter((text) => /[а-яё]/i.test(text));
}

function withoutValueSpans(html) {
  return html
    .replace(/<span class="ndash">—<\/span>/g, "—")
    .replace(/<span class=["'](?:mod-value|colourDefault)["']>([^<]*)<\/span>/g, "$1");
}

function modLines(html) {
  return html.split(/<br\s*\/?>/).map(decode).filter(Boolean);
}

function affixName(template) {
  return decode(/^<if:MS>\{([^}]*)\}/.exec(template)?.[1] ?? template);
}

function jsonEnd(source) {
  let depth = 0;
  let inString = false;
  for (let index = 0; index < source.length; index++) {
    const char = source[index];
    if (inString) {
      if (char === "\\") index++;
      else if (char === '"') inString = false;
    } else if (char === '"') inString = true;
    else if (char === "{") depth++;
    else if (char === "}" && --depth === 0) return index + 1;
  }
  return source.length;
}
