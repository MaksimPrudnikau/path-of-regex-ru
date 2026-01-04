import { CoreModifiers } from "./core/CoreModifiers";
import { MiscellaneousModifiers } from "./misc/MiscellaneousModifiers";

export function FilterPanel() {
  return (
    <div class={"col gap-6"}>
      <CoreModifiers />
      <MiscellaneousModifiers />
    </div>
  );
}
