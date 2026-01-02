import { type ParentProps, useContext } from "solid-js";
import type { KeyOfType } from "~/lib/key-of-type";
import { MapsContext, type MapsStore } from "~/pages/maps/context/context";

type Color =
  | "primary"
  | "secondary"
  | "accent"
  | "neutral"
  | "success"
  | "warning"
  | "info"
  | "error";

type Props = {
  model: KeyOfType<MapsStore, boolean | undefined>;
  color?: Color;
  textColor?: Color | "neutral";
};

export function CheckboxFilter({
  model,
  children,
  color = "primary",
}: ParentProps<Props>) {
  const { store, updateStore } = useContext(MapsContext);

  const handleChange = (e: { target: { checked: boolean } }) => {
    updateStore(model, () => e.target.checked);
  };

  const checkedColor = `checkbox-${color}`;

  return (
    <div class={"row gap-2"}>
      <input
        checked={store[model]}
        class={`checkbox rounded-md`}
        classList={{
          [checkedColor]: !!store[model],
        }}
        onChange={handleChange}
        type="checkbox"
      />
      <span>{children}</span>
    </div>
  );
}
