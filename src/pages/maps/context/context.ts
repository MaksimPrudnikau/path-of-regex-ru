import { createContext } from "solid-js";
import type { SetStoreFunction } from "solid-js/store";

export enum IncludeMapType {
  Include,
  Exclude,
}

export type ModRange = {
  min?: number;
  max?: number;
};

export type MapsStore = {
  level?: ModRange; // Уровень карты
  quality?: ModRange; // Качество карты
  quantity?: ModRange; // Количество предметов
  rarity?: ModRange; // Редкость предметов
  packSize?: ModRange; // Размер групп монстров

  currency?: ModRange;
  scarab?: ModRange;
  maps?: ModRange;

  includeNormalMaps?: boolean;
  includeMagicMaps?: boolean;
  includeRareMaps?: boolean;

  includeCorruptedMaps?: boolean;
  includeUnidentifiedMaps?: boolean;

  includeT17Mods?: boolean;

  includeMapsType: IncludeMapType;
  includeCorruptedMapsType: IncludeMapType;
  includeUnidentifiedMapsType: IncludeMapType;
};

type MapsContext = {
  store: MapsStore;
  updateStore: SetStoreFunction<MapsStore>;
};

export const MapsContext = createContext<MapsContext>(
  {} as unknown as MapsContext,
);
