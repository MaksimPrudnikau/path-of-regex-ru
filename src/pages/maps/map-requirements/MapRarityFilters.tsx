import { useContext } from "solid-js";
import { MapsContext } from "~/pages/maps/context/context";
import { WithExclude } from "~/pages/maps/map-requirements/WithExclude";
import { CheckboxFilter } from "./CheckboxFilter";

export function MapRarityFilters() {
  const { store } = useContext(MapsContext);

  const isAnyChecked = () =>
    store.includeNormalMaps ||
    store.includeMagicMaps ||
    store.includeRareMaps ||
    false;

  return (
    <WithExclude isChecked={isAnyChecked} model={"includeMapsType"}>
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
    </WithExclude>
  );
}
