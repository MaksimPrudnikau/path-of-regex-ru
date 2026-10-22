import { A } from "@solidjs/router";
import type { ParentProps } from "solid-js";

type Props = {
  href: string;
  icon: string;
};

export function PageLink(props: ParentProps<Props>) {
  return (
    <A class="link link-primary font-semibold inline-flex items-center gap-1 align-bottom" href={props.href}>
      <img alt="" class="size-5" src={`/icons/${props.icon}.png`} />
      {props.children}
    </A>
  );
}
