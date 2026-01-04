import { GeneralMapRequirements } from "./GeneralMapRequirements";
import { MapRarityFilters } from "./MapRarityFilters";
import { WithExcludeMapFilter } from "./WithExcludeMapFilter";

export function MapRequirements() {
  return (
    <div class={"col gap-8"}>
      <GeneralMapRequirements />
      <div class={"col gap-3"}>
        <MapRarityFilters />

        <WithExcludeMapFilter
          color={"checkbox-neutral"}
          model={"includeUnidentifiedMaps"}
          typeModel={"includeUnidentifiedMapsType"}
        >
          Неопознанные карты
        </WithExcludeMapFilter>

        <WithExcludeMapFilter
          color={"bg-red-500/50"}
          model={"includeCorruptedMaps"}
          textColor={"text-red-500/80"}
          typeModel={"includeCorruptedMapsType"}
        >
          Оскверненные карты
        </WithExcludeMapFilter>
      </div>
    </div>
  );
}
