import { RangeInput } from "./ui/RangeInput";

export function BasicModifiers() {
  return (
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-300">
        Основные параметры карты
      </h3>
      <RangeInput max={17} min={1} model={"level"}>
        Уровень карты
      </RangeInput>
      <RangeInput model={"quality"}>Качество карты</RangeInput>
    </div>
  );
}
