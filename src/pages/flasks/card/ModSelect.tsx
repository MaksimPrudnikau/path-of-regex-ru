import { createMemo, createSignal, createUniqueId, For, Show, useContext } from "solid-js";
import { FlaskWindowContext } from "../context";
import { type Affix, type FlaskMod, modById } from "../data";
import { availableMods } from "./selectedMods";

type Props = {
  affix: Affix;
  value: string;
  placeholder: string;
  class: string;
  onSelect: (modId: string) => void;
};

export function ModSelect(props: Props) {
  const { state } = useContext(FlaskWindowContext);
  const [query, setQuery] = createSignal("");
  const id = `mods-${createUniqueId()}`;
  const options = createMemo(() =>
    availableMods(state(), props.affix).filter((mod) => mod.id === props.value || state().mods[mod.id] === undefined),
  );
  const found = createMemo(() => options().filter((mod) => matches(mod, query())));
  const selectedText = () => modLabel(modById.get(props.value));
  let popover!: HTMLDivElement;
  let search!: HTMLInputElement;
  const select = (modId: string) => {
    popover.hidePopover();
    if (modId !== props.value) props.onSelect(modId);
  };

  return (
    <>
      <button
        aria-label={props.placeholder}
        class={`select select-sm items-center ${props.class}`}
        popovertarget={id}
        style={{ "anchor-name": `--${id}` }}
        title={selectedText()}
        type="button"
      >
        <span class="truncate">{selectedText() || props.placeholder}</span>
      </button>
      <div
        class="dropdown my-1 w-96 max-w-[90vw] rounded-box border border-base-content/15 bg-base-100 p-2 shadow-lg [position-try-fallbacks:flip-block]"
        id={id}
        onToggle={(e) => {
          if (e.newState !== "open") return;
          setQuery("");
          search.focus();
        }}
        popover
        ref={popover}
        style={{ "position-anchor": `--${id}` }}
      >
        <input
          aria-label="Поиск свойства"
          class="input input-sm w-full"
          onInput={(e) => setQuery(e.currentTarget.value)}
          onKeyDown={(e) => {
            const first = found()[0];
            if (e.key === "Enter" && first) select(first.id);
          }}
          placeholder="Поиск"
          ref={search}
          type="search"
          value={query()}
        />
        <ul class="menu mt-1 max-h-72 w-full flex-nowrap overflow-y-auto p-0">
          <For each={found()}>
            {(mod) => (
              <li>
                <button classList={{ "menu-active": mod.id === props.value }} onClick={() => select(mod.id)} type="button">
                  {modLabel(mod)}
                </button>
              </li>
            )}
          </For>
          <Show when={found().length === 0}>
            <li class="menu-disabled">
              <span>Ничего не найдено</span>
            </li>
          </Show>
        </ul>
      </div>
    </>
  );
}

function modLabel(mod: FlaskMod | undefined): string {
  return mod?.text.replaceAll("\n", " / ") ?? "";
}

function matches(mod: FlaskMod, query: string): boolean {
  const text = mod.text.toLowerCase();
  return query.toLowerCase().split(/\s+/).every((word) => text.includes(word));
}
