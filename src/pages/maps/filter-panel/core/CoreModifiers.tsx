import { AdditionalLootModifiers, BasicModifiers, MonstersModifiers } from "./modifiers";

export function CoreModifiers() {
  return (
    <div class="flex row flex-wrap gap-10">
      <BasicModifiers />
      <MonstersModifiers />
      <AdditionalLootModifiers />
    </div>
  );
}
