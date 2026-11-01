import { Show, useContext } from "solid-js";
import { FragmentsContext } from "./context";

export function SearchInput() {
  const { search, setSearch } = useContext(FragmentsContext);

  return (
    <label class="input w-full">
      <span class="label">Поиск</span>
      <input
        onInput={(e) => setSearch(e.currentTarget.value)}
        placeholder="Название предмета: «риск», «Зората», «жертва»…"
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
