import flasks from "@/data/flasks.json";

export type FlaskKind = "life" | "mana" | "utility";
export type Affix = "prefix" | "suffix";

export type FlaskBase = {
  id: string;
  name: string;
  kind: FlaskKind;
  level: number;
  effects: string[];
  regex: string;
};

export type FlaskTier = {
  name: string;
  level: number;
  lines: string[];
  regex: string;
};

export type FlaskMod = {
  id: string;
  affix: Affix;
  kinds: FlaskKind[];
  text: string;
  regex: string | null;
  tiers: FlaskTier[];
};

export type FlaskData = {
  bases: FlaskBase[];
  kinds: Record<FlaskKind, string | null>;
  mods: FlaskMod[];
};

export const flaskData = flasks as FlaskData;

export const KIND_LABELS: Record<FlaskKind, string> = {
  life: "Жизни",
  mana: "Маны",
  utility: "Особые",
};

export const modById = new Map(flaskData.mods.map((mod) => [mod.id, mod]));
