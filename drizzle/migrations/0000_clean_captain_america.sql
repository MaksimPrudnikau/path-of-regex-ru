CREATE TABLE IF NOT EXISTS "maps" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"rank" real NOT NULL,
	"regex" text NOT NULL,
	CONSTRAINT "maps_name_unique" UNIQUE("name"),
	CONSTRAINT "maps_regex_unique" UNIQUE("regex")
);
