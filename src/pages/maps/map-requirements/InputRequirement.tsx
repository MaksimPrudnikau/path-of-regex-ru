import { type ParentProps, useContext } from "solid-js";
import { MapsContext, type MapsStore, type ModRange, } from "~/pages/maps/context/context";
import { NumberInput } from "~/pages/maps/map-requirements/NumberInput";

type Props = {
  model: keyof MapsStore & ModRange;
};

export function InputRequirement({ model, children }: ParentProps<Props>) {
  const { updateStore } = useContext(MapsContext);

  const update = (value: number | undefined, fieldName: keyof ModRange) => {
    updateStore(model, (prev: ModRange) => ({ ...prev, [fieldName]: value }));
  };

  return (
    <div class={"grid grid-cols-2 items-center gap-3"}>
      <span>{children}</span>
      <div class={"row gap-2"}>
        <NumberInput updateStore={(value) => update(value, "min")}>
          мин
        </NumberInput>
        <NumberInput updateStore={(value) => update(value, "max")}>
          макс
        </NumberInput>
      </div>
    </div>
  );
}
