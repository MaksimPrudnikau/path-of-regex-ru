import { useContext } from "solid-js";
import { RegexAreaContext } from "~/pages/maps/regex-area/Context";

export function RegexValue() {
  const context = useContext(RegexAreaContext);

  return (
    <div class={"col gap-2"}>
      <h2
        class={"w-full overflow-x-auto wrap-break-word min-h-24"}
        classList={{
          "text-primary": context.copied(),
        }}
      >
        {context.regex()}
      </h2>
      <div>Длина: {context.regex().length} / 250</div>
    </div>
  );
}
