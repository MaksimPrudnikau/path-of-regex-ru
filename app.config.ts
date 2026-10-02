import { dirname, resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { fileURLToPath } from "node:url";
import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";
import devtools from "solid-devtools/vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MAP_MODS_DB = resolve(__dirname, "data/maps.sqlite");

// Моды карт читаются из SQLite один раз при сборке и попадают в бандл как обычный модуль —
// сайту не нужен ни сервер, ни внешняя БД.
function mapModsPlugin() {
  const id = "virtual:map-mods";
  const resolvedId = `\0${id}`;

  return {
    name: "map-mods",
    resolveId: (source: string) => (source === id ? resolvedId : undefined),
    load(this: { addWatchFile(file: string): void }, loadId: string) {
      if (loadId !== resolvedId) return;
      this.addWatchFile(MAP_MODS_DB);

      const db = new DatabaseSync(MAP_MODS_DB, { readOnly: true });
      try {
        const mods = db.prepare("select id, name, rank, regex from maps order by id").all();
        return `export default ${JSON.stringify(mods)};`;
      } finally {
        db.close();
      }
    },
  };
}

export default defineConfig({
  server: {
    prerender: {
      crawlLinks: true,
    },
    ssr: false,
  },
  vite: {
    plugins: [
      mapModsPlugin(),
      tailwindcss(),
      devtools({
        autoname: true,
      }),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "./"),
        "~": resolve(__dirname, "./src/"),
      },
    },
  },
});
