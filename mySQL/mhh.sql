-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 01, 2020 at 02:57 PM
-- Server version: 5.7.26
-- PHP Version: 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mhh`
--
CREATE DATABASE IF NOT EXISTS `mhh` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `mhh`;

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
CREATE TABLE IF NOT EXISTS `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_cart_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `status`, `user_id`) VALUES
(1, 0, 1),
(2, 1, 2),
(3, 1, 5),
(7, 0, 1),
(8, 0, 1),
(9, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `cart_product`
--

DROP TABLE IF EXISTS `cart_product`;
CREATE TABLE IF NOT EXISTS `cart_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `quanlity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_cart_product_cart` (`cart_id`),
  KEY `FK_cart_product_product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cart_product`
--

INSERT INTO `cart_product` (`id`, `product_id`, `cart_id`, `quanlity`) VALUES
(1, 1, 1, 3),
(2, 2, 1, 3),
(3, 3, 1, 6),
(4, 5, 1, 7),
(10, 6, 7, 20),
(11, 6, 8, 5);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `thumbnail` varchar(200) NOT NULL,
  `price` float NOT NULL,
  `quanlity` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_product_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `description`, `thumbnail`, `price`, `quanlity`, `user_id`) VALUES
(1, 'Marvel\'s Spider-Man: Game of The Year Edition - PlayStation 4', 'Marvel\'s Spider man features the acrobatic abilities, improvisation and Web slinging that the wall crawler is famous for, while also introducing elements never before seen in a Spider man game\r\nThe ultimate spider-man game and experience the all-new adventure everyone is talking about\r\nGame of the Year', 'https://images-na.ssl-images-amazon.com/images/I/814tECNqHBL._AC_SX215_.jpg', 300000, 19, 1),
(2, 'Days Gone - Playstation 4', 'Harsh Open World: Using the power of PlayStation 4 and Unreal Engine 4, Days Gone offers an incredibly realistic and detailed open world experience. But be careful— day and night cycles, all affect gameplay and enemy behavior\r\nBrutal Sandbox Combat: Perfect your gameplay with an endless combination of strategy and play in every situation. Craft customized items using pieces and parts found in the field, from brutal melee weapons to traps and more\r\nCompelling Story: At its core, Days Gone is about survivors and what makes them human: desperation, loss, madness, betrayal, friendship, brotherhood, regret, love— and hope. It’s about how hope never dies\r\nPlay as Deacon St. John, a bounty hunter facing a brutal struggle for survival while searching for a reason to live', 'https://images-na.ssl-images-amazon.com/images/I/91lzd5H8XML._AC_SX215_.jpg', 500000, 14, 1),
(3, 'The Legend of Zelda: Breath of the Wild - Nintendo Switch', 'Forget everything you know about The Legend of Zelda games\r\nTravel across vast fields, through forests, and to mountain peaks as you discover what has become of the kingdom of Hyrule In this stunning Open Air Adventure. Number of Players: 1 player\r\nNow on Nintendo Switch, your journey is freer and more open than ever. Take your system anywhere, and adventure as Link any way you like\r\nEntertainment Software Rating Board (ESRB) Content Description: Fantasy Violence, Mild Suggestive Themes, Use of Alcohol', 'https://images-na.ssl-images-amazon.com/images/I/61lIxMMeacL._AC_SX215_.jpg', 600000, 13, 1),
(4, 'Star Wars Jedi: Fallen Order - PlayStation 4', 'Cinematic, Immersive Combat Jedi: Fallen Order delivers the fantasy of becoming a Jedi through its innovative lightsaber combat system striking, parrying, dodging partnered with a suite of powerful Force abilities you’ll need to leverage to overcome obstacles that stand in your way\r\nA New Jedi Story Begins : As a former Padawan on the run from the Empire, you must complete your training before Imperial Inquisitors discover your plan to revive the Jedi Order\r\nThe Galaxy Awaits : Ancient forests, windswept rock faces, and haunted jungles are all unique biomes you’ll explore in Jedi: Fallen Order, with the freedom to decide when and where you go next\r\nA galaxy spanning adventure awaits in Star Wars Jedi: Fallen Order, a new 3rd person action adventure title from Respawn Entertainment', 'https://images-na.ssl-images-amazon.com/images/I/61PAS17sL3L._AC_SX215_.jpg', 500000, 18, 1),
(5, 'The Outer Worlds Playstation 4', 'The player driven story RPG: In keeping with the Obsidian tradition, how you approach The Outer Worlds is up to you; Your choices affect not only the way the story develops; but Your character build, companion stories, and end game scenarios\r\nExplore the corporate Colony\r\nLead Your Companions', 'https://images-na.ssl-images-amazon.com/images/I/81KZCh0hG5L._AC_SX215_.jpg', 600000, 14, 1),
(6, 'Assassin\'s Creed: The Rebel Collection - Nintendo Switch', 'Includes both Assassin’s Creed IV Black Flag and Assassin’s Creed Rogue, plus all single-player DLC.\r\nBecome the most feared pirate in the Caribbean in Assassin’s Creed IV Black Flag. Take part in an award-winning naval experience and explore a massive open world.\r\nBecome the ultimate assassin hunter in Assassin’s Creed Rogue, and play as a Templar for the first time in franchise history.\r\nAdditional bonus content: Black Beard: The Lost Journal (pp. 1– 55) and Assassin’s Creed: Awakening Volumes 1 & 2.\r\nExperience enhanced features like handheld mode, HD Rumble, a touch screen interface, and motion control aiming.', 'https://images-na.ssl-images-amazon.com/images/I/71Cd0caCpDL._AC_SX215_.jpg', 400000, 25, 1);

-- --------------------------------------------------------

--
-- Table structure for table `receipt`
--

DROP TABLE IF EXISTS `receipt`;
CREATE TABLE IF NOT EXISTS `receipt` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `total` float NOT NULL,
  `buy_date` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `dia_chi` varchar(400) NOT NULL DEFAULT '',
  `atm` varchar(20) NOT NULL DEFAULT '',
  `sdt` varchar(20) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `FK_receipt_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `receipt`
--

INSERT INTO `receipt` (`id`, `total`, `buy_date`, `user_id`, `dia_chi`, `atm`, `sdt`) VALUES
(6, 12138000, '2020-01-01 01:39:38', 1, 'dccw wcwc cwcc wccwcw', '111-222-333', '0903555666'),
(7, 9520000, '2020-01-01 16:59:17', 1, 'yyvy byb buunu nunun', '111-222-333', '0903555666'),
(8, 2380000, '2020-01-01 18:10:29', 1, 'dqdiqndqndqjndjqdkqn', '111-222-333', '0903555666');

-- --------------------------------------------------------

--
-- Table structure for table `receipt_product`
--

DROP TABLE IF EXISTS `receipt_product`;
CREATE TABLE IF NOT EXISTS `receipt_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `receipt_id` int(11) NOT NULL,
  `quanlity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_receipt_product_receipt` (`receipt_id`),
  KEY `FK_receipt_product_product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `receipt_product`
--

INSERT INTO `receipt_product` (`id`, `product_id`, `receipt_id`, `quanlity`) VALUES
(1, 1, 6, 3),
(2, 2, 6, 3),
(3, 3, 6, 6),
(4, 5, 6, 7),
(5, 6, 7, 20),
(6, 6, 8, 5);

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
CREATE TABLE IF NOT EXISTS `review` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `date_review` datetime NOT NULL,
  `score` int(11) NOT NULL,
  `content` varchar(256) DEFAULT NULL,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_review_user` (`user_id`),
  KEY `FK_review_product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`id`, `user_id`, `date_review`, `score`, `content`, `product_id`) VALUES
