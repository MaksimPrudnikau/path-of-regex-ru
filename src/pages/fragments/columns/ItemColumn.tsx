import { For, Show, useContext } from "solid-js";
import { FragmentsContext, type ListName } from "../context";
import { ItemButton } from "./ItemButton";

type Props = {
  list: ListName;
};

export function ItemColumn(props: Props) {
  const { visibleItems } = useContext(FragmentsContext);

  return (
    <section class="col gap-4">
      <div>
        <h3 class="text-xl">
          <Show
            fallback={
              <>
                <span class="font-bold uppercase text-error">Исключить </span>эти предметы
              </>
            }
            when={props.list === "include"}
          >
            <span class="font-bold uppercase text-primary">Включить </span>эти предметы
          </Show>
        </h3>
        <p class="text-sm text-base-content/60">Отсортированы по цене, самые дорогие сверху</p>
      </div>
      <div class="col gap-2">
        <For each={visibleItems()} fallback={<p class="text-base-content/60">Предметы не найдены</p>}>
          {(item) => <ItemButton item={item} list={props.list} />}
        </For>
      </div>
    </section>
  );
}
