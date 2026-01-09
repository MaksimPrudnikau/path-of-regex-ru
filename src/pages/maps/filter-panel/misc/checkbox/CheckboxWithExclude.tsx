import { type ParentProps, useContext } from "solid-js";
import type { KeyOfType } from "~/lib/key-of-type";
import { MapsProfileContext } from "~/pages/maps/context";
import type { IncludeMapType, MapsStore } from "~/pages/maps/context/maps";
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
  const { currentProfile } = useContext(MapsProfileContext);

  return (
    <ExcludeToggle isChecked={() => currentProfile()[model]} model={typeModel}>
      <CheckboxFilter color={color} model={model} textColor={textColor}>
        {children}
      </CheckboxFilter>
    </ExcludeToggle>
  );
}
