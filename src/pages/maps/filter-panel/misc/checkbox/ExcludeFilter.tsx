import { useContext } from "solid-js";
import type { KeyOfType } from "~/lib/key-of-type";
import {
  IncludeMapType,
  MapsContext,
  type MapsStore,
} from "~/pages/maps/context/context";

type Props = {
  model: KeyOfType<MapsStore, IncludeMapType>;
};

export function ExcludeFilter({ model }: Props) {
  const { store, updateStore } = useContext(MapsContext);
  const update = (value: IncludeMapType) => {
    updateStore(model, () => value);
  };

  const isChecked = () => store[model] === IncludeMapType.Exclude;
  return (
    <div class={"row gap-2"}>
      <input
        checked={isChecked()}
        class="checkbox rounded-md"
        classList={{
          "checkbox-secondary": isChecked(),
        }}
        onChange={() =>
          update(isChecked() ? IncludeMapType.Include : IncludeMapType.Exclude)
        }
        type="checkbox"
      />
      <span class={"text-secondary"}>Исключить</span>
    </div>
  );
}
