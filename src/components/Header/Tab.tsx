import { A } from "@solidjs/router";
import type { ParentProps } from "solid-js";
import { children } from "solid-js";

type Props = {
  icon: string;
};

export function Tab(props: ParentProps<Props>) {
  const c = children(() => props.children);

  return (
    <A
      class={
        "link link-hover flex gap-2 items-center px-3 py-2 hover:bg-base-300 rounded-xl"
      }
      href={`/${props.icon}`}
    >
      <img alt={props.icon} src={`/icons/${props.icon}.png`} width={40} />
      {c()}
    </A>
  );
}
