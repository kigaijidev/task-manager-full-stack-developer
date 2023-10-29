-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.34 - MySQL Community Server - GPL
-- Server OS:                    Linux
-- HeidiSQL Version:             12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for todoEXPRESS
CREATE DATABASE IF NOT EXISTS `todoEXPRESS` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `todoEXPRESS`;

-- Dumping structure for table todoEXPRESS.Payments
CREATE TABLE IF NOT EXISTS `Payments` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `Currency` int unsigned NOT NULL,
  `FullName` varchar(255) NOT NULL,
  `Bank` varchar(255) NOT NULL,
  `BankNumber` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`UserID`),
  CONSTRAINT `Payments_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table todoEXPRESS.Payments: ~12 rows (approximately)
INSERT INTO `Payments` (`UserID`, `Currency`, `FullName`, `Bank`, `BankNumber`) VALUES
	(7, 5, 'Minh', '', ''),
	(8, 1, 'Minh', '', ''),
	(9, 50, 'Minh', '', ''),
	(11, 0, 'Payment', '', ''),
	(12, 0, 'Payment', '', ''),
	(13, 0, 'Payment', '', ''),
	(14, 0, 'Payment', '', ''),
	(15, 0, 'Payment', '', ''),
	(16, 0, 'Payment', '', ''),
	(17, 0, 'Payment', '', ''),
	(18, 0, 'Payment', '', ''),
	(19, 0, 'Payment', '', ''),
	(20, 2701, 'NGUYEN VAN LAM', 'LE TIEN DAT', '0123456741'),
	(21, 100, 'NGUYEN VAN LAM', '', '');

-- Dumping structure for table todoEXPRESS.SubscriptionPlans
CREATE TABLE IF NOT EXISTS `SubscriptionPlans` (
  `PlanID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `MaxTodos` int NOT NULL,
  `Price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`PlanID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table todoEXPRESS.SubscriptionPlans: ~4 rows (approximately)
INSERT INTO `SubscriptionPlans` (`PlanID`, `Name`, `MaxTodos`, `Price`) VALUES
	(1, 'Free', 10, 0.00),
	(2, 'Starter', 50, 29.00),
	(3, 'Professional', 500, 99.00),
	(4, 'Premium', 999999, 299.00);

