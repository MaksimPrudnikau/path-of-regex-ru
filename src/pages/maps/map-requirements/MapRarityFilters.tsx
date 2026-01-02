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
      <CheckboxFilter model={"includeNormalMaps"}>Обычные карты</CheckboxFilter>
      <CheckboxFilter model={"includeMagicMaps"}>
        Магические карты
      </CheckboxFilter>
      <CheckboxFilter model={"includeRareMaps"}>Редкие карты</CheckboxFilter>
    </WithExclude>
  );
}
