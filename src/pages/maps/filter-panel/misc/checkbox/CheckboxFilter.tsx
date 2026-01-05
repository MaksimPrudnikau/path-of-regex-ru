import { type ParentProps, useContext } from "solid-js";
import type { KeyOfType } from "~/lib/key-of-type";
import { MapsContext, type MapsStore } from "~/pages/maps/context/maps/context";

type Props = {
  model: KeyOfType<MapsStore, boolean | undefined>;
  color?: string;
  textColor?: string;
};

export function CheckboxFilter({
  model,
  children,
  color = "checkbox-primary",
  textColor = "",
}: ParentProps<Props>) {
  const { store, updateStore } = useContext(MapsContext);

  const handleChange = (e: { target: { checked: boolean } }) => {
    updateStore(model, () => e.target.checked);
  };

  return (
    <div class={"row gap-2"}>
      <input
        checked={store[model]}
        class={`checkbox rounded-md`}
        classList={{
          [color]: store[model],
        }}
        onChange={handleChange}
        type="checkbox"
      />
      <span
        classList={{
          [textColor]: true,
        }}
      >
        {children}
      </span>
    </div>
  );
}
