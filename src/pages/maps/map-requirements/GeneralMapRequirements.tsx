import { InputRequirement } from "./InputRequirement";

export function GeneralMapRequirements() {
  return (
    <div class={"grid grid-cols-2 gap-y-4"}>
      <InputRequirement model={"level"}>Уровень карты</InputRequirement>
      <InputRequirement model={"currency"}>Больше валюты</InputRequirement>
      <InputRequirement model={"quality"}>Качество карты</InputRequirement>
      <InputRequirement model={"maps"}>Больше карт</InputRequirement>
      <InputRequirement model={"packSize"}>
        Размер групп монстров
      </InputRequirement>
      <InputRequirement model={"scarab"}>Больше скарабеев</InputRequirement>
      <InputRequirement model={"rarity"}>Редкость предметов</InputRequirement>
    </div>
  );
}
