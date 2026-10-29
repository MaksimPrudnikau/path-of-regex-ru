import { createMemo, useContext } from "solid-js";
import { FlaskWindowContext } from "../context";
import type { FlaskBase } from "../data";

type Props = {
  base: FlaskBase;
};

export function BaseButton(props: Props) {
  const { selectBases, state } = useContext(FlaskWindowContext);
  const isSelected = createMemo(() => state().bases.includes(props.base.id));

  return (
    <div class="tooltip tooltip-bottom" data-tip={`${props.base.name}, с ${props.base.level} уровня`}>
      <button
        aria-label={props.base.name}
        aria-pressed={isSelected()}
        class="btn h-auto w-16 flex-col gap-0 px-1 py-1.5 font-normal border-2"
        classList={{ "btn-ghost": !isSelected(), "btn-neutral border-base-content/40": isSelected() }}
        onClick={() => selectBases([props.base.id], !isSelected())}
        type="button"
      >
        <img alt="" class="h-16 w-auto" src={`/icons/flasks/${props.base.id}.webp`} />
        <span class="text-xs text-base-content/50">{props.base.level}</span>
      </button>
    </div>
  );
}
