import { RangeInput } from "./ui/RangeInput";

export function MonstersModifiers() {
  return (
    <div class="space-y-4 min-w-0">
      <h3 class="text-lg font-semibold text-gray-300">Монстры и плотность</h3>
      <RangeInput model={"quantity"}>Количество предметов</RangeInput>
      <RangeInput model={"rarity"}>Редкость предметов</RangeInput>
      <RangeInput model={"packSize"}>Размер групп монстров</RangeInput>
    </div>
  );
}
