import type { ParentProps } from "solid-js";

type Props = {
  title: string;
};

export function GenericModifiers(props: ParentProps<Props>) {
  return (
    <div class="col gap-10 bg-base-300/50 px-8 py-4 rounded-2xl">
      <h2 class="text-lg font-semibold text-gray-300 italic">{props.title}</h2>
      <div class="col gap-3">{props.children}</div>
    </div>
  );
}
