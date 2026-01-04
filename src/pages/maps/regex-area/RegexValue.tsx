import { Show, useContext } from "solid-js";
import { RegexAreaContext } from "~/pages/maps/regex-area/Context";

export function RegexValue() {
  const context = useContext(RegexAreaContext);

  return (
    <div class={"col gap-2"}>
      <h2
        class={"w-full overflow-x-auto wrap-break-word min-h-24"}
        classList={{
          "text-primary": !context.errorMessage() && context.copied(),
          "text-red-500": !!context.errorMessage(),
        }}
      >
        {context.regex()}
      </h2>
      <div>Длина: {context.regex().length} / 250</div>
      <Show when={!!context.errorMessage()}>
        <span class={"italic text-red-500"}>{context.errorMessage()}</span>
      </Show>
    </div>
  );
}
