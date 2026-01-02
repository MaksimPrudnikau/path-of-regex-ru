import { createMemo, useContext } from "solid-js";
import { MapsContext } from "~/pages/maps/context/context";

export function RegexValue() {
  const { store } = useContext(MapsContext);

  const regex = createMemo(() => {
    const positive = store.positiveMods.map((x) => x.regex).join("|");
    const negative = store.negativeMods.map((x) => x.regex).join("|");

    const resultArray: string[] = [];

    if (store.negativeMods.length > 0) {
      resultArray.push(`"!${negative}"`);
    }

    if (store.positiveMods.length > 0) {
      resultArray.push(`"${positive}"`);
    }

    return resultArray.join(" ");
  });

  return (
    <div class={"col gap-2"}>
      <div class={"w-full overflow-x-auto wrap-break-word h-24"}>{regex()}</div>
      <div>Длина: {regex().length} / 250</div>
    </div>
  );
}
