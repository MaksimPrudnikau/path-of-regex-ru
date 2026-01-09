import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";
import devtools from "solid-devtools/vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  server: {
    prerender: {
      crawlLinks: true,
    },
    ssr: false,
  },
  ssr: false,
  vite: {
    plugins: [
      tailwindcss(),
      devtools({
        /* features options - all disabled by default */
        autoname: true, // e.g. enable autoname
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
