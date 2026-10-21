import type { BeastColor } from "./data";

type Tone = {
  button: string;
  badge: string;
  checkbox: string;
};

export const BEAST_TONES: Record<BeastColor, Tone> = {
  red: { badge: "badge-error", button: "btn-error", checkbox: "checkbox-error" },
  yellow: { badge: "badge-warning", button: "btn-warning", checkbox: "checkbox-warning" },
};
