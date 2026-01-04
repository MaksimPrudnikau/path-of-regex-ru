import { AdditionalLootModifiers } from "./AdditionalLootModifiers";
import { BasicModifiers } from "./BasicModifiers";
import { MonstersModifiers } from "./MonstersModifiers";

export function CoreModifiers() {
  return (
    <div class="grid grid-cols-1 md:grid-cols-[auto_auto_auto] gap-x-8 gap-y-6 w-full">
      <BasicModifiers />
      <MonstersModifiers />
      <AdditionalLootModifiers />
    </div>
  );
}
