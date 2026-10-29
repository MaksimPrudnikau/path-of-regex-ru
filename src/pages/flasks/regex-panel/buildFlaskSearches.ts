import type { FlaskData } from "../data";
import { type WindowInput, windowTerms } from "./buildFlaskRegex";

export function buildFlaskSearches(input: WindowInput[], data: FlaskData): string[] {
  const windows = input.map((window) => windowTerms(window, data)).filter((terms) => terms.length > 0);
  if (windows.length === 0) return [];
  if (windows.every((terms) => terms.length === 1)) return [searchString([[...new Set(windows.flat(2))]])];
  return [...new Set(windows.map(searchString))];
}

function searchString(terms: string[][]): string {
  return terms.map((alternatives) => `"${alternatives.join("|")}"`).join(" ");
}
