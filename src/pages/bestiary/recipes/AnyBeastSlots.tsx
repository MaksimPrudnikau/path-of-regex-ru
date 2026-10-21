import { Index } from "solid-js";
import { AnyBeastSlot } from "./AnyBeastSlot";

type Props = {
  count: number;
};

export function AnyBeastSlots(props: Props) {
  return (
    <span
      class="tooltip tooltip-left flex shrink-0 items-center gap-1"
      data-tip={`+ ${props.count} любых пойманных зверя, искать их не нужно`}
    >
      <Index each={Array.from({ length: props.count })}>{() => <AnyBeastSlot />}</Index>
    </span>
  );
}
