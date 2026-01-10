import { pgTable, real, serial, text } from "drizzle-orm/pg-core";

export const maps = pgTable("maps", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
  rank: real("rank").notNull(),
  regex: text("regex").unique().notNull(),
});
