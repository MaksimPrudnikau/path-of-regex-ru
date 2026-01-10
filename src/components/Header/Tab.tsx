import { A, useLocation } from "@solidjs/router";
import { children, createEffect, createMemo, type ParentProps } from "solid-js";

type Props = {
  icon: string;
};

export function Tab(props: ParentProps<Props>) {
  const c = children(() => props.children);
  const params = useLocation();

  createEffect(() => {
    console.log(props.icon);
  });

  const isActive = createMemo(() => params.pathname.includes(props.icon));
  // const isActive = createMemo(() =>
  //   `/${props.icon}` params.pathname.
  //     : pageContext.urlPathname.startsWith(props.href),
  // );

  return (
    <A
      class={
        "link link-hover flex gap-2 items-center px-3 py-2 hover:bg-base-300 rounded-xl"
      }
      classList={{ "bg-base-300": isActive() }}
      href={`/${props.icon}`}
    >
      <img alt={props.icon} src={`/icons/${props.icon}.png`} width={40} />
      {c()}
    </A>
  );
}
