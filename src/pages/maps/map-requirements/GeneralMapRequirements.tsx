import { InputRequirement } from "./InputRequirement";

export function GeneralMapRequirements() {
  return (
    <div class={"grid grid-cols-2 gap-y-4"}>
      <InputRequirement max={17} min={1} model={"level"}>
        Уровень карты
      </InputRequirement>
      <InputRequirement model={"moreCurrency"}>Больше валюты</InputRequirement>
      <InputRequirement model={"quality"}>Качество карты</InputRequirement>
      <InputRequirement model={"moreMaps"}>Больше карт</InputRequirement>
      <InputRequirement model={"packSize"}>
        Размер групп монстров
      </InputRequirement>
      <InputRequirement model={"moreScarab"}>Больше скарабеев</InputRequirement>
      <InputRequirement model={"rarity"}>Редкость предметов</InputRequirement>
    </div>
  );
}
