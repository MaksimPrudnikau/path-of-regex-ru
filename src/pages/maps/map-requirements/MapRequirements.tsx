import { useContext } from "solid-js";
import { MapsContext } from "~/pages/maps/context/context";
import { CheckboxFilter } from "./CheckboxFilter";
import { InputRequirement } from "./InputRequirement";
import { MapRarityFilters } from "./MapRarityFilters";

export function MapRequirements() {
  const { store } = useContext(MapsContext);

  const testForm = () => {
    console.log(store);
  };
  return (
    <div class={"col gap-3"}>
      <div class={"grid grid-cols-2 gap-y-4"}>
        <InputRequirement model={"level"}>Уровень карты</InputRequirement>
        <InputRequirement model={"quality"}>Качество</InputRequirement>
        <InputRequirement model={"packSize"}>
          Размер групп монстров
        </InputRequirement>
        <InputRequirement model={"rarity"}>Редкость предметов</InputRequirement>
        <InputRequirement model={"currency"}>Больше валюты</InputRequirement>
        <InputRequirement model={"maps"}>Больше карт</InputRequirement>
        <InputRequirement model={"scarab"}>Больше скарабеев</InputRequirement>
      </div>
      <div class={"col gap-3"}>
        <MapRarityFilters />
        <CheckboxFilter model={"includeCorruptedMaps"}>
          Оскверненные карты
        </CheckboxFilter>
        <CheckboxFilter model={"includeUnidentifiedMaps"}>
          Неопознанные карты
        </CheckboxFilter>
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
