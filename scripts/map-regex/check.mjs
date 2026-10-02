// Проверяет regex всех модов карт из data/maps.sqlite по реальным текстам игры (data/poedb-map-mods.json).
//
//   node scripts/map-regex/check.mjs            — отчёт, exit 1 при ошибках
//   node scripts/map-regex/check.mjs --apply    — записать предложенные исправления в data/maps.sqlite
//   node scripts/map-regex/check.mjs --file mods.json — моды из JSON вместо БД
import { readFileSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import { checkMod, loadPoedb, matchMods } from "./lib.mjs";

export const DB_PATH = new URL("../../data/maps.sqlite", import.meta.url).pathname;

const args = process.argv.slice(2);
const fileArg = args.indexOf("--file");
const apply = args.includes("--apply");

function loadDbMods() {
  if (fileArg > -1) return JSON.parse(readFileSync(args[fileArg + 1], "utf8"));
  const db = new DatabaseSync(DB_PATH, { readOnly: true });
  try {
    return db.prepare("select id, name, rank, regex from maps order by id").all();
  } finally {
    db.close();
  }
}

const poedb = loadPoedb();
const { matched, missing } = matchMods(loadDbMods(), poedb);

let errors = 0;
const fixes = [];
for (const mod of missing) {
  errors++;
  console.log(`#${mod.id} "${mod.regex}" — мод не найден на poedb: ${mod.name}`);
}
for (const mod of matched) {
  const { problems, suggestion } = checkMod(mod, poedb);
  if (!problems.length) continue;
  errors++;
  console.log(`#${mod.id} "${mod.regex}" -> ${suggestion ? `"${suggestion}"` : "???"}  [${problems.join("; ")}]  ${mod.name}`);
  if (suggestion) fixes.push({ id: mod.id, from: mod.regex, regex: suggestion });
}
console.log(`\nпроверено ${matched.length + missing.length}, с ошибками ${errors}`);

if (apply && fixes.length) {
  if (fileArg > -1) throw new Error("--apply работает только с data/maps.sqlite");
  const db = new DatabaseSync(DB_PATH);
  const update = db.prepare("update maps set regex = ? where id = ? and regex = ?");
  db.exec("begin");
  for (const f of fixes) update.run(f.regex, f.id, f.from);
  db.exec("commit");
  db.close();
  console.log(`исправлено в ${DB_PATH}: ${fixes.length}`);
}

process.exit(errors && !(apply && fixes.length === errors) ? 1 : 0);
