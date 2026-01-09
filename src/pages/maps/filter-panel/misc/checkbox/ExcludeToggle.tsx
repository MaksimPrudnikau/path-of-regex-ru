import { type Accessor, createEffect, type ParentProps, Show, useContext, } from "solid-js";
import type { KeyOfType } from "~/lib/key-of-type";
import { MapsProfileContext } from "~/pages/maps/context";
import { IncludeMapType, type MapsStore } from "~/pages/maps/context/maps";
import { ExcludeFilter } from "./ExcludeFilter";

type Props = {
  model: KeyOfType<MapsStore, IncludeMapType>;
  isChecked: Accessor<boolean>;
};
export function ExcludeToggle({ isChecked, children, model }: ParentProps<Props>) {
  const { updateProfile } = useContext(MapsProfileContext);

  createEffect(() => {
    if (isChecked()) {
      return;
    }

    updateProfile((prev) => ({ ...prev, [model]: IncludeMapType.Include }));
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
