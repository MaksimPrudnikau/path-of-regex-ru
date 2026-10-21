import { createEffect, createMemo, For, Show, useContext } from "solid-js";
import { BestiaryContext } from "../context";
import { BEAST_TONES } from "../beastTone";
import { beastById, type Recipe } from "../data";
import { AnyBeastSlots } from "./AnyBeastSlots";

type Props = {
  recipe: Recipe;
};

export function RecipeItem(props: Props) {
  const { isSelected, selectBeasts } = useContext(BestiaryContext);
  const selectedCount = createMemo(() => props.recipe.beasts.filter(isSelected).length);
  const isChecked = createMemo(() => selectedCount() === props.recipe.beasts.length);
  let checkbox!: HTMLInputElement;

  createEffect(() => {
    checkbox.indeterminate = selectedCount() > 0 && !isChecked();
  });

  return (
    <li>
      <label class="flex items-start gap-3 p-3 cursor-pointer rounded-box hover:bg-base-300">
        <input
          checked={isChecked()}
          class="checkbox checkbox-primary checkbox-sm mt-0.5"
          onChange={() => selectBeasts(props.recipe.beasts, !isChecked())}
          ref={checkbox}
          type="checkbox"
        />
        <div class="col gap-1.5 flex-1">
          <span class="first-letter:uppercase" classList={{ "text-primary": isChecked() }}>
            {props.recipe.title}
          </span>
          <Show when={props.recipe.note}>
            <span class="text-xs text-base-content/60">{props.recipe.note}</span>
          </Show>
          <div class="flex flex-wrap items-center gap-1">
            <For each={props.recipe.beasts}>
              {(id) => (
                <span
                  class={`badge badge-sm ${BEAST_TONES[beastById.get(id)?.color ?? "red"].badge}`}
                  classList={{ "badge-soft": !isSelected(id) }}
                >
                  {beastById.get(id)?.name}
                </span>
              )}
            </For>
          </div>
        </div>
        <Show when={props.recipe.any > 0}>
          <AnyBeastSlots count={props.recipe.any} />
        </Show>
      </label>
    </li>
  );
}
