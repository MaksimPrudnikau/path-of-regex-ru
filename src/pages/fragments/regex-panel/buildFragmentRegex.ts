import type { FragmentsSelection } from "../context/context";
import type { FragmentItem } from "../data";

export const MAX_REGEX_LENGTH = 250;

export function buildFragmentBatches(selection: FragmentsSelection, sortedItems: FragmentItem[], maxLength: number): string[] {
  const includeTerms = termsOf(selection.include, sortedItems);
  const excludeTerm = selection.exclude.length === 0 ? "" : searchTerm(termsOf(selection.exclude, sortedItems), true);
  if (includeTerms.length === 0) return excludeTerm === "" ? [] : [excludeTerm];

  const batches: string[][] = [[]];
  for (const term of includeTerms) {
    const current = batches[batches.length - 1];
    if (current.length > 0 && joined(current, term, excludeTerm).length > maxLength) batches.push([term]);
    else current.push(term);
  }
  return batches.map((batch) => joined(batch, "", excludeTerm));
}

function termsOf(ids: string[], sortedItems: FragmentItem[]): string[] {
  const wanted = new Set(ids);
  return sortedItems.filter((item) => wanted.has(item.id)).map((item) => item.regex);
}

function joined(terms: string[], extra: string, excludeTerm: string): string {
  const include = searchTerm(extra === "" ? terms : [...terms, extra], false);
  return excludeTerm === "" ? include : `${include} ${excludeTerm}`;
}

function searchTerm(terms: string[], exclude: boolean): string {
  return `"${exclude ? "!" : ""}${terms.join("|")}"`;
}
