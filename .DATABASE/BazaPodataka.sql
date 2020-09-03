/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE IF NOT EXISTS `aplikacija` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `aplikacija`;

CREATE TABLE IF NOT EXISTS `administrator` (
  `administrator_id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(32) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0',
  `password_hash` varchar(128) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`administrator_id`),
  UNIQUE KEY `uq_administrator_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DELETE FROM `administrator`;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` (`administrator_id`, `username`, `password_hash`) VALUES
	(1, 'test123', 'CF835DE3D4EA01367C45E412E7A9393A85A4E40AF149ED8C3ED6C37C05B67B27813D7FF8072C1035CEDD19415ADF17128D63186F05F0D656002B0CA1C34F44A0');
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `article` (
  `article_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) COLLATE utf8mb4_general_ci NOT NULL,
  `category_id` int unsigned NOT NULL,
  `excerpt` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`article_id`),
  UNIQUE KEY `uq_article_name_category_id` (`name`,`category_id`) USING BTREE,
  KEY `fk_article_category_id` (`category_id`),
  CONSTRAINT `fk_article_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DELETE FROM `article`;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` (`article_id`, `name`, `category_id`, `excerpt`, `description`, `created_at`) VALUES
	(1, 'Kancelarijski sto za računar', 3, 'Kratak opis', 'kancelarijski sto za računar, malih dimenzija,pogodan za manje prostore.', '2020-08-26 23:18:16'),
	(2, 'Kovertica plave boje 20mm', 2, 'Kratak opis opisa opis', 'Opis proizvoda!', '2020-08-30 18:59:10'),
	(4, 'Kovertica plave boje 23mm', 2, 'Kratak opis opisa opis', 'Opis proizvoda!', '2020-08-30 18:59:10'),
	(5, 'Proba artikla koverta plava', 2, 'Kratak opis opisa opis', 'Opis proizvoda!', '2020-08-30 18:59:10'),
	(7, 'Proba artikla koverta plava 2', 2, 'Kratak opis opisa opis', 'Opis proizvoda!', '2020-08-30 18:59:10'),
	(8, 'Proba artikla koverta plava 22', 2, 'Kratak opis opisa opis', 'Opis proizvoda!', '2020-08-30 18:59:10'),
	(10, 'Probaaa artikla koverta plava 22', 2, 'Kratak opis opisa opis', 'Opis proizvoda!', NULL),
	(11, 'Kovertica', 1, 'Kratak opis opisa opis', 'Opis proizvoda!', NULL);
/*!40000 ALTER TABLE `article` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `article_color` (
  `article_color_id` int unsigned NOT NULL AUTO_INCREMENT,
  `color` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `article_id` int unsigned NOT NULL,
  PRIMARY KEY (`article_color_id`),
  UNIQUE KEY `uq_article_color_article_id` (`article_id`),
  KEY `article_id` (`article_id`),
  CONSTRAINT `FK_article_color_article` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DELETE FROM `article_color`;
/*!40000 ALTER TABLE `article_color` DISABLE KEYS */;
/*!40000 ALTER TABLE `article_color` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `article_feature` (
  `feature_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `article_id` int unsigned NOT NULL,
  PRIMARY KEY (`feature_id`) USING BTREE,
  UNIQUE KEY `uq_feature_name_article_id` (`name`,`article_id`) USING BTREE,
  KEY `fk_feature_article_id` (`article_id`) USING BTREE,
  CONSTRAINT `fk_feature_article_id` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DELETE FROM `article_feature`;
/*!40000 ALTER TABLE `article_feature` DISABLE KEYS */;
/*!40000 ALTER TABLE `article_feature` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `article_price` (
  `article_price_id` int unsigned NOT NULL AUTO_INCREMENT,
  `article_id` int unsigned NOT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`article_price_id`) USING BTREE,
  UNIQUE KEY `uq_article_price_article_id_price` (`article_id`,`price`),
  KEY `article_id` (`article_id`),
  CONSTRAINT `FK_article_price_id_article_id` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DELETE FROM `article_price`;
/*!40000 ALTER TABLE `article_price` DISABLE KEYS */;
INSERT INTO `article_price` (`article_price_id`, `article_id`, `price`, `created_at`) VALUES
	(1, 4, 33, '2020-09-01 20:33:04'),
	(2, 1, 25, '2020-09-01 20:33:21'),
	(3, 4, NULL, NULL),
	(4, 4, NULL, NULL),
	(5, 4, NULL, NULL);
/*!40000 ALTER TABLE `article_price` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `article_size` (
  `article_size_id` int unsigned NOT NULL AUTO_INCREMENT,
  `size` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `article_id` int unsigned NOT NULL,
  PRIMARY KEY (`article_size_id`),
  KEY `article_id` (`article_id`),
  CONSTRAINT `fk_article_size_article_id` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DELETE FROM `article_size`;
/*!40000 ALTER TABLE `article_size` DISABLE KEYS */;
INSERT INTO `article_size` (`article_size_id`, `size`, `article_id`) VALUES
	(1, 'XL', 4),
	(2, NULL, 4),
	(3, NULL, 4),
	(4, '1,5mx2m', 1);
