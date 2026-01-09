import { type ParentProps, useContext } from "solid-js";
import type { KeyOfType } from "~/lib/key-of-type";
import { MapsProfileContext, type MapsStore } from "~/pages/maps/context";

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
  const { currentProfile, updateProfile } = useContext(MapsProfileContext);

  const handleChange = (e: { target: { checked: boolean } }) => {
    updateProfile((prev) => {
      return { ...prev, [model]: e.target.checked };
    });
  };

  return (
    <div class={"row gap-2"}>
      <input
        checked={currentProfile()[model]}
        class={`checkbox rounded-md`}
        classList={{
          [color]: currentProfile()[model],
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
