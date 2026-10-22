import { useContext } from "solid-js";
import { BestiaryContext } from "../context";

export function ExcludeToggle() {
  const { state, update } = useContext(BestiaryContext);

  return (
    <label
      class="label gap-2 cursor-pointer tooltip tooltip-bottom"
      data-tip="Подсветить всех, кроме выбранных. Так ценные звери не попадут в жертву случайно"
    >
      <input
        checked={state().exclude}
        class="toggle toggle-error"
        onChange={(e) => update({ exclude: e.currentTarget.checked })}
        type="checkbox"
      />
      <span classList={{ "text-error": state().exclude }}>Исключить выбранных</span>
    </label>
  );
}
