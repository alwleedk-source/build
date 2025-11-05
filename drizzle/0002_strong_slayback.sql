CREATE TABLE `contactMessages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(50),
	`message` text NOT NULL,
	`isRead` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contactMessages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `homepageSections` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`isVisible` int NOT NULL DEFAULT 1,
	`order` int NOT NULL DEFAULT 0,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `homepageSections_id` PRIMARY KEY(`id`),
	CONSTRAINT `homepageSections_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `mediaLibrary` (
	`id` int AUTO_INCREMENT NOT NULL,
	`filename` varchar(255) NOT NULL,
	`url` varchar(500) NOT NULL,
	`type` enum('image','video','document') NOT NULL DEFAULT 'image',
	`category` varchar(100),
	`size` int,
	`uploadedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `mediaLibrary_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `siteSettings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`key` varchar(255) NOT NULL,
	`value` text NOT NULL,
	`type` enum('text','number','boolean','json','image') NOT NULL DEFAULT 'text',
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `siteSettings_id` PRIMARY KEY(`id`),
	CONSTRAINT `siteSettings_key_unique` UNIQUE(`key`)
);
--> statement-breakpoint
CREATE TABLE `teamMembers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`position` varchar(255) NOT NULL,
	`bio` text,
	`image` varchar(500) NOT NULL,
	`email` varchar(320),
	`phone` varchar(50),
	`order` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `teamMembers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`position` varchar(255) NOT NULL,
	`company` varchar(255),
	`content` text NOT NULL,
	`rating` int NOT NULL DEFAULT 5,
	`image` varchar(500),
	`order` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `testimonials_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `projects` ADD `showOnHomepage` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `projects` ADD `order` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `services` ADD `order` int DEFAULT 0 NOT NULL;