-- Dumping structure for table todoEXPRESS.Todos
CREATE TABLE IF NOT EXISTS `Todos` (
  `TodoID` int NOT NULL AUTO_INCREMENT,
  `UserID` int DEFAULT NULL,
  `Title` varchar(255) NOT NULL,
  `IsCompleted` tinyint(1) DEFAULT '0',
  `CreatedAt` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`TodoID`),
  KEY `UserID` (`UserID`),
  CONSTRAINT `Todos_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`),
  CONSTRAINT `Todos_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table todoEXPRESS.Todos: ~59 rows (approximately)
INSERT INTO `Todos` (`TodoID`, `UserID`, `Title`, `IsCompleted`, `CreatedAt`) VALUES
	(2, 8, 'Todo 1', 0, '2023-10-27 16:41:02'),
	(3, 8, 'Todo 1', 0, '2023-10-27 16:41:03'),
	(4, 8, 'Todo 1', 0, '2023-10-27 16:41:04'),
	(5, 8, 'Todo 1', 0, '2023-10-27 16:41:04'),
	(6, 8, 'Todo 1', 0, '2023-10-27 16:41:05'),
	(7, 8, 'Todo 1', 0, '2023-10-27 16:41:06'),
	(8, 8, 'Todo 1', 0, '2023-10-27 16:41:06'),
	(9, 8, 'Todo 1', 0, '2023-10-27 16:41:07'),
	(10, 8, 'Todo 1', 0, '2023-10-27 16:41:16'),
	(11, 8, 'Todo 1', 0, '2023-10-27 16:42:25'),
	(12, 8, 'Todo 1', 0, '2023-10-27 16:42:27'),
	(13, 8, 'Todo 1', 0, '2023-10-27 16:42:27'),
	(14, 8, 'Todo 1', 0, '2023-10-27 16:42:28'),
	(15, 8, 'Todo 1', 0, '2023-10-27 16:42:29'),
	(16, 8, 'Todo 1', 0, '2023-10-27 16:42:29'),
	(17, 8, 'Todo 1', 0, '2023-10-27 16:42:30'),
	(18, 8, 'Todo 1', 0, '2023-10-27 16:42:31'),
	(19, 8, 'Todo 1', 0, '2023-10-27 16:42:31'),
	(20, 8, 'Todo 1', 0, '2023-10-27 16:42:32'),
	(21, 8, 'Todo 1', 0, '2023-10-27 16:42:37'),
	(22, 8, 'Todo 1', 0, '2023-10-27 16:42:38'),
	(23, 8, 'Todo 1', 0, '2023-10-27 16:42:39'),
	(24, 8, 'Todo 1', 0, '2023-10-27 16:42:39'),
	(25, 8, 'Todo 1', 0, '2023-10-27 16:42:40'),
	(26, 8, 'Todo 1', 0, '2023-10-27 16:42:40'),
	(27, 8, 'Todo 1', 0, '2023-10-27 16:42:41'),
	(28, 8, 'Todo 1', 0, '2023-10-27 16:42:42'),
	(29, 8, 'Todo 1', 0, '2023-10-27 16:42:42'),
	(30, 8, 'Todo 1', 0, '2023-10-27 16:42:43'),
	(31, 8, 'Todo 1', 0, '2023-10-27 16:42:43'),
	(32, 8, 'Todo 1', 0, '2023-10-27 16:42:44'),
	(33, 8, 'Todo 1', 0, '2023-10-27 16:42:44'),
	(34, 8, 'Todo 1', 0, '2023-10-27 16:42:45'),
	(35, 8, 'Todo 1', 0, '2023-10-27 16:42:46'),
	(36, 8, 'Todo 1', 0, '2023-10-27 16:42:46'),
	(37, 8, 'Todo 1', 0, '2023-10-27 16:42:47'),
	(38, 8, 'Todo 1', 0, '2023-10-27 16:42:47'),
	(39, 8, 'Todo 1', 0, '2023-10-27 16:42:48'),
	(40, 8, 'Todo 1', 0, '2023-10-27 16:42:48'),
	(41, 8, 'Todo 1', 0, '2023-10-27 16:42:49'),
	(42, 8, 'Todo 1', 0, '2023-10-27 16:42:49'),
	(43, 8, 'Todo 1', 0, '2023-10-27 16:42:50'),
	(44, 8, 'Todo 1', 0, '2023-10-27 16:42:51'),
	(45, 8, 'Todo 1', 0, '2023-10-27 16:42:51'),
	(46, 8, 'Todo 1', 0, '2023-10-27 16:42:52'),
	(47, 8, 'Todo 1', 0, '2023-10-27 16:42:52'),
	(48, 8, 'Todo 1', 0, '2023-10-27 16:42:53'),
	(49, 8, 'Todo 1', 0, '2023-10-27 16:42:53'),
	(50, 8, 'Todo 1', 0, '2023-10-27 16:42:54'),
	(61, 8, 'Todo 1', 0, '2023-10-27 16:49:37'),
	(62, 8, 'Todo 1', 0, '2023-10-27 16:49:41'),
	(63, 8, 'Todo 1', 0, '2023-10-27 16:49:42'),
	(64, 8, 'Todo 1', 0, '2023-10-27 16:49:42'),
	(65, 8, 'Todo 1', 0, '2023-10-27 16:49:44'),
	(66, 8, 'Todo 1', 0, '2023-10-27 16:50:58'),
	(67, 8, 'Todo 1', 0, '2023-10-27 16:50:59'),
	(68, 8, 'Todo 1', 0, '2023-10-27 16:50:59'),
	(69, 8, 'Todo 1', 0, '2023-10-27 16:51:00'),
	(78, 9, 'Hello', 0, '2023-10-29 12:34:01'),
	(79, 9, 'Hello', 0, '2023-10-29 12:35:01'),
	(80, 9, 'Xin Chào', 0, '2023-10-29 12:35:37'),
	(81, 9, 'Thua đi', 0, '2023-10-29 12:35:41'),
	(83, 20, 'Test 2', 0, '2023-10-29 12:57:11'),
	(85, 20, 'Test 4', 0, '2023-10-29 12:57:17'),
	(87, 20, 'Test 6', 0, '2023-10-29 12:57:19'),
	(88, 20, 'Test 7', 0, '2023-10-29 12:57:21'),
	(89, 20, 'Test 8', 0, '2023-10-29 12:57:22'),
	(90, 20, 'Test 9', 0, '2023-10-29 12:57:24'),
	(91, 20, 'Test 10', 0, '2023-10-29 12:57:25'),
	(92, 20, 'Test 11', 0, '2023-10-29 17:59:41'),
	(93, 20, 'Test 12', 0, '2023-10-29 18:00:07'),
	(94, 20, '53', 0, '2023-10-29 18:01:09'),
	(95, 20, 'ée', 0, '2023-10-29 18:01:13');

-- Dumping structure for table todoEXPRESS.TokenExpireds
CREATE TABLE IF NOT EXISTS `TokenExpireds` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `Token` text,
  PRIMARY KEY (`UserID`),
  CONSTRAINT `TokenExpireds_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`),
  CONSTRAINT `TokenExpireds_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`),
  CONSTRAINT `TokenExpireds_ibfk_3` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table todoEXPRESS.TokenExpireds: ~0 rows (approximately)
INSERT INTO `TokenExpireds` (`UserID`, `Token`) VALUES
	(9, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjksIk5hbWUiOiJNaW5oIiwiRW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJQYXNzd29yZCI6IiQyYiQxMCRtVUJVSVE1MDNnZE9iTlFVNjZyQS5lR1RlYmRHbWg2WGNxaW85OG1MUzdBeUh4NHVrbC83NiIsIlJvbGVzIjoiMTExMSIsIkFjY291bnRTdGF0dXMiOiJBY3RpdmUiLCJTdWJzY3JpcHRpb25FeHBpcnlEYXRlIjoiMjAyMy0xMS0wMVQwMDowMDowMC4wMDBaIiwiTGFzdEFjY2Vzc0RhdGUiOiIyMDIzLTEwLTI5VDAwOjAwOjAwLjAwMFoiLCJpYXQiOjE2OTg1ODMzOTAsImV4cCI6MTY5ODg0MjU5MH0.BzpQrEZLO4W-BVUTIKx7SU0fHE0VubYPhP4c0DZgXfo'),
	(20, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjIwLCJOYW1lIjoiVGVzdCBhZGQgdG9kbyBVcGRhdGUgMTExIiwiRW1haWwiOiJ0ZXN0YWRkQGdtYWlsLmNvbSIsIlBhc3N3b3JkIjoiJDJiJDEwJDQxTGFxRzVmTkh2enRSVWF4L1Vtc09LT3FLS1JYeDVILjAySy9uc1Zpa2UydGx1ei5Nc0RxIiwiUm9sZXMiOiIwMDAwIiwiQWNjb3VudFN0YXR1cyI6IkFjdGl2ZSIsIlN1YnNjcmlwdGlvbkV4cGlyeURhdGUiOiIyMDIzLTExLTAxVDAwOjAwOjAwLjAwMFoiLCJMYXN0QWNjZXNzRGF0ZSI6IjIwMjMtMTAtMjlUMDA6MDA6MDAuMDAwWiIsImlhdCI6MTY5ODU5OTM0OCwiZXhwIjoxNjk4ODU4NTQ4fQ.OFZlC7OSL_VqR_b04PktrAcYKf2u4MqwNLiASnThZlA');

-- Dumping structure for table todoEXPRESS.Users
CREATE TABLE IF NOT EXISTS `Users` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Roles` varchar(4) NOT NULL DEFAULT '0000',
  `AccountStatus` enum('Active','Suspended') DEFAULT 'Active',
  `SubscriptionExpiryDate` date DEFAULT NULL,
  `LastAccessDate` date DEFAULT NULL,
  PRIMARY KEY (`UserID`),
  KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table todoEXPRESS.Users: ~11 rows (approximately)
