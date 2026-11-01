import { type Accessor, createContext } from "solid-js";
import type { Currency } from "~/components/price";
import type { ProfileControls } from "~/components/profile";
import type { FragmentItem } from "../data";
import type { TabId } from "../tabs";

export type FragmentsSelection = {
  include: string[];
  exclude: string[];
};

export type FragmentsStore = {
  tab: TabId;
  league: string;
  currency: Currency;
  minChaos: number | null;
  maxChaos: number | null;
  selections: Record<TabId, FragmentsSelection>;
};

export type ListName = keyof FragmentsSelection;

export type Context = ProfileControls & {
  state: Accessor<FragmentsStore>;
  setTab: (tab: TabId) => void;
  tabItems: Accessor<FragmentItem[]>;
  tabItemCount: (tab: TabId) => number;
  priceOf: (id: string) => number | undefined;
  isSelected: (list: ListName, id: string) => boolean;
  toggleItem: (list: ListName, id: string) => void;
  regex: Accessor<string>;
  batches: Accessor<string[]>;
  batchIndex: Accessor<number>;
  setBatchIndex: (index: number) => void;
  reset: () => void;
};

export const FragmentsContext = createContext<Context>({} as unknown as Context);

export function initialFragmentsState(): FragmentsStore {
  return {
    currency: "chaos",
    league: "",
    maxChaos: null,
    minChaos: null,
    selections: {
      allflame: emptySelection(),
      eldritch: emptySelection(),
      general: emptySelection(),
      scarab: emptySelection(),
    },
    tab: "general",
  };
}

function emptySelection(): FragmentsSelection {
  return { exclude: [], include: [] };
}
