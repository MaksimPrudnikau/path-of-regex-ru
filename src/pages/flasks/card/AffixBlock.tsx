import { createMemo, For, Show, useContext } from "solid-js";
import { FlaskWindowContext } from "../context";
import type { Affix } from "../data";
import { AffixLine } from "./AffixLine";
import { ModSelect } from "./ModSelect";
import { selectedMods } from "./selectedMods";

type Props = {
  affix: Affix;
};

export function AffixBlock(props: Props) {
  const { setTiers, state } = useContext(FlaskWindowContext);
  const mods = createMemo(() => selectedMods(state(), props.affix));
  const isPrefix = () => props.affix === "prefix";

  return (
    <div class="col gap-1">
      <h4 class="text-xs uppercase tracking-wide text-base-content/60">{isPrefix() ? "Префикс" : "Суффикс"}</h4>
      <For each={mods()}>
        {(mod, index) => (
          <>
            <Show when={index() > 0}>
              <span class="pl-2 text-xs text-base-content/50">или</span>
            </Show>
            <AffixLine mod={mod} />
          </>
        )}
      </For>
      <Show when={mods().length === 0}>
        <span class="pl-1 text-sm text-base-content/50">Любой</span>
      </Show>
      <ModSelect
        affix={props.affix}
        class="w-60 max-w-full border-dashed bg-transparent text-base-content/60"
        onSelect={(modId) => setTiers(modId, [])}
        placeholder={isPrefix() ? "+ Добавить префикс" : "+ Добавить суффикс"}
        value=""
      />
    </div>
  );
}
