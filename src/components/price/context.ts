import { type Accessor, createContext } from "solid-js";
import type { PriceSnapshot } from "~/lib/prices";
import type { Currency } from "./currency";

export type PriceRangePatch = { minChaos?: number | null; maxChaos?: number | null };

export type PriceControls = {
  snapshot: Accessor<PriceSnapshot>;
  league: Accessor<string>;
  setLeague: (league: string) => void;
  currency: Accessor<Currency>;
  setCurrency: (currency: Currency) => void;
  chaosPerUnit: Accessor<number>;
  isDivineAvailable: Accessor<boolean>;
  minChaos: Accessor<number | null>;
  maxChaos: Accessor<number | null>;
  setRange: (patch: PriceRangePatch) => void;
  steps: Accessor<number[]>;
};

export const PriceControlsContext = createContext<PriceControls>({} as unknown as PriceControls);
