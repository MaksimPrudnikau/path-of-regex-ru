import type { FlaskMod, FlaskTier } from "../data";

export function tierValues(mod: FlaskMod, tier: FlaskTier): string {
  const lines = tier.lines.slice(0, mod.text.split("\n").length);
  const values = lines.flatMap((line) => [...line.matchAll(/\((\d+(?:\.\d+)?)—(\d+(?:\.\d+)?)\)|\d+(?:\.\d+)?/g)]);
  return values.map((match) => (match[1] === undefined ? match[0] : `${match[1]}-${match[2]}`)).join(" / ");
}
