import { useContext } from "solid-js";
import { MapsProfileContext } from "~/pages/maps/context";
import { CheckboxFilter } from "./checkbox/CheckboxFilter";
import { ExcludeToggle } from "./checkbox/ExcludeToggle";

export function MapRarityFilters() {
  const { currentProfile } = useContext(MapsProfileContext);

  const isAnyChecked = () =>
    currentProfile().includeNormalMaps ||
    currentProfile().includeMagicMaps ||
    currentProfile().includeRareMaps ||
    false;

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
