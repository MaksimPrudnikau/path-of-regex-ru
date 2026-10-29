import { useContext } from "solid-js";
import { FlaskWindowContext } from "../context";
import type { FlaskMod } from "../data";
import { ModSelect } from "./ModSelect";
import { TierSelect } from "./TierSelect";

type Props = {
  mod: FlaskMod;
};

export function AffixLine(props: Props) {
  const { replaceMod, setTiers } = useContext(FlaskWindowContext);

  return (
    <div class="flex items-center gap-1">
      <TierSelect mod={props.mod} />
      <ModSelect
        affix={props.mod.affix}
        class="select-ghost min-w-0 flex-1 font-semibold"
        onSelect={(modId) => replaceMod(props.mod.id, modId)}
        placeholder="Свойство"
        value={props.mod.id}
      />
      <button
        aria-label="Убрать свойство"
        class="btn btn-ghost btn-sm btn-square text-base-content/50"
        onClick={() => setTiers(props.mod.id, undefined)}
        type="button"
      >
        ✕
      </button>
    </div>
  );
}
