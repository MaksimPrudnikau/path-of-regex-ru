import { Show, useContext } from "solid-js";
import { FragmentsContext } from "./context";

export function SearchInput() {
  const { importRegex, search, setSearch } = useContext(FragmentsContext);

  return (
    <label class="input w-full">
      <span class="label">Поиск</span>
      <input
        onInput={(e) => setSearch(e.currentTarget.value)}
        onPaste={(e) => {
          if (importRegex(e.clipboardData?.getData("text") ?? "")) e.preventDefault();
        }}
        placeholder="Название предмета («риск», «Зората») или вставьте готовую строку поиска"
        type="text"
        value={search()}
      />
      <Show when={search() !== ""}>
        <button class="btn btn-ghost btn-xs" onClick={() => setSearch("")} type="button">
          Очистить
        </button>
      </Show>
    </label>
  );
}
