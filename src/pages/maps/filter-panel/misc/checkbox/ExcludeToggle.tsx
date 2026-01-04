import { type Accessor, createEffect, type ParentProps, Show, useContext, } from "solid-js";
import type { KeyOfType } from "~/lib/key-of-type";
import { IncludeMapType, MapsContext, type MapsStore, } from "~/pages/maps/context/context";
import { ExcludeFilter } from "./ExcludeFilter";

type Props = {
  model: KeyOfType<MapsStore, IncludeMapType>;
  isChecked: Accessor<boolean>;
};
export function ExcludeToggle({
  isChecked,
  children,
  model,
}: ParentProps<Props>) {
  const { updateStore } = useContext(MapsContext);

  createEffect(() => {
    if (isChecked()) {
      return;
    }

    updateStore(model, IncludeMapType.Include);
  });

  return (
    <div class={"row gap-5"}>
      {children}
      <Show when={isChecked()}>
        <ExcludeFilter model={model} />
      </Show>
    </div>
  );
}
