import {
  baseOwner,
  baseRegex,
  itemLines,
  kindOwner,
  kindRegex,
  loadCorpus,
  loadFlasks,
  modOwner,
  modRegex,
  regexProblems,
  saveFlasks,
  tierOwner,
  tierRegex,
} from "./lib.mjs";

const apply = process.argv.includes("--apply");
const flasks = loadFlasks();
const lines = itemLines(loadCorpus(), flasks);

let checked = 0;
let errors = 0;
let updated = 0;

for (const base of flasks.bases) checkRegex(base.name, base, "regex", baseOwner(base), () => baseRegex(base, lines));
for (const kind of Object.keys(flasks.kinds)) {
  checkRegex(`вид ${kind}`, flasks.kinds, kind, kindOwner(kind), () => kindRegex(kind, flasks.bases, lines));
}
for (const mod of flasks.mods) {
  checkRegex(`мод ${mod.id}`, mod, "regex", modOwner(mod), () => modRegex(mod, lines));
  for (const tier of mod.tiers) checkRegex(`тир ${tier.name} (${mod.id})`, tier, "regex", tierOwner(tier), () => tierRegex(mod, tier, lines));
}

if (updated > 0) saveFlasks(flasks);

console.log(`проверено ${checked}, с ошибками ${errors}${apply ? `, обновлено ${updated}` : ""}`);
process.exitCode = errors > 0 && !apply ? 1 : 0;

function checkRegex(title, target, key, owner, suggest) {
  checked++;
  const current = target[key];
  const suggested = suggest();
  const problems = current === null ? [] : regexProblems(current, owner, lines);
  const isShorter = suggested !== null && (current === null || suggested.length < current.length);
  if (problems.length === 0 && !isShorter) return;
  if (problems.length > 0) errors++;

  const notes = problems.length > 0 ? problems : [current === null ? "нашёлся regex" : `можно короче на ${current.length - suggested.length}`];
  console.log(`${title} "${current}" -> "${suggested}" [${notes.join("; ")}]`);

  if (apply && (problems.length > 0 || isShorter)) {
    target[key] = suggested;
    updated++;
  }
}
