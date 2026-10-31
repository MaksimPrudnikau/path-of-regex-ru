export function splitTerms(text: string): string[] {
  const quoted = [...text.matchAll(/"([^"]*)"/g)].map((match) => match[1]);

  return quoted.length > 0 ? quoted : [text.trim()];
}

export function splitAlternatives(term: string): string[] {
  const alternatives: string[] = [];
  let depth = 0;
  let start = 0;

  for (let index = 0; index < term.length; index++) {
    const char = term[index];
    if (char === "\\") index++;
    else if (char === "(" || char === "[") depth++;
    else if (char === ")" || char === "]") depth--;
    else if (char === "|" && depth === 0) {
      alternatives.push(term.slice(start, index));
      start = index + 1;
    }
  }

  return [...alternatives, term.slice(start)];
}
