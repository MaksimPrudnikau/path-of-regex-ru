import type { FlaskData, FlaskKind } from "../data";
import type { WindowInput } from "./buildFlaskRegex";
import { pickMods } from "./pickMods";
import { type AffixMatch, createRegexLookup, type RegexLookup } from "./regexLookup";
import { splitAlternatives, splitTerms } from "./splitRegex";

export function parseFlaskRegex(text: string, data: FlaskData): WindowInput[] | undefined {
  const lookup = createRegexLookup(data);
  const terms = splitTerms(text).map((term) => readTerm(term, lookup));
  const baseIds = [...new Set(terms.flatMap((term) => term.baseIds))];
  const affixTerms = terms.filter((term) => term.choices.length > 0);
  if (baseIds.length === 0 && affixTerms.length === 0) return undefined;

  const isMixed = terms.some((term) => term.baseIds.length > 0 && term.choices.length > 0);
  const baseKinds = isMixed ? new Set<FlaskKind>() : kindsOf(baseIds, data);
  const mods = pickMods(affixTerms.flatMap((term) => term.choices), baseKinds);
  const matchBoth = affixTerms.length > 1 || !hasBothAffixes(affixTerms[0]);

  return isMixed
    ? [
        { bases: baseIds, matchBoth: true, mods: {} },
        { bases: [], matchBoth, mods },
      ]
    : [{ bases: baseIds, matchBoth, mods }];
}

type Term = {
  baseIds: string[];
  choices: AffixMatch[][];
};

function readTerm(term: string, lookup: RegexLookup): Term {
  const alternatives = splitAlternatives(term);

  return {
    baseIds: alternatives.flatMap((alternative) => lookup.baseIds.get(alternative) ?? []),
    choices: alternatives.map((alternative) => lookup.affixes.get(alternative) ?? []).filter((choice) => choice.length > 0),
  };
}

function kindsOf(baseIds: string[], data: FlaskData): Set<FlaskKind> {
  return new Set(data.bases.filter((base) => baseIds.includes(base.id)).map((base) => base.kind));
}

function hasBothAffixes(term: Term | undefined): boolean {
  const affixes = new Set(term?.choices.flat().map(({ mod }) => mod.affix));

  return affixes.has("prefix") && affixes.has("suffix");
}
