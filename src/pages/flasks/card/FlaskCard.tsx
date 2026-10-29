import { Show, useContext } from "solid-js";
import { type FlaskWindow, FlasksContext } from "../context";
import { AffixBlock } from "./AffixBlock";
import { AffixJoin } from "./AffixJoin";
import { BaseIcons } from "./BaseIcons";
import { FlaskWindowProvider } from "./FlaskWindowProvider";

type Props = {
  window: FlaskWindow;
  number: number;
};

export function FlaskCard(props: Props) {
  const { duplicateWindow, removeWindow, state } = useContext(FlasksContext);

  return (
    <FlaskWindowProvider window={props.window}>
      <section class="card w-full max-w-md border border-base-content/15 bg-base-300 shadow-lg">
        <div class="card-body gap-4 p-5">
          <div class="flex items-center gap-2">
            <h3 class="text-sm uppercase tracking-wide text-base-content/60">Окно {props.number}</h3>
            <button class="btn btn-ghost btn-sm ml-auto" onClick={() => duplicateWindow(props.window.id)} type="button">
              Копировать
            </button>
            <Show when={state().windows.length > 1}>
              <button class="btn btn-ghost btn-sm text-error" onClick={() => removeWindow(props.window.id)} type="button">
                Удалить
              </button>
            </Show>
          </div>
          <BaseIcons />
          <div class="col gap-1">
            <AffixBlock affix="prefix" />
            <AffixJoin />
            <AffixBlock affix="suffix" />
          </div>
        </div>
      </section>
    </FlaskWindowProvider>
  );
}
