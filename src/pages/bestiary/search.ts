import { type Beast, beastById, type Recipe, recipeLabel, recipesOf } from "./data";

export function matchesRecipe(recipe: Recipe, query: string): boolean {
  const beastNames = recipe.beasts.map((id) => beastById.get(id)?.name ?? "");
  return includesQuery([recipeLabel(recipe), recipe.note, ...beastNames], query);
}

export function matchesBeast(beast: Beast, query: string): boolean {
  return includesQuery([beast.name, beast.group, beast.family, ...recipesOf(beast).map(recipeLabel)], query);
}

function includesQuery(texts: string[], query: string): boolean {
  const needle = normalize(query);
  return needle === "" || texts.some((text) => normalize(text).includes(needle));
}

function normalize(text: string): string {
  return text.trim().toLowerCase().replaceAll("ё", "е");
}
