import bestiary from "@/data/bestiary.json";

export type BeastColor = "red" | "yellow";

export type Beast = {
  id: string;
  name: string;
  regex: string;
  color: BeastColor;
  group: string;
  family: string;
};

export type Recipe = {
  category: string;
  title: string;
  note: string;
  beasts: string[];
  any: number;
};

export const beasts = bestiary.beasts as Beast[];
export const recipes: Recipe[] = bestiary.recipes;

export const beastById = new Map(beasts.map((beast) => [beast.id, beast]));
export const groups = sortedUnique(beasts.map((beast) => beast.group));
export const families = sortedUnique(beasts.map((beast) => beast.family));

export function recipesOf(beast: Beast): Recipe[] {
  return recipes.filter((recipe) => recipe.beasts.includes(beast.id));
}

export function recipeLabel(recipe: Recipe): string {
  return `${recipe.category}: ${recipe.title}`;
}

function sortedUnique(values: string[]): string[] {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b, "ru"));
}
