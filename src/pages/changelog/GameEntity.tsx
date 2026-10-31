import type { ParentProps } from "solid-js";

type Props = {
  icon: string;
  tone?: string;
};

export function GameEntity(props: ParentProps<Props>) {
  return (
    <span class={`inline-flex items-center gap-1 align-bottom font-semibold ${props.tone ?? ""}`}>
      <img alt="" class="w-auto" classList={{ "h-5": !props.icon.includes("/"), "-my-1 h-8": props.icon.includes("/") }} src={`/icons/${props.icon.includes(".") ? props.icon : `${props.icon}.png`}`} />
      {props.children}
    </span>
  );
}
