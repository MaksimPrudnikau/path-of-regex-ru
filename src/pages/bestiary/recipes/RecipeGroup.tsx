import { For } from "solid-js";
import type { Recipe } from "../data";
import { RecipeItem } from "./RecipeItem";

type Props = {
  category: string;
  recipes: Recipe[];
};

export function RecipeGroup(props: Props) {
  return (
    <div class="col gap-1">
      <h4 class="text-xs uppercase tracking-wide text-base-content/60">{props.category}</h4>
      <ul class="bg-base-200 rounded-box divide-y divide-base-300">
        <For each={props.recipes}>{(recipe) => <RecipeItem recipe={recipe} />}</For>
      </ul>
    </div>
  );
}
