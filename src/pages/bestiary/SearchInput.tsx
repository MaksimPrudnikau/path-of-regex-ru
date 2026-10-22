import { Show, useContext } from "solid-js";
import { BestiaryContext } from "./context";

export function SearchInput() {
  const { search, setSearch } = useContext(BestiaryContext);

  return (
    <label class="input w-full">
      <span class="label">Поиск</span>
      <input
        onInput={(e) => setSearch(e.currentTarget.value)}
        placeholder="Зверь или рецепт: «кольцо», «Фаррул», «скарабей»…"
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
