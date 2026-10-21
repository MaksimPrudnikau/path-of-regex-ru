import { Index } from "solid-js";

type Props = {
  title: string;
  count: number;
  blockClass: string;
  wrap?: boolean;
};

export function ColumnSkeleton(props: Props) {
  return (
    <section class="col gap-4">
      <div class="col gap-2">
        <h3 class="text-xl">{props.title}</h3>
        <div class="skeleton h-4 w-2/3" />
      </div>
      <div class="gap-2" classList={{ "col": !props.wrap, "flex flex-wrap": props.wrap }}>
        <Index each={Array.from({ length: props.count })}>
          {() => <div class={`skeleton ${props.blockClass}`} />}
        </Index>
      </div>
    </section>
  );
}
