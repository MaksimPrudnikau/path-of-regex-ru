import { CoreModifiers } from "~/pages/maps/filter-panel/core/CoreModifiers";
import { MiscellaneousModifiers } from "./misc/MiscellaneousModifiers";

export function FilterPanel() {
  return (
    <div class="flex row flex-wrap gap-x-6 gap-y-4">
      <CoreModifiers />
      <MiscellaneousModifiers />
    </div>
  );
}
