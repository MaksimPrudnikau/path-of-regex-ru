import type { BestiaryStore } from "../context/context";
import type { Beast } from "../data";

export const MAX_REGEX_LENGTH = 250;

type RegexInput = Pick<BestiaryStore, "selected" | "exclude">;

export function buildBestiaryRegex(input: RegexInput, beasts: Beast[]): string {
  const terms = selectedTerms(input, beasts);
  return terms.length === 0 ? "" : searchTerm(terms, input.exclude);
}

export function buildBestiaryBatches(input: RegexInput, beasts: Beast[], maxLength: number): string[] {
  const terms = selectedTerms(input, beasts);
  if (terms.length === 0) return [];
  if (input.exclude) return [searchTerm(terms, true)];

  const batches: string[][] = [[]];
  for (const term of terms) {
    const current = batches[batches.length - 1];
    if (current.length > 0 && searchTerm([...current, term], false).length > maxLength) batches.push([term]);
    else current.push(term);
  }
  return batches.map((batch) => searchTerm(batch, false));
}

function selectedTerms(input: RegexInput, beasts: Beast[]): string[] {
  return beasts.filter((beast) => input.selected.includes(beast.id)).map((beast) => beast.regex);
}

function searchTerm(terms: string[], exclude: boolean): string {
  return `"${exclude ? "!" : ""}${terms.join("|")}"`;
}
