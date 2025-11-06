CREATE TABLE `emailSettings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`smtpHost` varchar(255),
	`smtpPort` int,
	`smtpUser` varchar(320),
	`smtpPassword` varchar(500),
	`fromEmail` varchar(320),
	`fromName` varchar(255),
	`autoReplyEnabled` int NOT NULL DEFAULT 0,
	`autoReplySubject` varchar(255) NOT NULL DEFAULT 'Bedankt voor uw bericht',
	`autoReplyMessage` text,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `emailSettings_id` PRIMARY KEY(`id`)
);
