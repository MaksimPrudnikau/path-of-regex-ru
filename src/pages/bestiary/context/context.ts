import { type Accessor, createContext } from "solid-js";
import type { ProfileControls } from "~/components/profile";
import type { Beast, BeastColor } from "../data";
import type { Currency } from "../price/currency";
import type { PriceSnapshot } from "../price/prices";

export type BestiaryStore = {
  selected: string[];
  exclude: boolean;
  league: string;
  currency: Currency;
  colors: BeastColor[];
  group: string;
  family: string;
  minChaos: number | null;
  maxChaos: number | null;
};

export type Context = ProfileControls & {
  state: Accessor<BestiaryStore>;
  priceSnapshot: Accessor<PriceSnapshot>;
  update: (patch: Partial<BestiaryStore>) => void;
  applyFilters: (patch: Partial<BestiaryStore>) => void;
  regex: Accessor<string>;
  batches: Accessor<string[]>;
  batchIndex: Accessor<number>;
  setBatchIndex: (index: number) => void;
  visibleBeasts: Accessor<Beast[]>;
  priceOf: (id: string) => number | undefined;
  currency: Accessor<Currency>;
  chaosPerUnit: Accessor<number>;
  isDivineAvailable: Accessor<boolean>;
  search: Accessor<string>;
  setSearch: (value: string) => void;
  isSelected: (id: string) => boolean;
  toggleBeast: (id: string) => void;
  selectBeasts: (ids: string[], selected: boolean) => void;
  reset: () => void;
};

export const BestiaryContext = createContext<Context>({} as unknown as Context);

export function initialBestiaryState(): BestiaryStore {
  return {
    colors: ["red", "yellow"],
    currency: "chaos",
    exclude: false,
    family: "",
    group: "",
    league: "",
    maxChaos: null,
    minChaos: null,
    selected: [],
  };
}
