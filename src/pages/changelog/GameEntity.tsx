import type { ParentProps } from "solid-js";

type Props = {
  icon: string;
  tone?: string;
};

export function GameEntity(props: ParentProps<Props>) {
  return (
    <span class={`inline-flex items-center gap-1 align-bottom font-semibold ${props.tone ?? ""}`}>
      <img alt="" class="size-5" src={`/icons/${props.icon}.png`} />
      {props.children}
    </span>
  );
}
