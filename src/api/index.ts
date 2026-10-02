import mods from "virtual:map-mods";

export type MapMod = {
  id: number;
  name: string;
  rank: number;
  regex: string;
};

/** Моды карт из data/maps.sqlite, встроенные в бандл при сборке. */
export const mapMods: MapMod[] = mods;
