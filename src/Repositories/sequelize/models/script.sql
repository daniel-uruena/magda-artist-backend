CREATE TABLE store.`user` (
	id BINARY(36) NOT NULL PRIMARY KEY,
	name varchar(100) NULL,
	lastName varchar(100) NULL,
	phoneNumber varchar(100) NULL,
	email varchar(100) NULL,
	userName varchar(100) NULL,
	password varchar(100) NULL,
	active boolean NOT NULL DEFAULT FALSE,
	createdAt timestamp NOT NULL,
	updatedAt timestamp NULL
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;