/*!40000 ALTER TABLE `article_size` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `cart` (
  `cart_id` int unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `user_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`cart_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `FK_cart_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DELETE FROM `cart`;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` (`cart_id`, `created_at`, `user_id`) VALUES
	(1, NULL, NULL),
	(2, NULL, NULL),
	(3, NULL, NULL),
	(4, NULL, NULL),
	(5, NULL, NULL),
	(6, NULL, NULL),
	(7, NULL, NULL),
	(8, NULL, NULL),
	(9, NULL, NULL),
	(10, NULL, NULL),
	(11, NULL, NULL),
	(12, NULL, NULL),
	(13, NULL, NULL),
	(14, NULL, NULL),
	(15, NULL, NULL),
	(16, NULL, NULL),
	(17, NULL, NULL),
	(18, NULL, NULL),
	(19, NULL, NULL),
	(20, NULL, NULL),
	(21, NULL, NULL),
	(22, NULL, NULL),
	(23, NULL, NULL),
	(24, NULL, NULL),
	(25, NULL, NULL),
	(26, NULL, NULL),
	(27, NULL, NULL),
	(28, NULL, NULL);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `cart_article` (
  `cart_article_id` int unsigned NOT NULL AUTO_INCREMENT,
  `cart_id` int unsigned NOT NULL,
  `article_id` int unsigned NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`cart_article_id`),
  UNIQUE KEY `uq_cart_article_cart_id` (`cart_id`),
  UNIQUE KEY `uq_cart_article_id` (`article_id`),
  KEY `cart_id` (`cart_id`),
  KEY `article_id` (`article_id`),
  CONSTRAINT `fk_cart_article_article_id` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_cart_article_cart_id` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DELETE FROM `cart_article`;
/*!40000 ALTER TABLE `cart_article` DISABLE KEYS */;
INSERT INTO `cart_article` (`cart_article_id`, `cart_id`, `article_id`, `quantity`) VALUES
	(1, 2, 1, 2),
	(3, 25, 2, 3);
/*!40000 ALTER TABLE `cart_article` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `category` (
  `category_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `uq_category_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DELETE FROM `category`;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` (`category_id`, `name`) VALUES
	(1, 'Hemijske olovke promena'),
	(6, 'Hemijske sa stampom'),
	(2, 'Koverte'),
	(5, 'Makaze'),
	(8, 'Proba grupe sa tokenom'),
	(9, 'Proba grupe sa tokensom'),
	(4, 'Stolice'),
	(3, 'Stolovi');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `order` (
  `order_id` int unsigned NOT NULL AUTO_INCREMENT,
  `cart_id` int unsigned NOT NULL,
  `status` enum('rejected','accepted','shipped','pending') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL,
  PRIMARY KEY (`order_id`),
  UNIQUE KEY `uq_order_cart_id` (`cart_id`),
  CONSTRAINT `fk_order_cart_id` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DELETE FROM `order`;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` (`order_id`, `cart_id`, `status`, `created_at`) VALUES
	(1, 1, 'pending', '2020-09-03 10:29:37'),
	(2, 3, 'rejected', '2020-09-03 10:29:54');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `photo` (
  `photo_id` int unsigned NOT NULL AUTO_INCREMENT,
  `article_id` int unsigned NOT NULL,
  `image_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`photo_id`) USING BTREE,
  KEY `fk_article_id` (`article_id`),
  CONSTRAINT `FK_photo_article` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DELETE FROM `photo`;
/*!40000 ALTER TABLE `photo` DISABLE KEYS */;
INSERT INTO `photo` (`photo_id`, `article_id`, `image_path`) VALUES
	(1, 2, '202091-1291263061-Greskaa'),
	(2, 2, '202091-5733727885-baza');
/*!40000 ALTER TABLE `photo` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password_hash` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `forename` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `surname` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `postal_address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `uq_user_email` (`email`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`user_id`, `email`, `password_hash`, `forename`, `surname`, `postal_address`) VALUES
	(6, 'test@test3.com', 'D65534E6F152D0CF0E16325F5EF17A890F887106C5EEF8838928A16977357B6625DFCD35B167DD49152E1074CC36FBCEA9B2A05E867D549BD6B159DCBB954672', 'Milos', 'Stefanovic', '9.oktobar 3');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `user_token` (
  `user_token_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `created_at` timestamp NOT NULL,
  `token` text COLLATE utf8mb4_general_ci NOT NULL,
  `expires_at` datetime NOT NULL,
  `is_valid` tinyint unsigned NOT NULL,
  PRIMARY KEY (`user_token_id`),
  KEY `fk_user_token_user_id` (`user_id`),
  CONSTRAINT `fk_user_token_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DELETE FROM `user_token`;
/*!40000 ALTER TABLE `user_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_token` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
