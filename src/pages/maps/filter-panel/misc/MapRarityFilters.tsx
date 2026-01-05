import { useContext } from "solid-js";
import { MapsContext } from "~/pages/maps/context/maps";
import { CheckboxFilter } from "./checkbox/CheckboxFilter";
import { ExcludeToggle } from "./checkbox/ExcludeToggle";

export function MapRarityFilters() {
  const { store } = useContext(MapsContext);

  const isAnyChecked = () =>
    store.includeNormalMaps || store.includeMagicMaps || store.includeRareMaps || false;

  return (
    <ExcludeToggle isChecked={isAnyChecked} model={"includeMapsType"}>
      <CheckboxFilter color={"bg-white text-black"} model={"includeNormalMaps"}>
        Обычные карты
      </CheckboxFilter>
      <CheckboxFilter
        color={"bg-blue-600 text-white"}
        model={"includeMagicMaps"}
        textColor={"text-blue-400"}
      >
        Магические карты
      </CheckboxFilter>
      <CheckboxFilter
        color={"checkbox-warning"}
        model={"includeRareMaps"}
        textColor={"text-warning"}
      >
        Редкие карты
      </CheckboxFilter>
    </ExcludeToggle>
  );
}
