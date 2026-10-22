import { corpusNames, loadBestiary, loadCorpus, regexProblems, saveBestiary, shortestUniqueRegex } from "./lib.mjs";

const apply = process.argv.includes("--apply");
const bestiary = loadBestiary();
const names = corpusNames(loadCorpus(), bestiary.beasts);

let errors = 0;
let updated = 0;

for (const beast of bestiary.beasts) {
  const problems = regexProblems(beast, names);
  const suggested = shortestUniqueRegex(beast.name, names);
  const isShorter = suggested !== undefined && suggested.length < beast.regex.length;

  if (problems.length === 0 && !isShorter) continue;
  if (problems.length > 0) errors++;

  const notes = problems.length > 0 ? problems : [`можно короче на ${beast.regex.length - suggested.length}`];
  console.log(`${beast.id} "${beast.regex}" -> "${suggested ?? "?"}" [${notes.join("; ")}]`);

  if (apply && suggested !== undefined) {
    beast.regex = suggested;
    updated++;
  }
}

if (updated > 0) saveBestiary(bestiary);

console.log(`проверено ${bestiary.beasts.length}, с ошибками ${errors}${apply ? `, обновлено ${updated}` : ""}`);
process.exitCode = errors > 0 && !apply ? 1 : 0;
