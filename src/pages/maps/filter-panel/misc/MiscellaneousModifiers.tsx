import { CheckboxFilter } from "~/pages/maps/filter-panel/misc/checkbox/CheckboxFilter";
import { CheckboxWithExclude } from "./checkbox/CheckboxWithExclude";
import { MapRarityFilters } from "./MapRarityFilters";

export function MiscellaneousModifiers() {
  return (
    <div class={"col gap-3 bg-base-300/50 py-8 px-6 rounded-2xl w-fit"}>
      <MapRarityFilters />

      <CheckboxWithExclude
        color={"checkbox-neutral"}
        model={"includeUnidentifiedMaps"}
        typeModel={"includeUnidentifiedMapsType"}
      >
        Неопознанные карты
      </CheckboxWithExclude>

      <CheckboxWithExclude
        color={"bg-red-500/50"}
        model={"includeCorruptedMaps"}
        textColor={"text-red-500/80"}
        typeModel={"includeCorruptedMapsType"}
      >
        Оскверненные карты
      </CheckboxWithExclude>

      <CheckboxFilter
        color={"checkbox-accent"}
        model={"includeT17"}
        textColor={"text-accent"}
      >
        Показать модификаторы Т17 карт
      </CheckboxFilter>
    </div>
  );
}
