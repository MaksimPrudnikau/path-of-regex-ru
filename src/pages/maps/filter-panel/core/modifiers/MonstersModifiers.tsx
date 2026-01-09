import { GenericModifiers } from "../ui/GenericModifiers";
import { RangeInput } from "../ui/RangeInput";

export function MonstersModifiers() {
  return (
    <GenericModifiers title={"Монстры и плотность"}>
      <RangeInput model={"quantity"}>Количество предметов</RangeInput>
      <RangeInput model={"rarity"}>Редкость предметов</RangeInput>
      <RangeInput model={"packSize"}>Размер групп монстров</RangeInput>
    </GenericModifiers>
  );
}
