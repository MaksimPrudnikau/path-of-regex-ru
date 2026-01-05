import { type ParentProps, useContext } from "solid-js";
import type { KeyOfType } from "~/lib/key-of-type";
import { type IncludeMapType, MapsContext, type MapsStore } from "~/pages/maps/context/maps";
import { CheckboxFilter } from "./CheckboxFilter";
import { ExcludeToggle } from "./ExcludeToggle";

type Props = {
  model: KeyOfType<MapsStore, boolean | undefined>;
  typeModel: KeyOfType<MapsStore, IncludeMapType>;
  color?: string;
  textColor?: string;
};

export function CheckboxWithExclude({
  model,
  typeModel,
  children,
  color,
  textColor,
}: ParentProps<Props>) {
  const { store } = useContext(MapsContext);

  return (
    <ExcludeToggle isChecked={() => store[model]} model={typeModel}>
      <CheckboxFilter color={color} model={model} textColor={textColor}>
        {children}
      </CheckboxFilter>
    </ExcludeToggle>
  );
}
