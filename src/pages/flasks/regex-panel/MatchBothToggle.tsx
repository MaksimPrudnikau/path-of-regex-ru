import { useContext } from "solid-js";
import { FlasksContext } from "../context";

export function MatchBothToggle() {
  const { state, update } = useContext(FlasksContext);

  return (
    <label
      class="label gap-2 cursor-pointer tooltip tooltip-bottom"
      data-tip="Включено: нужен один из выбранных префиксов и один из выбранных суффиксов. Выключено: хватит любого выбранного свойства"
    >
      <input
        checked={state().matchBoth}
        class="toggle toggle-primary"
        onChange={(e) => update({ matchBoth: e.currentTarget.checked })}
        type="checkbox"
      />
      <span>И префикс, и суффикс</span>
    </label>
  );
}
