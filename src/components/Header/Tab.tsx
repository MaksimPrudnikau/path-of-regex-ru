import { A, useLocation } from "@solidjs/router";
import { children, createMemo, type ParentProps } from "solid-js";

type Props = {
  icon: string;
  disabled?: boolean;
};

export function Tab(props: ParentProps<Props>) {
  const c = children(() => props.children);
  const params = useLocation();

  const isActive = createMemo(() => params.pathname.includes(props.icon));

  return (
    <div
      classList={{
        tooltip: props.disabled,
      }}
      data-tip={"Скоро..."}
    >
      <A
        class={
          "link link-hover flex gap-2 items-center px-3 py-2 hover:bg-base-300 rounded-xl text"
        }
        classList={{
          "bg-base-300": isActive(),
          "pointer-events-none opacity-30 line-through": props.disabled,
        }}
        href={`/${props.icon}`}
      >
        <img alt={props.icon} src={`/icons/${props.icon}.png`} width={40} />
        {c()}
      </A>
    </div>
  );
}
