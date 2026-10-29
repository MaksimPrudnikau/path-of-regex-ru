import { Index, Show, useContext } from "solid-js";
import { FlasksContext } from "../context";
import { FlaskCard } from "./FlaskCard";
import { NewWindowButton } from "./NewWindowButton";

export function WindowList() {
  const { state } = useContext(FlasksContext);

  return (
    <div class="flex flex-wrap items-stretch justify-center gap-4">
      <Index each={state().windows}>
        {(window, index) => (
          <>
            <Show when={index > 0}>
              <div class="self-center text-2xl font-bold uppercase text-primary" title="Флакон подойдёт, если подходит под любое окно">
                или
              </div>
            </Show>
            <FlaskCard number={index + 1} window={window()} />
          </>
        )}
      </Index>
      <NewWindowButton />
    </div>
  );
}
