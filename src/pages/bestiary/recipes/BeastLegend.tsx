import { AnyBeastSlot } from "./AnyBeastSlot";

export function BeastLegend() {
  return (
    <div class="flex flex-wrap gap-x-5 gap-y-2 mt-2 text-sm text-base-content/60">
      <span class="flex items-center gap-2">
        <AnyBeastSlot />
        количество редких зверей для рецепта
      </span>
    </div>
  );
}