(1, 1, '2020-01-01 21:13:49', 3, '', 1),
(2, 1, '2020-01-01 21:14:51', 5, 'mmmm', 2),
(3, 1, '2020-01-01 21:20:10', 5, 'mmmm nnbn', 5);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(70) NOT NULL,
  `sdt` varchar(20) DEFAULT '',
  `dia_chi` varchar(200) DEFAULT '',
  `atm` varchar(20) DEFAULT '',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `sdt`, `dia_chi`, `atm`, `status`) VALUES
(1, 'yeah', 'yeah@gmail.com', '$2b$10$NnIOwPlNFYtZkw0sdnfA4.PlQKzxk/8YqEzZcbOQm5Lbv1uQYulIS', '', '', '', 1),
(2, 'abc', 'abc@gmail.com', '$2b$10$uiMNZGyku8mnFhSFBJv0GO5KHAvyhyKnYOUP82b8dQ7q3mU4MVR5G', '', '', '', 1),
(5, 'ooo', 'ooo@gmail.com', '$2b$10$9hjUfcCcGc99xECKoRzzEOs79Tw9zGN7W42b82mEsvbQV7vD5leKm', '', '', '', 1);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `FK_cart_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `cart_product`
--
ALTER TABLE `cart_product`
  ADD CONSTRAINT `FK_cart_product_cart` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`),
  ADD CONSTRAINT `FK_cart_product_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `FK_product_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `receipt`
--
ALTER TABLE `receipt`
  ADD CONSTRAINT `FK_receipt_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `receipt_product`
--
ALTER TABLE `receipt_product`
  ADD CONSTRAINT `FK_receipt_product_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `FK_receipt_product_receipt` FOREIGN KEY (`receipt_id`) REFERENCES `receipt` (`id`);

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `FK_review_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `FK_review_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
