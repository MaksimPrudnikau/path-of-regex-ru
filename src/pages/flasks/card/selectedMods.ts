import type { FlaskWindow } from "../context";
import { type Affix, type FlaskKind, flaskData, type FlaskMod, modById } from "../data";

export function selectedMods(state: FlaskWindow, affix: Affix): FlaskMod[] {
  return Object.keys(state.mods).flatMap((id) => {
    const mod = modById.get(id);
    return mod?.affix === affix ? [mod] : [];
  });
}

export function availableMods(state: FlaskWindow, affix: Affix): FlaskMod[] {
  const kinds = activeKinds(state);
  return flaskData.mods.filter((mod) => mod.affix === affix && mod.kinds.some((kind) => kinds.includes(kind)));
}

function activeKinds(state: FlaskWindow): FlaskKind[] {
  const bases = flaskData.bases.filter((base) => state.bases.includes(base.id));
  return bases.length > 0 ? bases.map((base) => base.kind) : ["life", "mana", "utility"];
}