INSERT INTO `Users` (`UserID`, `Name`, `Email`, `Password`, `Roles`, `AccountStatus`, `SubscriptionExpiryDate`, `LastAccessDate`) VALUES
	(7, 'Minh', 'test1@gmail.com', '$2b$10$wMI/PAy2Lbv67NJ8kMZNVud7EZn8jfUk33.ZW7SqnLC5jEZI1Komq', '0000', 'Active', '2023-10-30', '2023-10-27'),
	(8, 'Minh', 'test2@gmail.com', '$2b$10$muXRTtURAsBqzAh0/dO.Dutr/h.I51psjX9kYZ.7uVkgNkBZQ.iXm', '0000', 'Active', '2023-10-30', '2023-10-27'),
	(9, 'Minh', 'admin@gmail.com', '$2b$10$mUBUIQ503gdObNQU66rA.eGTebdGmh6Xcqio98mLS7AyHx4ukl/76', '1111', 'Active', '2023-11-01', '2023-10-29'),
	(11, 'Payment', 'testPayment1@gmail.com', '$2b$10$JLvh8NoJzEqFTI0g6tgZ0O/W.X82H50vCiittCxtKezdx2lIUIQ1m', '0000', 'Active', '2023-10-31', NULL),
	(12, 'Payment', 'testPayment2@gmail.com', '$2b$10$d4Ac5fRi2Wow6hbMp4sZ6uC3Cvm9IHtD1V6Kd6VgmD0KaeDhT/y26', '0000', 'Active', '2023-10-31', NULL),
	(13, 'Payment', 'testPayment3@gmail.com', '$2b$10$TobzNV52xhZSf4hUr0lmOexOvjykbD5oQao5TLGhqzXJkFcaIjuHu', '0000', 'Active', '2023-10-31', NULL),
	(14, 'Payment', 'testPayment4@gmail.com', '$2b$10$uWJk3OG1PPZ2GUMMmdAW4uokyhqbYizkn2YFtL5See9R7q1GP/iiC', '0000', 'Active', '2023-10-31', NULL),
	(15, 'Payment', 'testPayment5@gmail.com', '$2b$10$ub8edZExeDm5Y.24TwcQ3.my8eZ6xNf.5GsA9LrDWA5hDDuVRgpie', '0000', 'Active', '2023-10-31', NULL),
	(16, 'Payment', 'testPayment6@gmail.com', '$2b$10$vt6ZrDTNA0TPYQDVXcPvOuJfytXSE6rLVOZLPY8XuC.XjjonHR2By', '0000', 'Active', '2023-10-31', NULL),
	(17, 'Payment', 'testPayment7@gmail.com', '$2b$10$x.ffTbW9BkDbb6X8Pfb4r.2rvmjKoOFVj/z5M73Q32rZHHsQ1GJca', '0000', 'Active', '2023-10-31', NULL),
	(18, 'Payment', 'testPayment8@gmail.com', '$2b$10$NSebbr.JGf0XrEmEkCnPT.GDwiV6bH3yaDhQW6P7YnqwrUQv3KTOa', '0000', 'Active', '2023-10-31', NULL),
	(19, 'Payment', 'testPayment9@gmail.com', '$2b$10$zTowC7L6E0oEUNzo3ZbVa.D8SX3MnsBmtU1Gp.Ib.sCvqn1EyA06q', '0000', 'Active', '2023-10-31', NULL),
	(20, 'Test add todo Update 111', 'testadd@gmail.com', '$2b$10$41LaqG5fNHvztRUax/UmsOKOqKKRXx5H.02K/nsVike2tluz.MsDq', '0000', 'Active', '2023-11-01', '2023-10-29'),
	(21, 'NGUYEN VAN LAM', 'testadd1@gmail.com', '$2b$10$t3xbczNZYUjInQgLwc/7Se1yznDxUne0aXqTEIrvZtNPgxzGBklDO', '0000', 'Active', '2023-11-01', NULL);

