import { Show, useContext } from "solid-js";
import { FlasksContext } from "../context";

export function SearchSwitcher() {
  const { searches, searchIndex, setSearchIndex } = useContext(FlasksContext);

  return (
    <Show when={searches().length > 1}>
      <div
        class="tooltip tooltip-bottom join before:text-justify"
        data-tip="Окна через ИЛИ с несколькими условиями поиск игры не умеет собрать в одну строку. Вставьте первую строку, заберите подсвеченное, затем вставьте следующую."
      >
        <button
          class="btn btn-primary join-item text-xl"
          disabled={searchIndex() === 0}
          onClick={() => setSearchIndex(searchIndex() - 1)}
          type="button"
        >
          ‹
        </button>
        <span class="btn btn-neutral join-item pointer-events-none">
          Строка {searchIndex() + 1} из {searches().length}
          <span class="badge badge-xs badge-ghost">?</span>
        </span>
        <button
          class="btn btn-primary join-item text-xl"
          disabled={searchIndex() === searches().length - 1}
          onClick={() => setSearchIndex(searchIndex() + 1)}
          type="button"
        >
          ›
        </button>
      </div>
    </Show>
  );
}
