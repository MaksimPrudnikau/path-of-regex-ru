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
  vite: {
    plugins: [
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
