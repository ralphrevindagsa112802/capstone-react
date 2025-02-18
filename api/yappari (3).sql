-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 18, 2025 at 10:35 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `yappari`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(222) NOT NULL,
  `username` varchar(222) NOT NULL,
  `password` varchar(222) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `username`, `password`, `date`) VALUES
(3, 'yappariadmin', 'yappariadmin123', '2025-02-04 11:36:38'),
(4, 'yapadmin', 'yapadmin123', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(222) NOT NULL,
  `category_name` varchar(222) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`, `date`) VALUES
(1, 'Classic coffees', '2025-02-07 12:21:46'),
(2, 'Frappes', '2025-02-07 12:21:46'),
(3, 'Smoothies', '2025-02-07 12:21:46'),
(4, 'Refreshers', '2025-02-07 12:21:46'),
(5, 'Milk drinks', '2025-02-07 12:21:46'),
(6, 'Rice meals', '2025-02-07 12:21:46'),
(7, 'Snacks & pasta', '2025-02-07 12:21:46');

-- --------------------------------------------------------

--
-- Table structure for table `food`
--

CREATE TABLE `food` (
  `food_id` int(222) NOT NULL,
  `food_name` varchar(222) NOT NULL,
  `food_description` varchar(222) NOT NULL,
  `food_size` varchar(222) NOT NULL,
  `food_price` int(222) NOT NULL,
  `food_img` varchar(222) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `food`
--

INSERT INTO `food` (`food_id`, `food_name`, `food_description`, `food_size`, `food_price`, `food_img`) VALUES
(1, 'katsudon', 'basta katsudon yan', 'regular', 160, '[value-6]'),
(2, 'fish n chips', 'fish n chips', 'regular', 110, ''),
(3, 'fish n chips', 'fish n chips', 'regular', 110, ''),
(4, 'Pork curry', 'This delicious pork curry recipe has just the right amount of heat, but it can be adjusted to any taste.', 'Regular', 160, '[value-6]');

-- --------------------------------------------------------

--
-- Table structure for table `size`
--

CREATE TABLE `size` (
  `size_id` int(222) NOT NULL,
  `regular` varchar(222) NOT NULL,
  `tall` varchar(222) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(222) NOT NULL,
  `username` varchar(222) NOT NULL,
  `f_name` varchar(222) NOT NULL,
  `l_name` varchar(222) NOT NULL,
  `email` varchar(222) NOT NULL,
  `phone` varchar(222) NOT NULL,
  `password` varchar(222) NOT NULL,
  `address` text NOT NULL,
  `status` int(222) NOT NULL DEFAULT 1,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `username`, `f_name`, `l_name`, `email`, `phone`, `password`, `address`, `status`, `date`) VALUES
(1, 'angelogotis', 'mark angelo', 'gerodiaz', 'angelogerodiaz4@gmail.com', '09694059622', 'e1bc3b5d6976faa82737e19a60298070', 'blk 19 b addition hills mandaluyong city philippines', 1, '2025-02-02 07:10:39'),
(2, 'ralphralph', 'ralph', 'dagsa', 'angelomarkgotis@gmail.com', '09935884112', 'b8fd2848a2a9425d81911fe0e75fd4cf', 'blk 19 b addition hills mandaluyong city philippines', 1, '2025-02-02 07:23:27'),
(3, 'karlkerrick', 'karl', 'kerrick', 'gerodiazmarkangelo02@gmail.com', '09129182007', '8ab76c77041e9e443f603771405b95e5', 'Addition HIlls, Mandaluyong City', 1, '2025-02-02 07:28:12'),
(4, 'christine', 'christine', 'lagunero', 'lagunero@gmail.com', '09098318985', '723e1489a45d2cbaefec82eee410abd5', 'blk 19 b addition hills mandaluyong city philippines', 1, '2025-02-02 07:58:23'),
(5, 'gotismark', 'mark angelo', 'gotis', 'gotismark@gmail.com', '09098318986', '9f3415732ee008092bfdaa7d1459d05c', 'blk 19 b addition hills mandaluyong city philippines', 1, '2025-02-02 09:32:53'),
(6, 'ryubalota', '', '', 'ryubalota@gmail.com', '', '$2y$10$Sqq/dcAdtq5nEhwNU.5wv.xFGO5jxpZfzRy4VsfPTUGM.Dx5Tykau', '', 1, '2025-02-12 05:53:35'),
(7, '', '', '', '', '', '$2y$10$CLDqgyINP1ry0NkZ5QuVJugFpoL8Y01opP6.mVY00tEm9dzIZicWG', '', 1, '2025-02-13 10:25:40'),
(8, '', '', '', '', '', '$2y$10$Po7Y.CJRt6cmoR9KDd5.zepMQs1LiG/lg5H9FAG5p06kBtNDRDHL2', '', 1, '2025-02-13 10:26:23'),
(9, '', '', '', '', '', '$2y$10$1R8esgtp8.24EHccuMQKAuWvC9nCVHAbs/2H7K/PMadyfOmZdLh0O', '', 1, '2025-02-13 10:29:10'),
(10, '', '', '', '', '', '$2y$10$5zDICN2Zyr293C8OOFHOr.P99MJwZw5CKKgYVB9ObMopVf86BXgre', '', 1, '2025-02-13 11:02:29'),
(11, '', '', '', '', '', '$2y$10$/sj/0R3SyFK6OLUv0.ZSi.1MZ6JbMVcWZ1l75XSDkAf1q3/Igjz/S', '', 1, '2025-02-13 11:19:47'),
(12, '', '', '', '', '', '$2y$10$C67L49D3G6Wvz9XrfUvfleg63w329Uom//6q51/R/dRJJC4xYoHGe', '', 1, '2025-02-13 11:23:03'),
(13, '', '', '', '', '', '$2y$10$JmxVJO7ePSGi102kFRMrNeUqINMwZaTeJC00bCyvPKd3I9g4HCSsS', '', 1, '2025-02-14 12:19:47'),
(14, 'Angelogotis', '', '', 'gotismark@gmail.com', '', '$2y$10$5ppG7MuCERgS/Z4abdC7QO9QQKiXw4JnWm45Z9OZF1eZoqB.d3nMu', '', 1, '2025-02-18 01:40:47'),
(15, 'markangelo', '', '', 'gerodiazmarkangelo02@gmail.com', '', '$2y$10$Ny4GXvWjEdyGVOPd2cY6Z.rxrZGcDzmLnG2wdohvfzdDLMzNWn1Jm', '', 1, '2025-02-18 05:40:03'),
(16, 'gelogotis', '', '', 'gerodiazmarkangelo02@gmail.com', '', '$2y$10$eyx0Pf32PuCZ0AhKT6U7O.eg.dC3J1iOuoOTpM3saIeBGJAdZG9gW', '', 1, '2025-02-18 07:34:34'),
(17, 'angelogotis', '', '', 'angelogerodiaz4@gmail.com', '', '$2y$10$DbtgOySWKCjdMSTRPnCm.uOlyONwPMHA55W5TO0FpCYDRzONgI4EG', '', 1, '2025-02-18 07:42:06'),
(18, 'markgerodiaz', 'mark', 'gerodiaz', 'ralph@gmail.com', '090989318985', '$2y$10$Eo20xX/nFEuYIJwkldUFzepoQRa5y8uKr5zwtvPzAZLDZX9MZAkza', 'mandaluyong city', 1, '2025-02-18 08:47:45'),
(19, 'gelogelo', 'gelo', 'gotis', 'gelo@gmail.com', '0909831985', '$2y$10$pVavc7EjInyt5FOtijjGG.Mv7/kFjZJ/PGf8BKcU1KWCpYjQ3r/Jq', 'mandaluyong city', 1, '2025-02-18 09:11:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `food`
--
ALTER TABLE `food`
  ADD PRIMARY KEY (`food_id`);

--
-- Indexes for table `size`
--
ALTER TABLE `size`
  ADD PRIMARY KEY (`size_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(222) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(222) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `food`
--
ALTER TABLE `food`
  MODIFY `food_id` int(222) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `size`
--
ALTER TABLE `size`
  MODIFY `size_id` int(222) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(222) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
