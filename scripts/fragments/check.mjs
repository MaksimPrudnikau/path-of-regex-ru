import { itemNames, loadFragments, regexProblems, saveFragments, shortestUniqueRegex } from "./lib.mjs";

const apply = process.argv.includes("--apply");
const fragments = loadFragments();
const names = itemNames(fragments.items);

let errors = 0;
let updated = 0;

for (const item of fragments.items) {
  const problems = regexProblems(item, names);
  const suggested = shortestUniqueRegex(item.name, names);
  const isShorter = suggested.length < item.regex.length;

  if (problems.length === 0 && !isShorter) continue;
  if (problems.length > 0) errors++;

  const notes = problems.length > 0 ? problems : [`можно короче на ${item.regex.length - suggested.length}`];
  console.log(`${item.id} "${item.regex}" -> "${suggested}" [${notes.join("; ")}]`);

  if (apply) {
    item.regex = suggested;
    updated++;
  }
}

if (updated > 0) saveFragments(fragments);

console.log(`проверено ${fragments.items.length}, с ошибками ${errors}${apply ? `, обновлено ${updated}` : ""}`);
process.exitCode = errors > 0 && !apply ? 1 : 0;
