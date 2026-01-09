import { GenericModifiers } from "../ui/GenericModifiers";
import { RangeInput } from "../ui/RangeInput";

export function BasicModifiers() {
  return (
    <GenericModifiers title="Основные параметры карты">
      <RangeInput max={17} min={1} model={"level"}>
        Уровень карты
      </RangeInput>
      <RangeInput model={"quality"}>Качество карты</RangeInput>
    </GenericModifiers>
  );
}
