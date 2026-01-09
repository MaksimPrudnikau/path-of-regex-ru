import { createEffect, type ParentProps, useContext } from "solid-js";
import type { KeyOfType } from "~/lib/key-of-type";
import { MapsProfileContext, type MapsStore, type ModRange } from "~/pages/maps/context";
import { NumberInput } from "./NumberInput";

type Props = {
  model: KeyOfType<MapsStore, ModRange>;
  min?: number;
  max?: number;
};

export function RangeInput({ model, children, min = 0, max }: ParentProps<Props>) {
  const { currentProfile, updateProfile } = useContext(MapsProfileContext);

  const update = (value: number | undefined, fieldName: keyof ModRange) => {
    updateProfile((prev) => {
      return {
        ...prev,
        [model]: {
          ...prev[model],
          [fieldName]: value,
        },
      };
    });
  };

  const range = () => currentProfile()[model];

  createEffect(() => {
    if (model !== "level") {
      return;
    }

    console.log(currentProfile()[model]);
  });

  return (
    <div class={"row w-full justify-between"}>
      <span class={"min-w-fit"}>{children}</span>
      <div class={"row gap-2"}>
        <NumberInput
          max={range().max}
          min={min}
          updateStore={(value) => update(value, "min")}
          value={range().min}
        >
          мин
        </NumberInput>
        <NumberInput
          max={max}
          min={range().min}
          updateStore={(value) => update(value, "max")}
          value={range().max}
        >
          макс
        </NumberInput>
      </div>
    </div>
  );
}
