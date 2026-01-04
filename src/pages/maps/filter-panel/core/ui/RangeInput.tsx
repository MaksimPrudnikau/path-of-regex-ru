import { type ParentProps, useContext } from "solid-js";
import type { KeyOfType } from "~/lib/key-of-type";
import { MapsContext, type MapsStore, type ModRange } from "../../../context/context";
import { NumberInput } from "./NumberInput";

type Props = {
  model: KeyOfType<MapsStore, ModRange>;
  min?: number;
  max?: number;
};

export function RangeInput({ model, children, min = 0, max }: ParentProps<Props>) {
  const { updateStore, store } = useContext(MapsContext);

  const update = (value: number | undefined, fieldName: keyof ModRange) => {
    updateStore(model, (prev: ModRange) => ({ ...prev, [fieldName]: value }));
  };

  return (
    <div class={"row w-full justify-between"}>
      <span class={"min-w-fit"}>{children}</span>
      <div class={"row gap-2"}>
        <NumberInput
          max={() => store[model].max}
          min={() => min}
          updateStore={(value) => update(value, "min")}
          value={() => store[model].min}
        >
          мин
        </NumberInput>
        <NumberInput
          max={() => max}
          min={() => store[model].min}
          updateStore={(value) => update(value, "max")}
          value={() => store[model].max}
        >
          макс
        </NumberInput>
      </div>
    </div>
  );
}
