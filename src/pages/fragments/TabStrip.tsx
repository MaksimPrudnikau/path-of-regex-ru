import { For, useContext } from "solid-js";
import { FragmentsContext } from "./context";
import { TABS } from "./tabs";

export function TabStrip() {
  const { setTab, state, tabItemCount } = useContext(FragmentsContext);

  return (
    <div aria-label="Вкладки тайника" class="tabs tabs-box w-fit max-w-full flex-wrap" role="tablist">
      <For each={TABS}>
        {(tab) => (
          <button
            aria-selected={state().tab === tab.id}
            class="tab gap-2"
            classList={{ "tab-active": state().tab === tab.id }}
            onClick={() => setTab(tab.id)}
            role="tab"
            type="button"
          >
            {tab.label}
            <span class="badge badge-sm badge-ghost">{tabItemCount(tab.id)}</span>
          </button>
        )}
      </For>
    </div>
  );
}
