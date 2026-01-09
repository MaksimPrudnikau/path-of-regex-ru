import { AdditionalLootModifiers, BasicModifiers, MonstersModifiers } from "./modifiers";

export function CoreModifiers() {
  return (
    <div class="flex row flex-wrap gap-x-6 gap-y-4">
      <BasicModifiers />
      <MonstersModifiers />
      <AdditionalLootModifiers />
    </div>
  );
}
