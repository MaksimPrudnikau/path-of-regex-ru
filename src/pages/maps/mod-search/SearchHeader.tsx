import type { JSXElement, ParentProps } from "solid-js";

type Props = {
  title?: string | JSXElement;
};

export function SearchHeader(props: ParentProps<Props>) {
  return (
    <div class={"col gap-2 items-start h-24"}>
      <h2>{props.title}</h2>
      <div class={"flex flex-1"}>{props.children}</div>
    </div>
  );
}
