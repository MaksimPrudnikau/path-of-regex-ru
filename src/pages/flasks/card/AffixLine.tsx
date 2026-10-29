import { useContext } from "solid-js";
import { FlaskWindowContext } from "../context";
import { type FlaskMod, modById } from "../data";
import { ModSelect } from "./ModSelect";
import { TierSelect } from "./TierSelect";

type Props = {
  mod: FlaskMod;
};

export function AffixLine(props: Props) {
  const { replaceMod, setTierCount } = useContext(FlaskWindowContext);

  const changeMod = (modId: string) => replaceMod(props.mod.id, modId, modById.get(modId)?.tiers.length ?? 1);

  return (
    <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
      <TierSelect mod={props.mod} />
      <ModSelect
        affix={props.mod.affix}
        class="select-ghost min-w-60 flex-1 font-semibold"
        onSelect={changeMod}
        placeholder="Свойство"
        value={props.mod.id}
      />
      <button
        aria-label="Убрать свойство"
        class="btn btn-ghost btn-sm btn-square text-base-content/50"
        onClick={() => setTierCount(props.mod.id, undefined)}
        type="button"
      >
        ✕
      </button>
    </div>
  );
}
