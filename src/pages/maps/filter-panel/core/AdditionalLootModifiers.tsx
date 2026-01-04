import { RangeInput } from "./ui/RangeInput";

export function AdditionalLootModifiers() {
  return (
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-300">Дополнительный дроп</h3>
      <RangeInput model={"moreCurrency"}>Больше валюты</RangeInput>
      <RangeInput model={"moreMaps"}>Больше карт</RangeInput>
      <RangeInput model={"moreScarab"}>Больше скарабеев</RangeInput>
    </div>
  );
}
