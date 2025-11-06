ALTER TABLE `emailSettings` ADD `notificationEnabled` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `emailSettings` ADD `notificationEmail` varchar(320);