import { createMemo, For, useContext } from "solid-js";
import { BestiaryContext } from "../context";
import { recipes } from "../data";
import { matchesRecipe } from "../search";
import { BeastLegend } from "./BeastLegend";
import { RecipeGroup } from "./RecipeGroup";

export function RecipeList() {
  const { search } = useContext(BestiaryContext);

  const groups = createMemo(() => {
    const found = recipes.filter((recipe) => matchesRecipe(recipe, search()));
    return Object.entries(Object.groupBy(found, (recipe) => recipe.category));
  });

  return (
    <section class="col gap-4">
      <div>
        <h3 class="text-xl">Рецепты</h3>
        <BeastLegend />
      </div>
      <For each={groups()} fallback={<p class="text-base-content/60">Рецепты не найдены</p>}>
        {([category, list]) => <RecipeGroup category={category} recipes={list ?? []} />}
      </For>
    </section>
  );
}
