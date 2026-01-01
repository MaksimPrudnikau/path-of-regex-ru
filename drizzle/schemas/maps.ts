import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const maps = sqliteTable("maps", {
  id: integer("id").primaryKey({ autoIncrement: true }).unique().notNull(),
  name: text("name").unique().notNull(),
  rank: real("rank").notNull(),
  regex: text("regex").unique().notNull(),
});
