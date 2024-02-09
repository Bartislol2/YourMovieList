CREATE TABLE `users` (
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `roles` (
  `role_id` int NOT NULL,
  `authority` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user_roles` (
  `role_id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`role_id`,`username`),
  KEY `FKcdp2dxqcsdh6rnh6o64rgtcir` (`username`),
  CONSTRAINT `FKcdp2dxqcsdh6rnh6o64rgtcir` FOREIGN KEY (`username`) REFERENCES `users` (`username`),
  CONSTRAINT `FKh8ciramu9cc9q3qcqiv4ue8a6` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `roles_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE `movies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `release_date` date DEFAULT NULL,
  `description` varchar(10000) DEFAULT NULL,
  `length` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `poster` longblob,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `movieId` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `rating` int NOT NULL,
  `review` varchar(2000) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_username` (`username`),
  KEY `fk_movieId` (`movieId`),
  CONSTRAINT `fk_movieId` FOREIGN KEY (`movieId`) REFERENCES `movies` (`id`),
  CONSTRAINT `fk_username` FOREIGN KEY (`username`) REFERENCES `users` (`username`),
  CONSTRAINT `check_rating` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO ROLES (ROLE_ID, AUTHORITY) VALUES (1, "USER");
