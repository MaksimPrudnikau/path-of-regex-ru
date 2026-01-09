import { GenericModifiers } from "../ui/GenericModifiers";
import { RangeInput } from "../ui/RangeInput";

export function AdditionalLootModifiers() {
  return (
    <GenericModifiers title="Разное">
      <RangeInput model={"moreCurrency"}>Больше валюты</RangeInput>
      <RangeInput model={"moreMaps"}>Больше карт</RangeInput>
      <RangeInput model={"moreScarab"}>Больше скарабеев</RangeInput>
    </GenericModifiers>
  );
}
