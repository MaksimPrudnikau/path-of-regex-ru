import { createMemo, createSignal, For, Show, useContext } from "solid-js";
import { FlaskWindowContext } from "../context";
import { flaskData } from "../data";
import { BasePicker } from "./BasePicker";

export function BaseIcons() {
  const { selectBases, state } = useContext(FlaskWindowContext);
  const [isPickerOpen, setIsPickerOpen] = createSignal(false);
  const bases = createMemo(() => flaskData.bases.filter((base) => state().bases.includes(base.id)));

  return (
    <div class="col gap-3">
      <div class="flex flex-wrap items-start justify-center gap-x-2 gap-y-3">
        <For each={bases()}>
          {(base, index) => (
            <>
              <Show when={index() > 0}>
                <span class="self-center pb-6 text-sm text-base-content/50">или</span>
              </Show>
              <button
                aria-label={`Убрать ${base.name}`}
                class="group relative col w-28 items-center gap-1 rounded-box p-1 hover:bg-base-100"
                onClick={() => selectBases([base.id], false)}
                type="button"
              >
                <img alt="" class="h-28 w-auto transition-opacity group-hover:opacity-50" src={`/icons/flasks/${base.id}.webp`} />
                <span class="text-center text-xs leading-tight">{base.name}</span>
                <span class="btn btn-circle btn-sm btn-error pointer-events-none absolute top-10 opacity-0 transition-opacity group-hover:opacity-100">
                  ✕
                </span>
              </button>
            </>
          )}
        </For>
        <button
          aria-expanded={isPickerOpen()}
          class="col h-36 w-28 items-center justify-center gap-1 rounded-box border-2 border-dashed border-base-content/20 text-base-content/50 hover:border-base-content/40 hover:text-base-content"
          classList={{ "border-base-content/40 text-base-content": isPickerOpen() }}
          onClick={() => setIsPickerOpen(!isPickerOpen())}
          title="Добавить базу"
          type="button"
        >
          <span class="text-4xl leading-none">+</span>
          <Show when={bases().length === 0}>
            <span class="px-2 text-center text-xs">Любой флакон. Нажмите, чтобы выбрать базу</span>
          </Show>
        </button>
      </div>
      <Show when={isPickerOpen()}>
        <BasePicker onClose={() => setIsPickerOpen(false)} />
      </Show>
    </div>
  );
}
