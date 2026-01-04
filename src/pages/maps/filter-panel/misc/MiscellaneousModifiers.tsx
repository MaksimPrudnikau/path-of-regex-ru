import { CheckboxWithExclude } from "./checkbox/CheckboxWithExclude";
import { MapRarityFilters } from "./MapRarityFilters";

export function MiscellaneousModifiers() {
  return (
    <div class={"col gap-3"}>
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
    </div>
  );
}
