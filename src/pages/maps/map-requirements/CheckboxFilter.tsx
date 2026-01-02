import { type ParentProps, useContext } from "solid-js";
import type { KeyOfType } from "~/lib/key-of-type";
import { MapsContext, type MapsStore } from "~/pages/maps/context/context";

type Props = {
  model: KeyOfType<MapsStore, boolean | undefined>;
};

export function CheckboxFilter({ model, children }: ParentProps<Props>) {
  const { store, updateStore } = useContext(MapsContext);

  const handleChange = (e: { target: { checked: boolean } }) => {
    updateStore(model, () => e.target.checked);
  };

  return (
    <div class={"row gap-2"}>
      <input
        checked={store[model]}
        class="checkbox rounded-md"
        classList={{ "checkbox-primary": !!store[model] }}
        onChange={handleChange}
        type="checkbox"
      />
      <span>{children}</span>
    </div>
  );
}
