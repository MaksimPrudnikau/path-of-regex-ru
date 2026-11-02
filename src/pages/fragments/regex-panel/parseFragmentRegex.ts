import type { FragmentsSelection } from "../context/context";
import { type FragmentItem, items } from "../data";
import type { TabId } from "../tabs";

export type ParsedFragments = FragmentsSelection & {
  tab: TabId;
};

export function parseFragmentRegex(text: string): ParsedFragments | undefined {
  const found = splitTerms(text).flatMap((term) => {
    const isExclude = term.startsWith("!");
    return (isExclude ? term.slice(1) : term)
      .split("|")
      .map((part) => itemByRegex.get(part.trim()))
      .filter((item) => item !== undefined)
      .map((item) => ({ isExclude, item }));
  });
  if (found.length === 0) return undefined;

  const tab = found[0].item.tab;
  const inTab = found.filter(({ item }) => item.tab === tab);
  return {
    exclude: unique(inTab.filter(({ isExclude }) => isExclude).map(({ item }) => item.id)),
    include: unique(inTab.filter(({ isExclude }) => !isExclude).map(({ item }) => item.id)),
    tab,
  };
}

const itemByRegex = new Map<string, FragmentItem>(items.map((item) => [item.regex, item]));

function splitTerms(text: string): string[] {
  const quoted = [...text.matchAll(/"([^"]*)"/g)].map((match) => match[1]);
  if (quoted.length > 0) return quoted;
  const term = text.trim();
  return term.includes("|") || term.startsWith("!") ? [term] : [];
}

function unique(ids: string[]): string[] {
  return [...new Set(ids)];
}
