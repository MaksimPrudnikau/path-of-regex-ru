import { useContext } from "solid-js";
import { FlaskWindowContext } from "../context";
import { JoinToggle } from "./JoinToggle";

export function AffixJoin() {
  const { state, update } = useContext(FlaskWindowContext);

  return (
    <div class="divider my-3">
      <JoinToggle
        isAnd={state().matchBoth}
        onChange={(matchBoth) => update({ matchBoth })}
        title="И: нужны префикс и суффикс сразу. ИЛИ: хватит любого из них"
      />
    </div>
  );
}
