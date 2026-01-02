import { useContext } from "solid-js";
import { MapsContext } from "~/pages/maps/context/context";
import { CheckboxFilter } from "./CheckboxFilter";
import { GeneralMapRequirements } from "./GeneralMapRequirements";
import { MapRarityFilters } from "./MapRarityFilters";
import { WithExcludeMapFilter } from "./WithExcludeMapFilter";

export function MapRequirements() {
  const { store } = useContext(MapsContext);

  const testForm = () => {
    alert(JSON.stringify(store));
  };

  return (
    <div class={"col gap-3"}>
      <GeneralMapRequirements />
      <div class={"col gap-3"}>
        <MapRarityFilters />

        <WithExcludeMapFilter
          model={"includeUnidentifiedMaps"}
          typeModel={"includeUnidentifiedMapsType"}
        >
          Неопознанные карты
        </WithExcludeMapFilter>

        <WithExcludeMapFilter
          model={"includeCorruptedMaps"}
          typeModel={"includeCorruptedMapsType"}
        >
          Оскверненные карты
        </WithExcludeMapFilter>

        <CheckboxFilter model={"includeT17Mods"}>
          Модификаторы Т17 карт
        </CheckboxFilter>
      </div>

      <button class={"btn btn-primary"} onClick={testForm} type={"button"}>
        тест
      </button>
    </div>
  );
}
