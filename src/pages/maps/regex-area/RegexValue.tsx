import { Show, useContext } from "solid-js";
import { RegexAreaContext } from "~/pages/maps/regex-area/context";

export function RegexValue() {
  const { errorMessage, regex, copied } = useContext(RegexAreaContext);

  return (
    <div class={"col gap-2"}>
      <h2
        class={"w-full overflow-x-auto wrap-break-word min-h-24"}
        classList={{
          "text-primary": !errorMessage() && copied(),
          "text-red-500": !!errorMessage(),
        }}
      >
        {regex()}
      </h2>
      <div>Длина: {regex().length} / 250</div>
      <Show when={!!errorMessage()}>
        <span class={"italic text-red-500"}>{errorMessage()}</span>
      </Show>
    </div>
  );
}
