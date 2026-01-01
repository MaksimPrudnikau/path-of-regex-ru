CREATE TABLE `maps` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`rank` real NOT NULL,
	`regex` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `maps_id_unique` ON `maps` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `maps_name_unique` ON `maps` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `maps_regex_unique` ON `maps` (`regex`);