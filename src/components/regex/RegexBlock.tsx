import { type Accessor, createMemo, type JSXElement, type ParentProps, Show } from "solid-js";
import { createCopiedRegex } from "./createCopiedRegex";
import { RegexImport } from "./RegexImport";

export const MAX_REGEX_LENGTH = 250;

type Props = ParentProps<{
  regex: Accessor<string>;
  emptyHint: string;
  onReset: () => void;
  errorMessage?: Accessor<string | undefined>;
  maxLength?: number;
  controls?: JSXElement;
  onImport?: (text: string) => boolean;
  class?: string;
}>;

export function RegexBlock(props: Props) {
  const { copy, isCopied } = createCopiedRegex(props.regex);
  const maxLength = createMemo(() => props.maxLength ?? MAX_REGEX_LENGTH);
  const isTooLong = createMemo(() => props.regex().length > maxLength());
  const hasError = createMemo(() => !!props.errorMessage?.() || isTooLong());

  return (
    <section class={`card bg-base-200 w-full ${props.class ?? ""}`}>
      <div class="card-body gap-3 p-5">
        <div class="col gap-2">
          <h2
            class="w-full min-h-12 overflow-x-auto wrap-break-word select-all"
            classList={{ "text-primary": isCopied() && !hasError(), "text-error": hasError() }}
          >
            <Show when={props.regex() !== ""} fallback={<span class="text-base font-normal text-base-content/50">{props.emptyHint}</span>}>
              {props.regex()}
            </Show>
          </h2>
          <div classList={{ "text-error": isTooLong() }}>
            Длина: {props.regex().length} / {maxLength()}
          </div>
          <Show when={props.errorMessage?.()}>
            <span class="italic text-error">{props.errorMessage?.()}</span>
          </Show>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <button class="btn btn-primary" disabled={props.regex() === "" || hasError()} onClick={copy} type="button">
            Скопировать
          </button>
          <button class="btn btn-secondary" onClick={props.onReset} type="button">
            Сбросить
          </button>
          {props.controls}
        </div>
        <Show when={props.onImport}>{(onImport) => <RegexImport onImport={onImport()} />}</Show>
        {props.children}
      </div>
    </section>
  );
}
