import type { ParentProps } from "solid-js";
import { children } from "solid-js";

type Props = {
  title?: string;
};

export function SearchHeader(props: ParentProps<Props>) {
  const c = children(() => props.children);

  return (
    <div class={"col gap-2 items-start h-24"}>
      <h2>{props.title}</h2>
      {c()}
    </div>
  );
}
