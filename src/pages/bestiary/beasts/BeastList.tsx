import { createMemo, For, useContext } from "solid-js";
import { BestiaryContext } from "../context";
import { matchesBeast } from "../search";
import { BeastGroup } from "./BeastGroup";

export function BeastList() {
  const { search, visibleBeasts } = useContext(BestiaryContext);

  const groups = createMemo(() => {
    const found = visibleBeasts().filter((beast) => matchesBeast(beast, search()));
    return Object.entries(Object.groupBy(found, (beast) => beast.family));
  });

  return (
    <section class="col gap-4">
      <div>
        <h3 class="text-xl">Звери</h3>
        <p class="text-sm text-base-content/60">Отсортированы по цене. Наведите на зверя, чтобы увидеть, в каких рецептах он нужен</p>
      </div>
      <For each={groups()} fallback={<p class="text-base-content/60">Звери не найдены</p>}>
        {([family, list]) => <BeastGroup beasts={list ?? []} family={family} />}
      </For>
    </section>
  );
}
