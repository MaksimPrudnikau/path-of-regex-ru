import { query } from "@solidjs/router";
import type { maps } from "@/drizzle/schemas";
import { db } from "~/api/db";

export const getMapMods = query(() => {
  "use server";
  return db.query.maps.findMany();
}, "getMapMods");

export type MapMod = typeof maps.$inferSelect;
