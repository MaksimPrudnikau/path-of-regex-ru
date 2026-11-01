import { Show } from "solid-js";

type Props = {
  count: number;
  index: number;
  isLocked?: boolean;
  maxLength: number;
  hint: string;
  onChange: (index: number) => void;
};

export function BatchSwitcher(props: Props) {
  return (
    <Show when={props.count > 1 || props.isLocked}>
      <div
        class="tooltip-bottom join before:text-justify"
        classList={{ tooltip: !props.isLocked }}
        data-tip={`Поиск в игре ограничен ${props.maxLength} символами, поэтому ввод разбивается на части. ${props.hint}`}
      >
        <button
          class="btn btn-primary join-item text-xl"
          disabled={props.isLocked || props.index === 0}
          onClick={() => props.onChange(props.index - 1)}
          type="button"
        >
          ‹
        </button>
        <span class="btn btn-neutral join-item pointer-events-none">
          Строка {props.index + 1} из {props.count}
          <Show when={!props.isLocked}>
            <span class="badge badge-xs badge-ghost">?</span>
          </Show>
        </span>
        <button
          class="btn btn-primary join-item text-xl"
          disabled={props.isLocked || props.index === props.count - 1}
          onClick={() => props.onChange(props.index + 1)}
          type="button"
        >
          ›
        </button>
      </div>
    </Show>
  );
}
