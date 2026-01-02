import { createContext } from "solid-js";
import type { SetStoreFunction } from "solid-js/store";
import type { MapMod } from "~/api";

export enum IncludeMapType {
  Include,
  Exclude,
}

export type ModRange = {
  min?: number;
  max?: number;
};

export type MapsStore = {
  level: ModRange; // Уровень карты
  quality: ModRange; // Качество карты
  quantity: ModRange; // Количество предметов
  rarity: ModRange; // Редкость предметов
  packSize: ModRange; // Размер групп монстров

  currency: ModRange;
  scarab: ModRange;
  maps: ModRange;

  includeNormalMaps: boolean;
  includeMagicMaps: boolean;
  includeRareMaps: boolean;
  includeCorruptedMaps: boolean;
  includeUnidentifiedMaps: boolean;
  includeT17Maps: boolean;

  includeMapsType: IncludeMapType;
  includeCorruptedMapsType: IncludeMapType;
  includeUnidentifiedMapsType: IncludeMapType;
  includeT17MapsType: IncludeMapType;
  negativeMods: Array<Pick<MapMod, "id" | "regex">>;
  positiveMods: Array<Pick<MapMod, "id" | "regex">>;
};

type MapsContext = {
  store: MapsStore;
  updateStore: SetStoreFunction<MapsStore>;
};

export const MapsContext = createContext<MapsContext>(
  {} as unknown as MapsContext,
);

export const initialMapsContextState = (): MapsStore => ({
  currency: {},
  includeCorruptedMaps: false,
  includeCorruptedMapsType: IncludeMapType.Include,
  includeMagicMaps: false,
  includeMapsType: IncludeMapType.Include,
  includeNormalMaps: false,
  includeRareMaps: false,
  includeT17Maps: false,
  includeT17MapsType: IncludeMapType.Include,
  includeUnidentifiedMaps: false,
  includeUnidentifiedMapsType: IncludeMapType.Include,
  level: {},
  maps: {},
  negativeMods: [],
  packSize: {},
  positiveMods: [],
  quality: {},
  quantity: {},
  rarity: {},
  scarab: {},
});