-- Dumping structure for table todoEXPRESS.UserSubscriptions
CREATE TABLE IF NOT EXISTS `UserSubscriptions` (
  `UserID` int NOT NULL,
  `PlanID` int NOT NULL,
  `StartDate` date NOT NULL,
  `EndDate` date NOT NULL,
  `Status` enum('Active','Canceled','Expired') DEFAULT 'Active',
  `Count` int unsigned DEFAULT '0',
  PRIMARY KEY (`UserID`,`PlanID`),
  KEY `PlanID` (`PlanID`),
  CONSTRAINT `UserSubscriptions_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`),
  CONSTRAINT `UserSubscriptions_ibfk_2` FOREIGN KEY (`PlanID`) REFERENCES `SubscriptionPlans` (`PlanID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table todoEXPRESS.UserSubscriptions: ~15 rows (approximately)
INSERT INTO `UserSubscriptions` (`UserID`, `PlanID`, `StartDate`, `EndDate`, `Status`, `Count`) VALUES
	(7, 2, '2023-10-27', '2023-11-26', 'Canceled', 0),
	(7, 3, '2023-10-27', '2023-11-26', 'Active', 0),
	(8, 1, '2023-10-27', '2122-05-21', 'Expired', 10),
	(8, 2, '2023-10-27', '2023-11-26', 'Expired', 45),
	(8, 3, '2023-10-27', '2023-11-26', 'Active', 4),
	(9, 1, '2023-10-28', '2122-05-22', 'Active', 4),
	(11, 1, '2023-10-28', '2122-05-22', 'Active', 0),
	(12, 1, '2023-10-28', '2122-05-22', 'Active', 0),
	(13, 1, '2023-10-28', '2122-05-22', 'Active', 0),
	(14, 3, '2023-10-28', '2023-10-28', 'Expired', 0),
	(15, 3, '2023-10-28', '2023-10-28', 'Expired', 0),
	(16, 2, '2023-10-28', '2023-10-28', 'Expired', 0),
	(17, 4, '2023-10-28', '2023-10-28', 'Expired', 0),
	(18, 1, '2023-10-28', '2122-05-22', 'Active', 0),
	(19, 1, '2023-10-28', '2122-05-22', 'Active', 0),
	(20, 1, '2023-10-29', '2122-05-23', 'Expired', 10),
	(20, 2, '2023-10-29', '2023-11-28', 'Expired', 0),
	(20, 4, '2023-10-29', '2023-11-28', 'Active', 0),
	(21, 1, '2023-10-29', '2122-05-23', 'Active', 0);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
