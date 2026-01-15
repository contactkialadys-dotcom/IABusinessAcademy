CREATE TABLE `generated_images` (
	`id` int AUTO_INCREMENT NOT NULL,
	`prompt` text NOT NULL,
	`imageUrl` varchar(500) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `generated_images_id` PRIMARY KEY(`id`)
);
