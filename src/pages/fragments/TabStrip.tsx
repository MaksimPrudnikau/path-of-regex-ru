import { For, useContext } from "solid-js";
import { FragmentsContext } from "./context";
import { itemById } from "./data";
import { TABS } from "./tabs";

export function TabStrip() {
  const { setTab, state, tabItemCount } = useContext(FragmentsContext);

  return (
    <div aria-label="Вкладки тайника" class="tabs tabs-box w-fit max-w-full flex-wrap gap-2" role="tablist">
      <For each={TABS}>
        {(tab) => (
          <button
            aria-selected={state().tab === tab.id}
            class="tab h-auto gap-2 border border-base-content/15 py-1.5"
            classList={{ "tab-active border-primary": state().tab === tab.id }}
            onClick={() => setTab(tab.id)}
            role="tab"
            type="button"
          >
            <img alt="" class="size-8 object-contain" src={itemById.get(tab.iconItem)?.icon} />
            {tab.label}
            <span class="badge badge-sm badge-ghost">{tabItemCount(tab.id)}</span>
          </button>
        )}
      </For>
    </div>
  );
}
