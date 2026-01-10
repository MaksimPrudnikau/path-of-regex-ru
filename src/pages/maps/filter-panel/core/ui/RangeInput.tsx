import { createMemo, type ParentProps, useContext } from "solid-js";
import type { KeyOfType } from "~/lib/key-of-type";
import { MapsProfileContext, type MapsStore, type ModRange } from "~/pages/maps/context";
import { NumberInput } from "./NumberInput";

type Props = {
  model: KeyOfType<MapsStore, ModRange>;
  min?: number;
  max?: number;
};

export function RangeInput({ model, children, min = 0, max }: ParentProps<Props>) {
  const { profiles, currentProfileName, updateProfile } = useContext(MapsProfileContext);

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

  const getMin = createMemo(() => profiles[currentProfileName()][model].min);
  const getMax = createMemo(() => profiles[currentProfileName()][model].max);

  return (
    <div class={"row w-full"}>
      <span class={"min-w-52"}>{children}</span>
      <div class={"row gap-2"}>
        <NumberInput
          max={getMax()}
          min={min}
          updateStore={(value) => update(value, "min")}
          value={getMin}
        >
          мин
        </NumberInput>
        <NumberInput
          max={max}
          min={getMin()}
          updateStore={(value) => update(value, "max")}
          value={getMax}
        >
          макс
        </NumberInput>
      </div>
    </div>
  );
}
