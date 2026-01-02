import { CheckboxFilter } from "./CheckboxFilter";

export function MapRarityFilters() {
  return (
    <div class={"row gap-5"}>
      <CheckboxFilter model={"includeNormalMaps"}>Обычные карты</CheckboxFilter>
      <CheckboxFilter model={"includeMagicMaps"}>
        Магические карты
      </CheckboxFilter>
      <CheckboxFilter model={"includeRareMaps"}>Редкие карты</CheckboxFilter>
    </div>
  );
}
