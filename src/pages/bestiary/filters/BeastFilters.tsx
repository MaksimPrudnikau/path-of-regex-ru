import { For, useContext } from "solid-js";
import { BestiaryContext } from "../context";
import { type BeastColor, families, groups } from "../data";
import { BEAST_TONES } from "../beastTone";
import { FilterSelect } from "./FilterSelect";

export function BeastFilters() {
  const { applyFilters, state } = useContext(BestiaryContext);

  const toggleColor = (color: BeastColor, enabled: boolean) => {
    const rest = state().colors.filter((item) => item !== color);
    applyFilters({ colors: enabled ? [...rest, color] : rest });
  };

  return (
    <div class="flex flex-wrap items-center gap-3">
      <For each={COLORS}>
        {([color, label]) => (
          <label class="label gap-2 cursor-pointer">
            <input
              checked={state().colors.includes(color)}
              class={`checkbox checkbox-sm ${BEAST_TONES[color].checkbox}`}
              onChange={(e) => toggleColor(color, e.currentTarget.checked)}
              type="checkbox"
            />
            {label}
          </label>
        )}
      </For>
      <FilterSelect
        allLabel="Все"
        label="Группа"
        onChange={(group) => applyFilters({ group })}
        options={groups}
        value={state().group}
      />
      <FilterSelect
        allLabel="Все"
        label="Семейство"
        onChange={(family) => applyFilters({ family })}
        options={families}
        value={state().family}
      />
    </div>
  );
}

const COLORS: [BeastColor, string][] = [
  ["red", "Красные"],
  ["yellow", "Жёлтые"],
];
