import { For, useContext } from "solid-js";
import { FlasksContext } from "../context";
import { type FlaskKind, KIND_LABELS } from "../data";

export function KindFilter() {
  const { state, update } = useContext(FlasksContext);

  const toggleKind = (kind: FlaskKind) => {
    const rest = state().kinds.filter((known) => known !== kind);
    update({ kinds: rest.length === state().kinds.length ? [...rest, kind] : rest });
  };

  return (
    <div class="flex flex-wrap items-center gap-2">
      <span class="text-sm text-base-content/60">Показывать флаконы:</span>
      <For each={Object.entries(KIND_LABELS) as [FlaskKind, string][]}>
        {([kind, label]) => (
          <button
            aria-pressed={state().kinds.includes(kind)}
            class="btn btn-sm btn-primary"
            classList={{ "btn-soft": !state().kinds.includes(kind) }}
            onClick={() => toggleKind(kind)}
            type="button"
          >
            {label}
          </button>
        )}
      </For>
    </div>
  );
}
