import { useContext } from "solid-js";
import { MapsContext } from "~/pages/maps/context/context";
import { GeneralMapRequirements } from "./GeneralMapRequirements";
import { MapRarityFilters } from "./MapRarityFilters";
import { WithExcludeMapFilter } from "./WithExcludeMapFilter";

export function MapRequirements() {
  const { store } = useContext(MapsContext);

  const testForm = () => {
    alert(JSON.stringify(store));
  };

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

        <WithExcludeMapFilter
          color={"checkbox-accent"}
          model={"includeT17Maps"}
          textColor={"text-accent"}
          typeModel={"includeT17MapsType"}
        >
          Т17 карты
        </WithExcludeMapFilter>
      </div>

      <button class={"btn btn-primary"} onClick={testForm} type={"button"}>
        тест
      </button>
    </div>
  );
}
