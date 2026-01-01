import { query } from "@solidjs/router";
import { maps } from "@/drizzle/schemas";
import { db } from "~/api/db";

export const getMapMods = query(() => {
  "use server";
  return db.select().from(maps);
}, "getMapMods");

export type MapMod = typeof maps.$inferSelect;
