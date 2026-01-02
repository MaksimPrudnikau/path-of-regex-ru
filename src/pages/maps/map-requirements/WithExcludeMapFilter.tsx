import { type ParentProps, useContext } from "solid-js";
import type { KeyOfType } from "~/lib/key-of-type";
import { type IncludeMapType, MapsContext, type MapsStore, } from "~/pages/maps/context/context";
import { CheckboxFilter } from "./CheckboxFilter";
import { WithExclude } from "./WithExclude";

type Props = {
  model: KeyOfType<MapsStore, boolean | undefined>;
  typeModel: KeyOfType<MapsStore, IncludeMapType>;
};

export function WithExcludeMapFilter({
  model,
  typeModel,
  children,
}: ParentProps<Props>) {
  const { store } = useContext(MapsContext);

  return (
    <WithExclude isChecked={() => !!store[model]} model={typeModel}>
      <CheckboxFilter model={model}>{children}</CheckboxFilter>
    </WithExclude>
  );
}
