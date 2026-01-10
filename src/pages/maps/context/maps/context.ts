import type { MapMod } from "~/api";

export enum IncludeMapType {
  Include,
  Exclude,
}

export enum PositiveModsType {
  Any,
  None,
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

  moreCurrency: ModRange;
  moreScarab: ModRange;
  moreMaps: ModRange;

  includeNormalMaps: boolean;
  includeMagicMaps: boolean;
  includeRareMaps: boolean;
  includeCorruptedMaps: boolean;
  includeUnidentifiedMaps: boolean;

  includeMapsType: IncludeMapType;
  includeCorruptedMapsType: IncludeMapType;
  includeUnidentifiedMapsType: IncludeMapType;
  negativeMods: Array<Pick<MapMod, "id" | "regex">>;
  positiveMods: Array<Pick<MapMod, "id" | "regex">>;

  positiveModsType: PositiveModsType;
  includeT17: boolean;
};

export const initialMapsContextState = (): MapsStore => ({
  includeCorruptedMaps: false,
  includeCorruptedMapsType: IncludeMapType.Include,
  includeMagicMaps: false,
  includeMapsType: IncludeMapType.Include,
  includeNormalMaps: false,
  includeRareMaps: false,
  includeT17: false,
  includeUnidentifiedMaps: false,
  includeUnidentifiedMapsType: IncludeMapType.Include,
  level: {},
  moreCurrency: {},
  moreMaps: {},
  moreScarab: {},
  negativeMods: [],
  packSize: {},
  positiveMods: [],
  positiveModsType: PositiveModsType.Any,
  quality: {},
  quantity: {},
  rarity: {},
});
