import { createMemo, For, Show, useContext } from "solid-js";
import { BestiaryContext } from "../context";
import { BEAST_TONES } from "../beastTone";
import { beastById } from "../data";

export function SelectedBeasts() {
  const { state, toggleBeast } = useContext(BestiaryContext);
  const selected = createMemo(() => state().selected.flatMap((id) => beastById.get(id) ?? []));
  const hiddenCount = createMemo(() => Math.max(0, selected().length - MAX_SHOWN));

  return (
    <Show when={selected().length > 0}>
      <div class="flex flex-wrap items-center gap-2">
        <span class="text-sm text-base-content/60">Выбрано: {selected().length}</span>
        <For each={selected().slice(0, MAX_SHOWN)}>
          {(beast) => (
            <button
              aria-label={`Убрать ${beast.name}`}
              class={`badge badge-soft gap-1 cursor-pointer hover:badge-outline ${BEAST_TONES[beast.color].badge}`}
              onClick={() => toggleBeast(beast.id)}
              type="button"
            >
              {beast.name} ✕
            </button>
          )}
        </For>
        <Show when={hiddenCount() > 0}>
          <span class="text-sm text-base-content/60">и ещё {hiddenCount()}</span>
        </Show>
      </div>
    </Show>
  );
}

const MAX_SHOWN = 12;
