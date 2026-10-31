import { For } from "solid-js";
import type { FlaskBase } from "../data";
import { placeTooltip } from "./placeTooltip";

type Props = {
  base: FlaskBase;
  isSelected: boolean;
  onClick: () => void;
};

export function BaseButton(props: Props) {
  let button!: HTMLButtonElement;
  let tooltip!: HTMLDivElement;

  function show() {
    tooltip.togglePopover(true);
    placeTooltip(button, tooltip);
  }

  function hide() {
    tooltip.togglePopover(false);
  }

  return (
    <>
      <button
        aria-label={props.base.name}
        aria-pressed={props.isSelected}
        class="btn h-auto w-16 flex-col gap-0 px-1 py-1.5 font-normal border-2"
        classList={{ "btn-ghost": !props.isSelected, "btn-neutral border-base-content/40": props.isSelected }}
        onBlur={hide}
        onClick={() => props.onClick()}
        onFocus={show}
        onPointerEnter={show}
        onPointerLeave={hide}
        ref={button}
        type="button"
      >
        <img alt="" class="h-16 w-auto" src={`/icons/flasks/${props.base.id}.webp`} />
        <span class="text-xs text-base-content/50">{props.base.level}</span>
      </button>
      <div
        class="col not-[:popover-open]:hidden pointer-events-none inset-auto m-0 w-max max-w-xs items-start gap-0.5 rounded-field bg-neutral px-3 py-2 text-left text-sm text-neutral-content"
        popover="auto"
        ref={tooltip}
      >
        <b>{props.base.name}</b>
        <For each={props.base.effects}>{(effect) => <span>{effect}</span>}</For>
      </div>
    </>
  );
}
