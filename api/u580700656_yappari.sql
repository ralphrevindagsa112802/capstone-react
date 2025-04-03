-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 03, 2025 at 08:16 AM
-- Server version: 10.11.10-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u580700656_yappari`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--

CREATE TABLE `admin_users` (
  `admin_id` int(11) NOT NULL,
  `admin_username` varchar(50) NOT NULL,
  `admin_password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin_users`
--

INSERT INTO `admin_users` (`admin_id`, `admin_username`, `admin_password`, `created_at`) VALUES
(1, 'admin', '$2y$10$e4yxLsA28r40KMhva7v/8eo/pEPIQRTNlGJlunY7EDVd8pP23PPhS', '2025-03-04 07:37:08');

-- --------------------------------------------------------

--
-- Table structure for table `food`
--

CREATE TABLE `food` (
  `food_id` int(11) NOT NULL,
  `food_name` varchar(255) NOT NULL,
  `category` enum('Rice Meal','Classic Coffee','Frappes','Smoothies','Refreshers','Milk Drinks','Snacks and Pasta') NOT NULL,
  `price_small` decimal(10,2) DEFAULT NULL,
  `price_medium` decimal(10,2) DEFAULT NULL,
  `price_large` decimal(10,2) DEFAULT NULL,
  `availability_small` varchar(255) DEFAULT 'Not Available',
  `availability_medium` varchar(255) DEFAULT 'Not Available',
  `availability_large` varchar(255) DEFAULT 'Not Available',
  `image_path` varchar(255) DEFAULT NULL,
  `description` text NOT NULL,
  `allergen` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `food`
--

INSERT INTO `food` (`food_id`, `food_name`, `category`, `price_small`, `price_medium`, `price_large`, `availability_small`, `availability_medium`, `availability_large`, `image_path`, `description`, `allergen`) VALUES
(2, 'Brewed Coffee', 'Classic Coffee', 70.00, 80.00, NULL, 'Available', 'Available', NULL, '/img/CLASSIC COFFEES/Brewed Coffee.jpg', 'Brewed coffee made from our selected premium blend with wet seeping through our fresh ground coffee.', NULL),
(3, 'Americano', 'Classic Coffee', 90.00, 100.00, NULL, 'Available', 'Available', NULL, '/img/CLASSIC COFFEES/Americano.jpg', 'Diluted espresso adopting flavors and aroma of the espresso but less intense aftertaste.', NULL),
(4, 'Cafe Vienna', 'Classic Coffee', 130.00, 140.00, NULL, 'Available', 'Available', NULL, '/img/CLASSIC COFFEES/Cafe Vienna.jpg', 'Viennese Coffee that serves Americano topped with heavy whipped cream, dashed with cocoa powder.', NULL),
(5, 'Affogato', 'Classic Coffee', 70.00, NULL, NULL, 'Available', NULL, NULL, '/img/CLASSIC COFFEES/Affogato.jpg', 'Vanilla Ice Cream topped with concentrated espresso.', NULL),
(6, 'Flat White', 'Classic Coffee', 115.00, 125.00, NULL, 'Available', 'Available', NULL, '/img/CLASSIC COFFEES/Flat White.jpg', 'A milk-espresso based drink that contains steamed milk with more volume than a latte and has no foam.', NULL),
(7, 'Cafe Latte', 'Classic Coffee', 115.00, 125.00, NULL, 'Available', 'Available', NULL, '/img/CLASSIC COFFEES/Cafe Latte.jpg', 'Served with steamed milk and additional layer of foam. A drink that is made up of two shots of espresso.', NULL),
(8, 'Cappuccino', 'Classic Coffee', 115.00, 125.00, NULL, 'Available', 'Available', NULL, '/img/CLASSIC COFFEES/Cappucino.jpg', 'Italian milk espresso-based drink with an additional layer of foam on top, garnished with a dash of cocoa powder.', NULL),
(9, 'Mochaccino', 'Classic Coffee', 125.00, 135.00, NULL, 'Available', 'Available', NULL, '/img/CLASSIC COFFEES/Mochaccino.jpg', 'A milk espresso-based drink enriched with cocoa flavor and an outer layer of foam on top. Similar to Cappuccino but Chocolatey.', NULL),
(10, 'Caramel Macchiato', 'Classic Coffee', 125.00, 135.00, NULL, 'Available', 'Available', NULL, '/img/CLASSIC COFFEES/Caramel Macchiato.jpg', 'Milk espresso-based coffee with a cue of freshly steamed milk, wonderfully syruped caramel drizzle on top.', NULL),
(11, 'Caramel Latte', 'Classic Coffee', 135.00, 145.00, NULL, 'Available', 'Available', NULL, '/img/FLAVORED LATTES/CARAMEL LATTE ICON.jpg', 'Classic latte infused with caramel flavor.', NULL),
(12, 'Hazelnut Latte', 'Classic Coffee', 135.00, 145.00, 0.00, 'Available', 'Available', NULL, '/img/FLAVORED LATTES/HAZELNUT LATTE ICON.jpg', 'Flavored latte infused with sweet roasted hazelnut.', ''),
(13, 'French Vanilla Latte', 'Classic Coffee', 135.00, 145.00, NULL, 'Available', 'Available', NULL, '/img/FLAVORED LATTES/FRENCH VANILLA LATTE ICON.jpg', 'Espresso-based latte infused with vanilla flavor.', NULL),
(14, 'Ichigo Cocoa Latte', 'Classic Coffee', 135.00, 145.00, NULL, 'Available', 'Available', NULL, '/img/FLAVORED LATTES/ICHIGO COCOA LATTE ICON.jpg', 'Infused latte with cocoa and strawberry flavor.', NULL),
(15, 'Peppermint Mocha', 'Classic Coffee', 135.00, 145.00, 0.00, 'Available', 'Available', NULL, '/img/FLAVORED LATTES/PEPPERMINT MOCHA ICON.jpg', 'Latte infused with cocoa flavoring and a dash of peppermint for a cool aftertaste.', ''),
(16, 'White Choco Latte', 'Classic Coffee', 135.00, 145.00, 0.00, 'Available', 'Available', NULL, '/img/FLAVORED LATTES/WHITE CHOCO MOCHA ICON.jpg', 'Classic latte with white chocolate flavoring.', ''),
(17, 'Matcha Latte', 'Classic Coffee', 135.00, 145.00, 0.00, 'Available', 'Available', NULL, '/img/FLAVORED LATTES/MATCHA LATTE ICON.jpg', 'A flavored espresso-based latte infused with Classic milky Matcha.', ''),
(18, 'Caramel Frappe', 'Frappes', 145.00, 155.00, 0.00, 'Available', 'Available', NULL, '/img/SMOOTHIES AND FRAPPES/Caramel Frappe.jpg', 'Iced blended caramel drink with whipped cream and caramel drizzle on top.', ''),
(19, 'Strawberry Frappe', 'Frappes', 145.00, 155.00, 0.00, 'Available', 'Available', NULL, '/img/SMOOTHIES AND FRAPPES/Strawberry Frappe.jpg', 'Iced blended strawberry drink with whipped cream whipped and strawberry drizzle on top.', ''),
(20, 'Vanilla Bean Frappe', 'Frappes', 145.00, 155.00, 0.00, 'Available', 'Available', NULL, '/img/SMOOTHIES AND FRAPPES/Vanilla Bean.jpg', 'Milky Iced blended vanilla bean drink with heavy whipped cream on top.', ''),
(21, 'White Choco Mocha', 'Frappes', 150.00, 160.00, 0.00, 'Available', 'Available', NULL, '/img/SMOOTHIES AND FRAPPES/White Choco Mocha.jpg', 'Iced blended white choco and coffee with whipped cream and white choco chips on top.', ''),
(22, 'Dark Choco Mocha', 'Frappes', 150.00, 160.00, 0.00, 'Available', 'Available', NULL, '/img/SMOOTHIES AND FRAPPES/Dark Choco Mocha.jpg', 'Iced blended dark choco and coffee with whipped cream and dark choco powder on top.', ''),
(23, 'Choco Java Chip', 'Frappes', 150.00, 160.00, 0.00, 'Available', 'Available', NULL, '/img/SMOOTHIES AND FRAPPES/Choco Java Chip.jpg', 'Iced blended milk and cocoa topped with java chip on heavy whipped cream, drizzled with chocolate syrup.', ''),
(24, 'Watermelon Bliss', 'Smoothies', 110.00, 120.00, 0.00, 'Available', 'Available', NULL, '/img/SMOOTHIES AND FRAPPES/Watermelon Bliss.jpg', 'Iced blended drink. made with pure and fresh watermelon chunks.', ''),
(25, 'Mango Tango', 'Smoothies', 110.00, 120.00, 0.00, 'Available', 'Available', NULL, '/img/SMOOTHIES AND FRAPPES/Mango Tango.jpg', 'Sweet and refreshing Iced blended smoothie with use of ripe mango chunks.', ''),
(26, 'Strawberry Smoothie', 'Smoothies', 110.00, 120.00, 0.00, 'Available', 'Available', NULL, '/img/SMOOTHIES AND FRAPPES/Strawberry Smoothie.jpg', 'Iced blended smoothie made with real and fresh strawberry chunks and bits.', ''),
(27, 'Choco Loco', 'Smoothies', 110.00, 120.00, 0.00, 'Available', 'Available', NULL, '/img/SMOOTHIES AND FRAPPES/Choco Loco.jpg', 'Iced blended drink made with real sweet and chocolatey cocoa powder.', ''),
(28, 'Avocado Delight', 'Smoothies', 110.00, 120.00, 0.00, 'Available', 'Available', NULL, '/img/SMOOTHIES AND FRAPPES/Avocado Delight.jpg', 'Iced blended drink made with sweet and milky avocado.', ''),
(29, 'Strawberry Milk', 'Milk Drinks', 110.00, 120.00, 0.00, 'Available', 'Available', NULL, '/img/MILK DRINKS/Strawberry Milk.jpg', 'Milk drink consisting of real fresh strawberry chunks.', ''),
(30, 'Mango Milk', 'Milk Drinks', 110.00, 120.00, 0.00, 'Available', 'Available', NULL, '/img/MILK DRINKS/Mango Milk.jpg', 'Milk based drink consisting of real fresh ripe mango chunks', ''),
(31, 'Matcha Milk', 'Milk Drinks', 110.00, 120.00, 0.00, 'Available', 'Available', NULL, '/img/MILK DRINKS/Matcha Milk.jpg', 'Milk drink consisting of real fresh strawberry chunks.', ''),
(32, 'Choco Milk', 'Milk Drinks', 110.00, 120.00, 0.00, 'Available', 'Available', NULL, '/img/MILK DRINKS/MILK CHOCO.jpg', 'Comes in Hot or Cold option. Milk drink with natural sweet cocoa.', ''),
(33, 'Pink Lemonade', 'Refreshers', 85.00, 105.00, NULL, 'Available', 'Available', NULL, '/img/REFRESHERS/PINK LEMONADE ICON.jpg', 'Refreshing lemonade beverage with a pink hue.', NULL),
(34, 'Honey Lemonade', 'Refreshers', 85.00, 105.00, NULL, 'Available', 'Available', NULL, '/img/REFRESHERS/HONEY LEMONADE ICON.jpg', 'Refreshing lemonade infused with honey.', NULL),
(35, 'Yoghurt Lemonade', 'Refreshers', 85.00, 105.00, 0.00, 'Available', 'Available', NULL, '/img/REFRESHERS/YOGHURT LEMONADE ICON.jpg', 'Classic yoghurt paired with lemon în a refreshing drink.', ''),
(36, 'Blue Butterfly Pea Lemonade', 'Refreshers', 85.00, 105.00, 0.00, 'Available', 'Available', NULL, '/img/REFRESHERS/BLUE BUTTERFLY PEA LEMONADE ICON.jpg', 'Tea + Lemonade = Heavenly Refreshment Butterflyveedy pea and lemon for a perfect combo.', ''),
(37, 'Cucumber Lemonade', 'Refreshers', 85.00, 105.00, 0.00, 'Available', 'Available', NULL, '/img/REFRESHERS/CUCUMBER LEMONADE ICON.jpg', 'Lemonade and cucumber Lemonadoanddelightfuer and healthy option.', ''),
(38, 'Mango Lemonade', 'Refreshers', 85.00, 105.00, 0.00, 'Available', 'Available', NULL, '/img/REFRESHERS/MANGO LEMONADE ICON.jpg', 'Perfect combo of sweet and sour coming from the ripe mango and lemon.', ''),
(45, 'Lemongrass Chicken', 'Rice Meal', 150.00, 0.00, 0.00, 'Available', 'Not Available', 'Not Available', '/uploads/1743025292_2023-12-27_(1).jpg', 'Roasted chicken thighs marinated in lemongrass & soy sauce', 'Soy sauce (soy)'),
(46, 'Pork katsudon', 'Rice Meal', 150.00, 0.00, 0.00, 'Available', 'Not Available', 'Not Available', '/uploads/1743025490_katsudon.jpg', 'Fried panko-breaded pork cutlet with egg cooked in japanese soy sauce over rice.', 'Sesame and Eggs'),
(47, 'Pork katsu curry', 'Rice Meal', 180.00, 0.00, 0.00, 'Available', 'Not Available', 'Not Available', '/uploads/1743025957_2023-10-11_(2).jpg', 'Crispy breaded pork cutlet served with fragrant Japanese curry and steamed rice.', ''),
(48, 'Chicken katsu curry', 'Rice Meal', 180.00, 0.00, 0.00, 'Available', 'Not Available', 'Not Available', '/uploads/1743025888_2023-10-11.jpg', 'Tender breaded chicken cutlet paired with a mild Japanese curry and fluffy white rice.', ''),
(49, 'Chicken karaage', 'Rice Meal', 130.00, 0.00, 0.00, 'Available', 'Not Available', 'Not Available', '/uploads/1743026083_karaage.jpg', 'Japanese style fried chicken that is crispy and in use of chicken thighs. Partnered with lemon & Japanese mayo.', ''),
(50, 'Aglio Oglio', 'Snacks and Pasta', 150.00, 0.00, 0.00, 'Available', 'Not Available', 'Not Available', '/uploads/1743026558_Aglio_Oglio.jpg', 'Pasta that is stirred in olive oil, garlic, parmesan, chili flakes and parsley.', 'Dairy (Cheese)'),
(51, 'Seafood pasta', 'Snacks and Pasta', 200.00, 0.00, 0.00, 'Available', 'Not Available', 'Not Available', '/uploads/1743026668_2022-11-21_(1).jpg', 'A tomato based pasta that is served with shrimp.', 'Shrimp'),
(52, 'Classic carbonara', 'Snacks and Pasta', 180.00, 0.00, 0.00, 'Available', 'Not Available', 'Not Available', '/uploads/1743026713_2022-11-21_(2).jpg', 'Classic italian carbonara with bacon and egg-parmesan cream.', 'Dairy (Cheese)'),
(53, 'Sausage Penne', 'Snacks and Pasta', 180.00, 0.00, 0.00, 'Available', 'Not Available', 'Not Available', '/uploads/1743026763_sausage_pasta.jpg', 'A spaghetti that is based of tomato and topped with hungarian sausage.', 'Dairy (Milk & Cheese)'),
(54, 'Chicken Pesto Pasta', 'Snacks and Pasta', 200.00, 0.00, 0.00, 'Available', 'Not Available', 'Not Available', '/uploads/1743026808_chicken_pesto_pasta.jpg', 'A pasta that was cooked with basil and topped with chicken.', 'Peanut (Almond) & Dairy (Cheese)'),
(55, 'Fish & Chips', 'Snacks and Pasta', 130.00, 0.00, 0.00, 'Available', 'Not Available', 'Not Available', '/uploads/1743026938_Red_Vintage_Food_New_Menu_Promotion_Instagram_Post.jpg', 'Fish and chips is a hot dish consisting of fried fish in batter, served with chips.', ''),
(58, 'Espresso Shot', 'Classic Coffee', 40.00, 0.00, 0.00, 'Available', 'Not Available', 'Not Available', '/uploads/1743483011_Espresso.jpg', 'Freshly dripped blended dark roast Sagada-Arabica and Robusta Bean. Concentrated to perfection.', '');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orders_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `payment_method` enum('Cash','PayMaya','GCash') NOT NULL DEFAULT 'Cash',
  `shipping_method` enum('Pickup','Delivery') NOT NULL DEFAULT 'Pickup',
  `order_status` enum('Pending','Processing','Out For Delivery','Ready To Pickup','Order Received','Completed','Cancelled') NOT NULL DEFAULT 'Pending',
  `order_feedback` text DEFAULT NULL,
  `feedback_score` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orders_id`, `user_id`, `total_amount`, `created_at`, `payment_method`, `shipping_method`, `order_status`, `order_feedback`, `feedback_score`) VALUES
(102, 9, 260.00, '2025-03-16 06:24:13', 'GCash', 'Pickup', 'Completed', NULL, NULL),
(103, 2, 90.00, '2025-03-16 06:25:23', '', 'Pickup', 'Completed', NULL, NULL),
(104, 2, 240.00, '2025-03-16 07:01:53', 'GCash', 'Pickup', 'Completed', NULL, NULL),
(105, 10, 300.00, '2025-03-16 07:13:24', '', 'Pickup', 'Cancelled', NULL, NULL),
(106, 13, 4860.00, '2025-03-16 07:35:13', 'GCash', '', 'Completed', NULL, NULL),
(107, 6, 120.00, '2025-03-16 08:24:30', 'GCash', 'Delivery', 'Completed', NULL, NULL),
(108, 6, 120.00, '2025-03-16 08:47:05', 'GCash', 'Delivery', 'Cancelled', NULL, NULL),
(109, 6, 120.00, '2025-03-16 08:53:57', 'GCash', 'Delivery', 'Completed', NULL, NULL),
(110, 6, 120.00, '2025-03-16 09:15:39', 'GCash', 'Delivery', 'Completed', NULL, NULL),
(111, 6, 120.00, '2025-03-16 09:22:05', 'GCash', 'Delivery', 'Completed', NULL, NULL),
(112, 6, 120.00, '2025-03-16 09:23:41', 'GCash', 'Delivery', 'Completed', NULL, NULL),
(113, 6, 120.00, '2025-03-16 12:32:47', 'Cash', 'Delivery', 'Completed', NULL, NULL),
(114, 6, 425.00, '2025-03-17 12:42:05', 'Cash', 'Delivery', 'Completed', NULL, NULL),
(115, 6, 120.00, '2025-03-18 05:15:09', 'GCash', 'Delivery', 'Completed', NULL, NULL),
(116, 6, 120.00, '2025-03-18 05:15:53', 'GCash', 'Delivery', 'Completed', NULL, NULL),
(117, 6, 120.00, '2025-03-18 05:17:26', 'GCash', 'Delivery', 'Completed', NULL, NULL),
(118, 2, 120.00, '2025-03-18 15:03:15', 'GCash', 'Pickup', 'Completed', NULL, NULL),
(119, 26, 120.00, '2025-03-19 02:04:27', 'GCash', 'Pickup', 'Completed', NULL, NULL),
(120, 28, 120.00, '2025-03-19 09:40:43', 'GCash', 'Pickup', 'Completed', NULL, NULL),
(121, 28, 1560.00, '2025-03-19 09:52:35', 'Cash', 'Pickup', 'Completed', NULL, NULL),
(122, 28, 120.00, '2025-03-19 09:54:41', 'Cash', 'Pickup', 'Completed', NULL, NULL),
(123, 28, 120.00, '2025-03-19 09:56:43', 'GCash', 'Pickup', 'Completed', NULL, NULL),
(124, 27, 120.00, '2025-03-19 13:56:43', 'PayMaya', 'Delivery', 'Completed', NULL, NULL),
(125, 26, 120.00, '2025-03-23 04:21:40', 'Cash', '', 'Completed', NULL, NULL),
(126, 2, 120.00, '2025-03-23 04:48:50', 'Cash', 'Pickup', 'Completed', NULL, NULL),
(127, 2, 210.00, '2025-03-23 05:06:33', 'Cash', 'Pickup', 'Completed', 'That was delicious.', 4),
(128, 6, 120.00, '2025-03-24 06:48:15', 'Cash', 'Delivery', 'Completed', NULL, NULL),
(129, 6, 110.00, '2025-03-24 07:45:51', 'Cash', 'Pickup', 'Completed', NULL, NULL),
(130, 6, 120.00, '2025-03-24 07:48:37', 'GCash', 'Pickup', 'Completed', 'i did like it', 5),
(131, 2, 320.00, '2025-03-25 10:10:53', 'Cash', 'Pickup', 'Completed', NULL, NULL),
(132, 6, 70.00, '2025-03-25 15:53:52', 'GCash', 'Delivery', 'Completed', NULL, NULL),
(133, 6, 40.00, '2025-03-25 16:05:03', 'GCash', 'Pickup', 'Completed', NULL, NULL),
(134, 2, 70.00, '2025-03-26 10:55:51', 'Cash', 'Pickup', 'Completed', NULL, NULL),
(136, 2, 285.00, '2025-03-26 16:02:08', 'PayMaya', 'Pickup', 'Cancelled', NULL, NULL),
(137, 5, 40.00, '2025-03-28 07:56:51', 'GCash', 'Pickup', 'Completed', NULL, NULL),
(138, 5, 40.00, '2025-03-28 07:56:56', 'GCash', 'Pickup', 'Completed', NULL, NULL),
(139, 25, 70.00, '2025-03-28 08:14:52', 'GCash', 'Pickup', 'Completed', NULL, NULL),
(140, 5, 80.00, '2025-03-28 08:19:44', 'GCash', 'Pickup', 'Completed', NULL, NULL),
(141, 32, 40.00, '2025-03-28 09:14:36', 'Cash', 'Pickup', 'Cancelled', NULL, NULL),
(142, 32, 40.00, '2025-03-28 10:29:23', 'Cash', 'Pickup', 'Cancelled', NULL, NULL),
(143, 24, 160.00, '2025-03-29 02:46:16', 'PayMaya', 'Delivery', 'Pending', NULL, NULL),
(144, 5, 40.00, '2025-03-30 07:28:53', 'GCash', 'Delivery', 'Completed', 'good', 4),
(145, 5, 140.00, '2025-03-30 07:35:08', 'Cash', 'Delivery', 'Pending', NULL, NULL),
(146, 9, 220.00, '2025-03-30 14:54:17', 'GCash', 'Pickup', 'Pending', NULL, NULL),
(147, 26, 130.00, '2025-04-01 03:47:52', 'GCash', 'Delivery', 'Completed', NULL, NULL),
(148, 2, 340.00, '2025-04-02 01:22:51', 'GCash', 'Pickup', 'Completed', 'That was very good!!!!', 5),
(149, 9, 275.00, '2025-04-03 07:09:09', 'GCash', 'Delivery', 'Processing', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order_history`
--

CREATE TABLE `order_history` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `order_details` text NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `location` varchar(255) NOT NULL,
  `status` varchar(50) NOT NULL,
  `shipping_method` enum('Pickup','Delivery') NOT NULL,
  `phone` varchar(222) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_history`
--

INSERT INTO `order_history` (`id`, `order_id`, `customer_name`, `date`, `order_details`, `total`, `location`, `status`, `shipping_method`, `phone`) VALUES
(164, 103, 'Ralph Dagsa', '2025-03-16 06:48:29', '[{\"order_items_id\":129,\"orders_id\":103,\"food_id\":17,\"size\":\"Small\",\"quantity\":1,\"price\":\"90.00\",\"created_at\":\"2025-03-16 06:25:23\",\"food_name\":\"Milk Choco\"}]', 90.00, 'Brgy. Poblacion', 'Completed', 'Pickup', '123123123123'),
(165, 102, 'Christine Lagunero', '2025-03-16 06:51:16', '[{\"order_items_id\":127,\"orders_id\":102,\"food_id\":1,\"size\":\"Medium\",\"quantity\":1,\"price\":\"140.00\",\"created_at\":\"2025-03-16 06:24:13\",\"food_name\":\"Cafe Vienna\"},{\"order_items_id\":128,\"orders_id\":102,\"food_id\":34,\"size\":\"Regular\",\"quantity\":1,\"price\":\"120.00\",\"created_at\":\"2025-03-16 06:24:13\",\"food_name\":\"Chicken Katsu\"}]', 260.00, '23 Callos Comp. Brgy. Sta. Lucia, Pasig City', 'Completed', 'Pickup', '09669267169'),
(166, 106, 'ralphdagsa 123 ralphdagsa 123', '2025-03-16 08:08:05', '[{\"order_items_id\":134,\"orders_id\":106,\"food_id\":34,\"size\":\"Regular\",\"quantity\":6,\"price\":\"120.00\",\"created_at\":\"2025-03-16 07:35:13\",\"food_name\":\"Chicken Katsu\"},{\"order_items_id\":135,\"orders_id\":106,\"food_id\":1,\"size\":\"Small\",\"quantity\":9,\"price\":\"120.00\",\"created_at\":\"2025-03-16 07:35:13\",\"food_name\":\"Cafe Vienna\"},{\"order_items_id\":136,\"orders_id\":106,\"food_id\":17,\"size\":\"Small\",\"quantity\":34,\"price\":\"90.00\",\"created_at\":\"2025-03-16 07:35:13\",\"food_name\":\"Milk Choco\"}]', 4860.00, 'ralphdagsa 123', 'Completed', '', 'ralphdagsa 123'),
(169, 104, 'Ralph Dagsa', '2025-03-16 08:22:59', '[{\"order_items_id\":130,\"orders_id\":104,\"food_id\":1,\"size\":\"Small\",\"quantity\":1,\"price\":\"120.00\",\"created_at\":\"2025-03-16 07:01:53\",\"food_name\":\"Cafe Vienna\"},{\"order_items_id\":131,\"orders_id\":104,\"food_id\":44,\"size\":\"Small\",\"quantity\":1,\"price\":\"120.00\",\"created_at\":\"2025-03-16 07:01:53\",\"food_name\":\"Affogato\"}]', 240.00, 'Brgy. Poblacion', 'Completed', 'Pickup', '123123123123'),
(170, 107, 'Mark Angelo Gerodiaz', '2025-03-16 08:25:39', '[{\"order_items_id\":137,\"orders_id\":107,\"food_id\":1,\"size\":\"Small\",\"quantity\":1,\"price\":\"120.00\",\"created_at\":\"2025-03-16 08:24:30\",\"food_name\":\"Cafe Vienna\"}]', 120.00, 'Pembo Taguig city', 'Completed', 'Delivery', '09098318985'),
(171, 108, 'Mark Angelo Gerodiaz', '2025-03-16 08:48:20', '[{\"order_items_id\":138,\"orders_id\":108,\"food_id\":1,\"size\":\"Small\",\"quantity\":1,\"price\":\"120.00\",\"created_at\":\"2025-03-16 08:47:05\",\"food_name\":\"Cafe Vienna\"}]', 120.00, 'Pembo Taguig city', 'Cancelled', 'Delivery', '09098318985'),
(172, 109, 'Mark Angelo Gerodiaz', '2025-03-16 08:55:38', '[{\"order_items_id\":139,\"orders_id\":109,\"food_id\":1,\"size\":\"Small\",\"quantity\":1,\"price\":\"120.00\",\"created_at\":\"2025-03-16 08:53:57\",\"food_name\":\"Cafe Vienna\"}]', 120.00, 'Pembo Taguig city', 'Completed', 'Delivery', '09098318985'),
(173, 105, 'Ryu Villota', '2025-03-16 08:57:45', '[{\"order_items_id\":132,\"orders_id\":105,\"food_id\":1,\"size\":\"Medium\",\"quantity\":1,\"price\":\"140.00\",\"created_at\":\"2025-03-16 07:13:24\",\"food_name\":\"Cafe Vienna\"},{\"order_items_id\":133,\"orders_id\":105,\"food_id\":34,\"size\":\"Extra Large\",\"quantity\":1,\"price\":\"160.00\",\"created_at\":\"2025-03-16 07:13:24\",\"food_name\":\"Chicken Katsu\"}]', 300.00, 'Villacuana 2 Pasig City', 'Cancelled', 'Pickup', '09914853131'),
(177, 111, 'Mark Angelo Gerodiaz', '2025-03-16 09:22:41', '[{\"order_items_id\":141,\"orders_id\":111,\"food_id\":1,\"size\":\"Small\",\"quantity\":1,\"price\":\"120.00\",\"created_at\":\"2025-03-16 09:22:05\",\"food_name\":\"Cafe Vienna\"}]', 120.00, 'Pembo Taguig city', 'Completed', 'Delivery', '09098318985'),
(178, 105, 'Ryu Villota', '2025-03-16 10:34:59', '[{\"order_items_id\":132,\"orders_id\":105,\"food_id\":1,\"size\":\"Medium\",\"quantity\":1,\"price\":\"140.00\",\"created_at\":\"2025-03-16 07:13:24\",\"food_name\":\"Cafe Vienna\"},{\"order_items_id\":133,\"orders_id\":105,\"food_id\":34,\"size\":\"Extra Large\",\"quantity\":1,\"price\":\"160.00\",\"created_at\":\"2025-03-16 07:13:24\",\"food_name\":\"Chicken Katsu\"}]', 300.00, 'Villacuana 2 Pasig City', 'Cancelled', 'Pickup', '09914853131'),
(179, 112, 'Mark Angelo Gerodiaz', '2025-03-16 10:52:03', '[{\"order_items_id\":142,\"orders_id\":112,\"food_id\":1,\"size\":\"Small\",\"quantity\":1,\"price\":\"120.00\",\"created_at\":\"2025-03-16 09:23:41\",\"food_name\":\"Cafe Vienna\"}]', 120.00, 'Pembo Taguig city', 'Completed', 'Delivery', '09098318985'),
(180, 110, 'Mark Angelo Gerodiaz', '2025-03-16 10:52:44', '[{\"order_items_id\":140,\"orders_id\":110,\"food_id\":1,\"size\":\"Small\",\"quantity\":1,\"price\":\"120.00\",\"created_at\":\"2025-03-16 09:15:39\",\"food_name\":\"Cafe Vienna\"}]', 120.00, 'Pembo Taguig city', 'Completed', 'Delivery', '09098318985'),
(181, 111, 'Mark Angelo Gerodiaz', '2025-03-16 10:56:31', '[{\"order_items_id\":141,\"orders_id\":111,\"food_id\":1,\"size\":\"Small\",\"quantity\":1,\"price\":\"120.00\",\"created_at\":\"2025-03-16 09:22:05\",\"food_name\":\"Cafe Vienna\"}]', 120.00, 'Pembo Taguig city', 'Completed', 'Delivery', '09098318985'),
(182, 112, 'Mark Angelo Gerodiaz', '2025-03-16 14:41:22', '[{\"order_items_id\":142,\"orders_id\":112,\"food_id\":1,\"size\":\"Small\",\"quantity\":1,\"price\":\"120.00\",\"created_at\":\"2025-03-16 09:23:41\",\"food_name\":\"Cafe Vienna\"}]', 120.00, 'Pembo Taguig city', 'Completed', 'Delivery', '09098318985'),
(183, 113, 'Mark Angelo Gerodiaz', '2025-03-16 14:41:22', '[{\"order_items_id\":143,\"orders_id\":113,\"food_id\":1,\"size\":\"Small\",\"quantity\":1,\"price\":\"120.00\",\"created_at\":\"2025-03-16 12:32:47\",\"food_name\":\"Cafe Vienna\"}]', 120.00, 'Pembo Taguig city', 'Completed', 'Delivery', '09098318985'),
(184, 110, 'Mark Angelo Gerodiaz', '2025-03-16 14:41:22', '[{\"order_items_id\":140,\"orders_id\":110,\"food_id\":1,\"size\":\"Small\",\"quantity\":1,\"price\":\"120.00\",\"created_at\":\"2025-03-16 09:15:39\",\"food_name\":\"Cafe Vienna\"}]', 120.00, 'Pembo Taguig city', 'Completed', 'Delivery', '09098318985'),
(185, 114, 'Mark Angelo Gerodiaz', '2025-03-18 00:07:27', '[{\"order_items_id\":144,\"orders_id\":114,\"food_id\":44,\"size\":\"Large\",\"quantity\":1,\"price\":\"140.00\",\"created_at\":\"2025-03-17 12:42:05\",\"food_name\":\"Affogato\"},{\"order_items_id\":145,\"orders_id\":114,\"food_id\":34,\"size\":\"Extra Large\",\"quantity\":1,\"price\":\"160.00\",\"created_at\":\"2025-03-17 12:42:05\",\"food_name\":\"Chicken Katsu\"},{\"order_items_id\":146,\"orders_id\":114,\"food_id\":3,\"size\":\"Medium\",\"quantity\":1,\"price\":\"125.00\",\"created_at\":\"2025-03-17 12:42:05\",\"food_name\":\"Caramel Macchiato\"}]', 425.00, 'Pembo Taguig city', 'Completed', 'Delivery', '09098318985'),
(186, 113, 'Mark Angelo Gerodiaz', '2025-03-18 00:07:42', '[{\"order_items_id\":143,\"orders_id\":113,\"food_id\":1,\"size\":\"Small\",\"quantity\":1,\"price\":\"120.00\",\"created_at\":\"2025-03-16 12:32:47\",\"food_name\":\"Cafe Vienna\"}]', 120.00, 'Pembo Taguig city', 'Completed', 'Delivery', '09098318985'),
(187, 111, 'Mark Angelo Gerodiaz', '2025-03-18 00:07:42', '[{\"order_items_id\":141,\"orders_id\":111,\"food_id\":1,\"size\":\"Small\",\"quantity\":1,\"price\":\"120.00\",\"created_at\":\"2025-03-16 09:22:05\",\"food_name\":\"Cafe Vienna\"}]', 120.00, 'Pembo Taguig city', 'Completed', 'Delivery', '09098318985'),
(189, 109, 'Mark Angelo Gerodiaz', '2025-03-18 00:07:42', '[{\"order_items_id\":139,\"orders_id\":109,\"food_id\":1,\"size\":\"Small\",\"quantity\":1,\"price\":\"120.00\",\"created_at\":\"2025-03-16 08:53:57\",\"food_name\":\"Cafe Vienna\"}]', 120.00, 'Pembo Taguig city', 'Completed', 'Delivery', '09098318985'),
(190, 110, 'Mark Angelo Gerodiaz', '2025-03-18 00:07:42', '[{\"order_items_id\":140,\"orders_id\":110,\"food_id\":1,\"size\":\"Small\",\"quantity\":1,\"price\":\"120.00\",\"created_at\":\"2025-03-16 09:15:39\",\"food_name\":\"Cafe Vienna\"}]', 120.00, 'Pembo Taguig city', 'Completed', 'Delivery', '09098318985'),
(199, 103, 'Ralph Dagsa', '2025-03-18 00:07:42', '[{\"order_items_id\":129,\"orders_id\":103,\"food_id\":17,\"size\":\"Small\",\"quantity\":1,\"price\":\"90.00\",\"created_at\":\"2025-03-16 06:25:23\",\"food_name\":\"Milk Choco\"}]', 90.00, 'Brgy. Poblacion', 'Completed', 'Pickup', '123123123123'),
(203, 102, 'Christine Lagunero', '2025-03-18 00:07:42', '[{\"order_items_id\":127,\"orders_id\":102,\"food_id\":1,\"size\":\"Medium\",\"quantity\":1,\"price\":\"140.00\",\"created_at\":\"2025-03-16 06:24:13\",\"food_name\":\"Cafe Vienna\"},{\"order_items_id\":128,\"orders_id\":102,\"food_id\":34,\"size\":\"Regular\",\"quantity\":1,\"price\":\"120.00\",\"created_at\":\"2025-03-16 06:24:13\",\"food_name\":\"Chicken Katsu\"}]', 260.00, '23 Callos Comp. Brgy. Sta. Lucia, Pasig City', 'Completed', 'Pickup', '09669267169'),
(204, 104, 'Ralph Dagsa', '2025-03-18 00:07:42', '[{\"order_items_id\":130,\"orders_id\":104,\"food_id\":1,\"size\":\"Small\",\"quantity\":1,\"price\":\"120.00\",\"created_at\":\"2025-03-16 07:01:53\",\"food_name\":\"Cafe Vienna\"},{\"order_items_id\":131,\"orders_id\":104,\"food_id\":44,\"size\":\"Small\",\"quantity\":1,\"price\":\"120.00\",\"created_at\":\"2025-03-16 07:01:53\",\"food_name\":\"Affogato\"}]', 240.00, 'Brgy. Poblacion', 'Completed', 'Pickup', '123123123123'),
(205, 112, 'Mark Angelo Gerodiaz', '2025-03-18 00:07:42', '[{\"order_items_id\":142,\"orders_id\":112,\"food_id\":1,\"size\":\"Small\",\"quantity\":1,\"price\":\"120.00\",\"created_at\":\"2025-03-16 09:23:41\",\"food_name\":\"Cafe Vienna\"}]', 120.00, 'Pembo Taguig city', 'Completed', 'Delivery', '09098318985'),
(206, 108, 'Mark Angelo Gerodiaz', '2025-03-18 00:07:42', '[{\"order_items_id\":138,\"orders_id\":108,\"food_id\":1,\"size\":\"Small\",\"quantity\":1,\"price\":\"120.00\",\"created_at\":\"2025-03-16 08:47:05\",\"food_name\":\"Cafe Vienna\"}]', 120.00, 'Pembo Taguig city', 'Cancelled', 'Delivery', '09098318985'),
(207, 106, 'ralphdagsa 123 ralphdagsa 123', '2025-03-18 00:07:42', '[{\"order_items_id\":134,\"orders_id\":106,\"food_id\":34,\"size\":\"Regular\",\"quantity\":6,\"price\":\"120.00\",\"created_at\":\"2025-03-16 07:35:13\",\"food_name\":\"Chicken Katsu\"},{\"order_items_id\":135,\"orders_id\":106,\"food_id\":1,\"size\":\"Small\",\"quantity\":9,\"price\":\"120.00\",\"created_at\":\"2025-03-16 07:35:13\",\"food_name\":\"Cafe Vienna\"},{\"order_items_id\":136,\"orders_id\":106,\"food_id\":17,\"size\":\"Small\",\"quantity\":34,\"price\":\"90.00\",\"created_at\":\"2025-03-16 07:35:13\",\"food_name\":\"Milk Choco\"}]', 4860.00, 'ralphdagsa 123', 'Completed', '', 'ralphdagsa 123'),
(208, 107, 'Mark Angelo Gerodiaz', '2025-03-18 00:07:42', '[{\"order_items_id\":137,\"orders_id\":107,\"food_id\":1,\"size\":\"Small\",\"quantity\":1,\"price\":\"120.00\",\"created_at\":\"2025-03-16 08:24:30\",\"food_name\":\"Cafe Vienna\"}]', 120.00, 'Pembo Taguig city', 'Completed', 'Delivery', '09098318985'),
(209, 105, 'Ryu Villota', '2025-03-18 00:07:42', '[{\"order_items_id\":132,\"orders_id\":105,\"food_id\":1,\"size\":\"Medium\",\"quantity\":1,\"price\":\"140.00\",\"created_at\":\"2025-03-16 07:13:24\",\"food_name\":\"Cafe Vienna\"},{\"order_items_id\":133,\"orders_id\":105,\"food_id\":34,\"size\":\"Extra Large\",\"quantity\":1,\"price\":\"160.00\",\"created_at\":\"2025-03-16 07:13:24\",\"food_name\":\"Chicken Katsu\"}]', 300.00, 'Villacuana 2 Pasig City', 'Cancelled', 'Pickup', '09914853131'),
(210, 114, 'Mark Angelo Gerodiaz', '2025-03-18 02:23:21', '[{\"order_items_id\":144,\"orders_id\":114,\"food_id\":44,\"size\":\"Large\",\"quantity\":1,\"price\":\"140.00\",\"created_at\":\"2025-03-17 12:42:05\",\"food_name\":\"Affogato\"},{\"order_items_id\":145,\"orders_id\":114,\"food_id\":34,\"size\":\"Extra Large\",\"quantity\":1,\"price\":\"160.00\",\"created_at\":\"2025-03-17 12:42:05\",\"food_name\":\"Chicken Katsu\"},{\"order_items_id\":146,\"orders_id\":114,\"food_id\":3,\"size\":\"Medium\",\"quantity\":1,\"price\":\"125.00\",\"created_at\":\"2025-03-17 12:42:05\",\"food_name\":\"Caramel Macchiato\"}]', 425.00, 'Pembo Taguig city', 'Completed', 'Delivery', '09098318985'),
(211, 118, 'Ralph Dagsa', '2025-03-19 02:03:36', '[{\"order_items_id\":150,\"orders_id\":118,\"food_id\":34,\"size\":\"Regular\",\"quantity\":1,\"price\":\"120.00\",\"created_at\":\"2025-03-18 15:03:15\",\"food_name\":\"Chicken Katsu\"}]', 120.00, 'Brgy. Poblacion', 'Completed', 'Pickup', '123123123123'),
(212, 115, 'Mark Angelo Gerodiaz', '2025-03-19 02:03:36', '[{\"order_items_id\":147,\"orders_id\":115,\"food_id\":1,\"size\":\"Small\",\"quantity\":1,\"price\":\"120.00\",\"created_at\":\"2025-03-18 05:15:09\",\"food_name\":\"Cafe Vienna\"}]', 120.00, 'Pembo Taguig city', 'Completed', 'Delivery', '09098318985'),
(213, 117, 'Mark Angelo Gerodiaz', '2025-03-19 02:03:36', '[{\"order_items_id\":149,\"orders_id\":117,\"food_id\":1,\"size\":\"Small\",\"quantity\":1,\"price\":\"120.00\",\"created_at\":\"2025-03-18 05:17:26\",\"food_name\":\"Cafe Vienna\"}]', 120.00, 'Pembo Taguig city', 'Completed', 'Delivery', '09098318985'),
(214, 116, 'Mark Angelo Gerodiaz', '2025-03-19 02:03:36', '[{\"order_items_id\":148,\"orders_id\":116,\"food_id\":1,\"size\":\"Small\",\"quantity\":1,\"price\":\"120.00\",\"created_at\":\"2025-03-18 05:15:53\",\"food_name\":\"Cafe Vienna\"}]', 120.00, 'Pembo Taguig city', 'Completed', 'Delivery', '09098318985'),
(215, 118, 'Ralph Dagsa', '2025-03-19 02:08:37', '[{\"order_items_id\":150,\"orders_id\":118,\"food_id\":34,\"size\":\"Regular\",\"quantity\":1,\"price\":\"120.00\",\"created_at\":\"2025-03-18 15:03:15\",\"food_name\":\"Chicken Katsu\"}]', 120.00, 'Brgy. Poblacion', 'Completed', 'Pickup', '123123123123'),
(216, 119, 'GERODIAZ MARK ANGELO', '2025-03-19 02:10:38', '[{\"order_items_id\":151,\"orders_id\":119,\"food_id\":1,\"size\":\"Small\",\"quantity\":1,\"price\":\"120.00\",\"created_at\":\"2025-03-19 02:04:27\",\"food_name\":\"Cafe Vienna\"}]', 120.00, '', 'Completed', 'Pickup', ''),
(217, 122, 'BIARENCE GWENJEF LEONOR', '2025-03-25 05:35:58', '[{\"order_items_id\":154,\"orders_id\":122,\"food_id\":1,\"size\":\"Small\",\"quantity\":1,\"price\":\"120.00\",\"created_at\":\"2025-03-19 09:54:41\",\"food_name\":\"Cafe Vienna\"}]', 120.00, '', 'Completed', 'Pickup', ''),
(218, 130, 'Mark Angelo Gerodiaz', '2025-03-25 05:35:58', '[{\"order_items_id\":163,\"orders_id\":130,\"food_id\":1,\"size\":\"Small\",\"quantity\":1,\"price\":\"120.00\",\"created_at\":\"2025-03-24 07:48:37\",\"food_name\":\"Cafe Vienna\"}]', 120.00, 'Pembo Taguig city', 'Completed', 'Pickup', '09098318985'),
(219, 125, 'GERODIAZ MARK ANGELO', '2025-03-25 05:35:58', '[{\"order_items_id\":157,\"orders_id\":125,\"food_id\":1,\"size\":\"Small\",\"quantity\":1,\"price\":\"120.00\",\"created_at\":\"2025-03-23 04:21:40\",\"food_name\":\"Cafe Vienna\"}]', 120.00, '', 'Completed', '', ''),
(220, 123, 'BIARENCE GWENJEF LEONOR', '2025-03-25 05:35:58', '[{\"order_items_id\":155,\"orders_id\":123,\"food_id\":1,\"size\":\"Small\",\"quantity\":1,\"price\":\"120.00\",\"created_at\":\"2025-03-19 09:56:43\",\"food_name\":\"Cafe Vienna\"}]', 120.00, '', 'Completed', 'Pickup', ''),
(221, 126, 'Ralph Dagsa', '2025-03-25 05:35:58', '[{\"order_items_id\":158,\"orders_id\":126,\"food_id\":1,\"size\":\"Small\",\"quantity\":1,\"price\":\"120.00\",\"created_at\":\"2025-03-23 04:48:50\",\"food_name\":\"Cafe Vienna\"}]', 120.00, 'Brgy. Poblacion', 'Completed', 'Pickup', '09936540896'),
(222, 120, 'BIARENCE GWENJEF LEONOR', '2025-03-25 05:35:58', '[{\"order_items_id\":152,\"orders_id\":120,\"food_id\":1,\"size\":\"Small\",\"quantity\":1,\"price\":\"120.00\",\"created_at\":\"2025-03-19 09:40:43\",\"food_name\":\"Cafe Vienna\"}]', 120.00, '', 'Completed', 'Pickup', ''),
(223, 121, 'BIARENCE GWENJEF LEONOR', '2025-03-25 05:35:58', '[{\"order_items_id\":153,\"orders_id\":121,\"food_id\":1,\"size\":\"Small\",\"quantity\":13,\"price\":\"120.00\",\"created_at\":\"2025-03-19 09:52:35\",\"food_name\":\"Cafe Vienna\"}]', 1560.00, '', 'Completed', 'Pickup', ''),
(224, 129, 'Mark Angelo Gerodiaz', '2025-03-25 05:35:58', '[{\"order_items_id\":162,\"orders_id\":129,\"food_id\":3,\"size\":\"Small\",\"quantity\":1,\"price\":\"110.00\",\"created_at\":\"2025-03-24 07:45:51\",\"food_name\":\"Caramel Macchiato\"}]', 110.00, 'Pembo Taguig city', 'Completed', 'Pickup', '09098318985'),
(225, 127, 'Ralph Dagsa', '2025-03-25 05:35:58', '[{\"order_items_id\":159,\"orders_id\":127,\"food_id\":34,\"size\":\"Regular\",\"quantity\":1,\"price\":\"120.00\",\"created_at\":\"2025-03-23 05:06:33\",\"food_name\":\"Chicken Katsu\"},{\"order_items_id\":160,\"orders_id\":127,\"food_id\":17,\"size\":\"Small\",\"quantity\":1,\"price\":\"90.00\",\"created_at\":\"2025-03-23 05:06:33\",\"food_name\":\"Milk Choco\"}]', 210.00, 'Brgy. Poblacion', 'Completed', 'Pickup', '09936540896'),
(226, 124, 'Mark Angelo Gerodiaz', '2025-03-25 05:35:58', '[{\"order_items_id\":156,\"orders_id\":124,\"food_id\":1,\"size\":\"Small\",\"quantity\":1,\"price\":\"120.00\",\"created_at\":\"2025-03-19 13:56:43\",\"food_name\":\"Cafe Vienna\"}]', 120.00, '55 Guadalupe Taguig City', 'Completed', 'Delivery', ''),
(227, 128, 'Mark Angelo Gerodiaz', '2025-03-25 05:35:58', '[{\"order_items_id\":161,\"orders_id\":128,\"food_id\":1,\"size\":\"Small\",\"quantity\":1,\"price\":\"120.00\",\"created_at\":\"2025-03-24 06:48:15\",\"food_name\":\"Cafe Vienna\"}]', 120.00, 'Pembo Taguig city', 'Completed', 'Delivery', '09098318985'),
(228, 131, 'Ralph Dagsa', '2025-03-26 12:49:10', '[{\"order_items_id\":164,\"orders_id\":131,\"food_id\":34,\"size\":\"Medium\",\"quantity\":1,\"price\":\"105.00\",\"created_at\":\"2025-03-25 10:10:53\",\"food_name\":\"Honey Lemonade\"},{\"order_items_id\":165,\"orders_id\":131,\"food_id\":33,\"size\":\"Medium\",\"quantity\":1,\"price\":\"105.00\",\"created_at\":\"2025-03-25 10:10:53\",\"food_name\":\"Pink Lemonade\"},{\"order_items_id\":166,\"orders_id\":131,\"food_id\":27,\"size\":\"Small\",\"quantity\":1,\"price\":\"110.00\",\"created_at\":\"2025-03-25 10:10:53\",\"food_name\":\"Choco Loco\"}]', 320.00, 'Brgy. Poblacion', 'Completed', 'Pickup', '09936540896'),
(229, 133, 'Mark Angelo Gerodiaz', '2025-03-26 12:49:10', '[{\"order_items_id\":168,\"orders_id\":133,\"food_id\":1,\"size\":\"Small\",\"quantity\":1,\"price\":\"40.00\",\"created_at\":\"2025-03-25 16:05:03\",\"food_name\":\"Espresso Shot\"}]', 40.00, 'Pembo Taguig city', 'Completed', 'Pickup', '09098318985'),
(230, 134, 'Ralph Dagsa', '2025-03-26 12:49:10', '[{\"order_items_id\":169,\"orders_id\":134,\"food_id\":2,\"size\":\"Small\",\"quantity\":1,\"price\":\"70.00\",\"created_at\":\"2025-03-26 10:55:51\",\"food_name\":\"Brewed Coffee\"}]', 70.00, 'Brgy. Poblacion', 'Completed', 'Pickup', '09936540896'),
(231, 132, 'Mark Angelo Gerodiaz', '2025-03-26 12:49:10', '[{\"order_items_id\":167,\"orders_id\":132,\"food_id\":2,\"size\":\"Small\",\"quantity\":1,\"price\":\"70.00\",\"created_at\":\"2025-03-25 15:53:52\",\"food_name\":\"Brewed Coffee\"}]', 70.00, 'Pembo Taguig city', 'Completed', 'Delivery', '09098318985'),
(233, 139, 'Ligaya Lagunero', '2025-03-28 09:10:53', '[{\"order_items_id\":197,\"orders_id\":139,\"food_id\":2,\"size\":\"Small\",\"quantity\":1,\"price\":\"70.00\",\"created_at\":\"2025-03-28 08:14:52\",\"food_name\":\"Brewed Coffee\"}]', 70.00, '23 Callios Compound Brgy. Sta. Lucia', 'Completed', 'Pickup', '09669267169'),
(234, 137, 'mark angelo gerodiaz', '2025-03-28 09:10:53', '[{\"order_items_id\":195,\"orders_id\":137,\"food_id\":1,\"size\":\"Small\",\"quantity\":1,\"price\":\"40.00\",\"created_at\":\"2025-03-28 07:56:51\",\"food_name\":\"Espresso Shot\"}]', 40.00, 'Taguig city', 'Completed', 'Pickup', '09098318985'),
(235, 136, 'Ralph Dagsa', '2025-03-28 09:10:53', '[{\"order_items_id\":193,\"orders_id\":136,\"food_id\":22,\"size\":\"Small\",\"quantity\":1,\"price\":\"150.00\",\"created_at\":\"2025-03-26 16:02:08\",\"food_name\":\"Dark Choco Mocha\"},{\"order_items_id\":194,\"orders_id\":136,\"food_id\":10,\"size\":\"Medium\",\"quantity\":1,\"price\":\"135.00\",\"created_at\":\"2025-03-26 16:02:08\",\"food_name\":\"Caramel Macchiato\"}]', 285.00, 'Brgy. Poblacion', 'Cancelled', 'Pickup', '09936540896'),
(236, 138, 'mark angelo gerodiaz', '2025-03-28 09:10:53', '[{\"order_items_id\":196,\"orders_id\":138,\"food_id\":1,\"size\":\"Small\",\"quantity\":1,\"price\":\"40.00\",\"created_at\":\"2025-03-28 07:56:56\",\"food_name\":\"Espresso Shot\"}]', 40.00, 'Taguig city', 'Completed', 'Pickup', '09098318985'),
(237, 140, 'mark angelo gerodiaz', '2025-03-28 09:10:53', '[{\"order_items_id\":198,\"orders_id\":140,\"food_id\":2,\"size\":\"Medium\",\"quantity\":1,\"price\":\"80.00\",\"created_at\":\"2025-03-28 08:19:44\",\"food_name\":\"Brewed Coffee\"}]', 80.00, 'Taguig city', 'Completed', 'Pickup', '09098318985'),
(238, 142, 'alexander usyk', '2025-03-28 11:10:46', '[{\"order_items_id\":200,\"orders_id\":142,\"food_id\":1,\"size\":\"Small\",\"quantity\":1,\"price\":\"40.00\",\"created_at\":\"2025-03-28 10:29:23\",\"food_name\":\"Espresso Shot\"}]', 40.00, '55 blk 19 addition hills taguig city', 'Cancelled', 'Pickup', '09694059622'),
(239, 141, 'alexander usyk', '2025-03-28 11:10:47', '[{\"order_items_id\":199,\"orders_id\":141,\"food_id\":1,\"size\":\"Small\",\"quantity\":1,\"price\":\"40.00\",\"created_at\":\"2025-03-28 09:14:36\",\"food_name\":\"Espresso Shot\"}]', 40.00, '55 blk 19 addition hills taguig city', 'Cancelled', 'Pickup', '09694059622'),
(240, 144, 'mark angelo gerodiaz', '2025-03-30 07:31:44', '[{\"order_items_id\":202,\"orders_id\":144,\"food_id\":1,\"size\":\"Small\",\"quantity\":1,\"price\":\"40.00\",\"created_at\":\"2025-03-30 07:28:53\",\"food_name\":\"Espresso Shot\"}]', 40.00, 'Taguig city', 'Completed', 'Delivery', '09098318985'),
(241, 147, 'GERODIAZ MARK ANGELO', '2025-04-01 03:51:04', '[{\"order_items_id\":206,\"orders_id\":147,\"food_id\":1,\"size\":\"Small\",\"quantity\":1,\"price\":\"40.00\",\"created_at\":\"2025-04-01 03:47:52\",\"food_name\":\"Espresso Shot\"},{\"order_items_id\":207,\"orders_id\":147,\"food_id\":3,\"size\":\"Small\",\"quantity\":1,\"price\":\"90.00\",\"created_at\":\"2025-04-01 03:47:52\",\"food_name\":\"Americano\"}]', 130.00, '55 blk 19 addition hills taguig city', 'Completed', 'Delivery', '09129182007'),
(242, 148, 'Ralph Dagsa', '2025-04-02 01:29:47', '[{\"order_items_id\":208,\"orders_id\":148,\"food_id\":21,\"size\":\"Medium\",\"quantity\":1,\"price\":\"160.00\",\"created_at\":\"2025-04-02 01:22:51\",\"food_name\":\"White Choco Mocha\"},{\"order_items_id\":209,\"orders_id\":148,\"food_id\":48,\"size\":\"Regular\",\"quantity\":1,\"price\":\"180.00\",\"created_at\":\"2025-04-02 01:22:51\",\"food_name\":\"Chicken katsu curry\"}]', 340.00, 'Brgy. Poblacion', 'Completed', 'Pickup', '09936540896');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `order_items_id` int(11) NOT NULL,
  `orders_id` int(11) NOT NULL,
  `food_id` int(11) NOT NULL,
  `size` enum('Small','Medium','Large','Regular','Extra Large') NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`order_items_id`, `orders_id`, `food_id`, `size`, `quantity`, `price`, `created_at`) VALUES
(164, 131, 34, 'Medium', 1, 105.00, '2025-03-25 10:10:53'),
(165, 131, 33, 'Medium', 1, 105.00, '2025-03-25 10:10:53'),
(166, 131, 27, 'Small', 1, 110.00, '2025-03-25 10:10:53'),
(167, 132, 2, 'Small', 1, 70.00, '2025-03-25 15:53:52'),
(169, 134, 2, 'Small', 1, 70.00, '2025-03-26 10:55:51'),
(193, 136, 22, 'Small', 1, 150.00, '2025-03-26 16:02:08'),
(194, 136, 10, 'Medium', 1, 135.00, '2025-03-26 16:02:08'),
(197, 139, 2, 'Small', 1, 70.00, '2025-03-28 08:14:52'),
(198, 140, 2, 'Medium', 1, 80.00, '2025-03-28 08:19:44'),
(201, 143, 23, 'Medium', 1, 160.00, '2025-03-29 02:46:16'),
(203, 145, 2, 'Small', 2, 70.00, '2025-03-30 07:35:08'),
(204, 146, 2, 'Small', 1, 70.00, '2025-03-30 14:54:17'),
(205, 146, 46, 'Regular', 1, 150.00, '2025-03-30 14:54:17'),
(207, 147, 3, 'Small', 1, 90.00, '2025-04-01 03:47:52'),
(208, 148, 21, 'Medium', 1, 160.00, '2025-04-02 01:22:51'),
(209, 148, 48, 'Regular', 1, 180.00, '2025-04-02 01:22:51'),
(210, 149, 6, 'Medium', 1, 125.00, '2025-04-03 07:09:09'),
(211, 149, 46, 'Regular', 1, 150.00, '2025-04-03 07:09:09');

-- --------------------------------------------------------

--
-- Table structure for table `points_history`
--

CREATE TABLE `points_history` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `points_earned` decimal(10,2) DEFAULT 0.00,
  `points_used` decimal(10,2) DEFAULT 0.00,
  `transaction_date` timestamp NULL DEFAULT current_timestamp(),
  `notes` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `points_history`
--

INSERT INTO `points_history` (`id`, `user_id`, `order_id`, `points_earned`, `points_used`, `transaction_date`, `notes`) VALUES
(1, 2, NULL, 0.20, 0.00, '2025-03-11 16:18:05', 'Points earned from order #86'),
(2, 6, NULL, 0.30, 0.00, '2025-03-12 02:09:41', 'Points earned from order #87'),
(3, 6, NULL, 1.20, 0.00, '2025-03-12 02:16:48', 'Points earned from order #88'),
(4, 6, NULL, 0.60, 0.00, '2025-03-12 12:23:50', 'Points earned from order #89'),
(5, 6, NULL, 0.30, 0.00, '2025-03-12 13:09:32', 'Points earned from order #90'),
(6, 6, NULL, 0.30, 0.00, '2025-03-12 13:15:39', 'Points earned from order #91'),
(7, 6, NULL, 0.20, 0.00, '2025-03-12 13:17:42', 'Points earned from order #92'),
(8, 6, NULL, 0.20, 0.00, '2025-03-12 13:30:37', 'Points earned from order #93'),
(9, 6, NULL, 0.30, 0.00, '2025-03-12 13:33:08', 'Points earned from order #94'),
(10, 6, NULL, 0.20, 0.00, '2025-03-12 13:37:59', 'Points earned from order #95'),
(11, 6, NULL, 0.60, 0.00, '2025-03-12 13:46:40', 'Points earned from order #96'),
(12, 6, NULL, 0.30, 0.00, '2025-03-12 13:49:12', 'Points earned from order #97'),
(13, 5, NULL, 0.30, 0.00, '2025-03-14 04:27:51', 'Points earned from order #98'),
(14, 5, NULL, 0.30, 0.00, '2025-03-14 14:25:06', 'Points earned from order #99'),
(15, 5, NULL, 0.30, 0.00, '2025-03-14 14:25:06', 'Points earned from order #100'),
(16, 5, NULL, 0.20, 0.00, '2025-03-15 15:51:21', 'Points earned from order #101'),
(17, 9, 102, 0.60, 0.00, '2025-03-16 06:24:13', 'Points earned from order #102'),
(18, 2, 103, 0.20, 0.00, '2025-03-16 06:25:23', 'Points earned from order #103'),
(19, 2, 104, 0.60, 0.00, '2025-03-16 07:01:53', 'Points earned from order #104'),
(20, 10, 105, 0.70, 0.00, '2025-03-16 07:13:24', 'Points earned from order #105'),
(21, 13, 106, 12.10, 0.00, '2025-03-16 07:35:13', 'Points earned from order #106'),
(22, 6, 107, 0.30, 0.00, '2025-03-16 08:24:30', 'Points earned from order #107'),
(23, 6, 108, 0.30, 0.00, '2025-03-16 08:47:05', 'Points earned from order #108'),
(24, 6, 109, 0.30, 0.00, '2025-03-16 08:53:57', 'Points earned from order #109'),
(25, 6, 110, 0.30, 0.00, '2025-03-16 09:15:39', 'Points earned from order #110'),
(26, 6, 111, 0.30, 0.00, '2025-03-16 09:22:05', 'Points earned from order #111'),
(27, 6, 112, 0.30, 0.00, '2025-03-16 09:23:41', 'Points earned from order #112'),
(28, 6, 113, 0.30, 0.00, '2025-03-16 12:32:47', 'Points earned from order #113'),
(29, 6, 114, 1.00, 0.00, '2025-03-17 12:42:05', 'Points earned from order #114'),
(30, 6, 115, 0.30, 0.00, '2025-03-18 05:15:09', 'Points earned from order #115'),
(31, 6, 116, 0.30, 0.00, '2025-03-18 05:15:53', 'Points earned from order #116'),
(32, 6, 117, 0.30, 0.00, '2025-03-18 05:17:26', 'Points earned from order #117'),
(33, 2, 118, 0.30, 0.00, '2025-03-18 15:03:15', 'Points earned from order #118'),
(34, 26, 119, 0.30, 0.00, '2025-03-19 02:04:27', 'Points earned from order #119'),
(35, 28, 120, 0.30, 0.00, '2025-03-19 09:40:43', 'Points earned from order #120'),
(36, 28, 121, 3.90, 0.00, '2025-03-19 09:52:35', 'Points earned from order #121'),
(37, 28, 122, 0.30, 0.00, '2025-03-19 09:54:41', 'Points earned from order #122'),
(38, 28, 123, 0.30, 0.00, '2025-03-19 09:56:43', 'Points earned from order #123'),
(39, 27, 124, 0.30, 0.00, '2025-03-19 13:56:43', 'Points earned from order #124'),
(40, 26, 125, 0.30, 0.00, '2025-03-23 04:21:40', 'Points earned from order #125'),
(41, 2, 126, 0.30, 0.00, '2025-03-23 04:48:50', 'Points earned from order #126'),
(42, 2, 127, 0.50, 0.00, '2025-03-23 05:06:33', 'Points earned from order #127'),
(43, 6, 128, 0.30, 0.00, '2025-03-24 06:48:15', 'Points earned from order #128'),
(44, 6, 129, 0.20, 0.00, '2025-03-24 07:45:51', 'Points earned from order #129'),
(45, 6, 130, 0.30, 0.00, '2025-03-24 07:48:37', 'Points earned from order #130'),
(46, 2, 131, 0.80, 0.00, '2025-03-25 10:10:53', 'Points earned from order #131'),
(47, 6, NULL, 27.00, 0.00, '2025-03-26 13:47:19', 'Points earned from order #135'),
(48, 2, 136, 0.20, 0.00, '2025-03-26 16:02:08', 'Points earned from order #136'),
(49, 24, 143, 0.10, 0.00, '2025-03-29 02:46:16', 'Points earned from order #143'),
(50, 5, 145, 0.10, 0.00, '2025-03-30 07:35:08', 'Points earned from order #145'),
(51, 9, 146, 0.20, 0.00, '2025-03-30 14:54:17', 'Points earned from order #146'),
(52, 26, 147, 0.10, 0.00, '2025-04-01 03:47:52', 'Points earned from order #147'),
(53, 2, 148, 0.30, 0.00, '2025-04-02 01:22:51', 'Points earned from order #148'),
(54, 9, 149, 0.20, 0.00, '2025-04-03 07:09:09', 'Points earned from order #149');

-- --------------------------------------------------------

--
-- Table structure for table `points_log`
--

CREATE TABLE `points_log` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `points_redeemed` float NOT NULL,
  `redeemed_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `points_log`
--

INSERT INTO `points_log` (`id`, `user_id`, `points_redeemed`, `redeemed_at`) VALUES
(1, 5, 40, '2025-03-30 05:58:16'),
(2, 5, 40, '2025-03-30 06:08:09'),
(3, 5, 40, '2025-03-30 06:21:37'),
(4, 5, 40, '2025-03-30 06:31:40'),
(5, 5, 40, '2025-03-30 06:33:17'),
(6, 5, 40, '2025-03-30 06:43:51'),
(7, 5, 40, '2025-03-30 06:44:32'),
(8, 5, 40, '2025-03-30 07:28:03'),
(9, 5, 40, '2025-03-30 07:41:28'),
(10, 26, 1, '2025-04-01 03:37:52'),
(11, 26, 1.1, '2025-04-01 03:41:39'),
(12, 2, 3.4, '2025-04-03 06:57:26'),
(13, 5, 1.1, '2025-04-03 06:57:27');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `google_id` varchar(255) DEFAULT NULL,
  `f_name` varchar(100) NOT NULL,
  `l_name` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `address` text NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `profile_pic` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `points` decimal(10,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `google_id`, `f_name`, `l_name`, `phone`, `address`, `password`, `profile_pic`, `created_at`, `points`) VALUES
(2, 'ralphdagsa', 'ralphrevindagsa112802@gmail.com', NULL, 'Ralph', 'Dagsa', '09936540896', 'Brgy. Poblacion', '$2y$10$sJ5v80vRTTazE.3/RppSIOcg8n4IZ2z8wEXYXPaVvxT3wWampKfBi', '/uploads/1741927618_420044519_17913262670892630_5831701703380051512_n.jpg', '2025-03-03 14:15:26', 0.00),
(4, 'usertest', 'usertest@gmail.com', NULL, 'user', 'test', '09098319885', 'mandaluyong city', '$2y$10$.FHES8r1wAf9o3mdn44KIOCCL6R5Hu1waFND57lvKktI2sq5CP2P6', 'uploads/1741063140_ako.jpg', '2025-03-04 03:27:34', 1.10),
(5, 'Angelo2003', 'gerodiazmark@gmail.com', NULL, 'mark angelo', 'gerodiaz', '09098318985', 'Taguig city', '$2y$10$re0TGnXjoh0e3jF1cSSlrODissDqpPUlNbMH8N.LmyxRzer2bVeMC', '/uploads/1742010555_ako.jpg', '2025-03-08 09:08:17', 0.00),
(6, 'gotismark', 'gotismark02@gmail.com', NULL, 'Mark Angelo', 'Gerodiaz', '09098318985', 'Pembo Taguig city', '$2y$10$zDEH46SI.RoP0vyk1nCzS.goqRHKQoJbRyDTpWtEzj96/HLctyxZy', '/uploads/1742138943_IMG20241226141017.jpg', '2025-03-08 14:56:36', 36.30),
(7, 'karl123', 'karlkerrick@gmail.com', NULL, 'karl', 'garcia', '09098318985', 'Taguig City', '$2y$10$Vy7r3RQJrjH8NFoXV6M.TOjCv/I6/NYYXniqifkPgYQ6CU9Ka197e', NULL, '2025-03-14 01:54:39', 0.00),
(8, 'villotaryu', 'villotaryu@gmail.com', NULL, 'ryu', 'villota', '09694059622', 'Pasig city', '$2y$10$YBlAWEe8Uz5VB8Hu7jWSte9XhPY87DuNspUTbeVEZHAu0CElYw58m', NULL, '2025-03-14 02:11:01', 0.00),
(9, 'izzmeaya', 'ayabatumbakal@gmail.com', NULL, 'Aya', 'Batumbakal', '09123456789', '23 Metrogreen Village Pasig City', '$2y$10$P6bloKuHdmGi88l0Vv52b.OXNOcOFFbeejGnw1rFUNH4xjJhS6HFW', '/uploads/1743344783_2506c909c706c6fcbaaf686aafc5032e.jpg', '2025-03-16 06:12:55', 1.20),
(10, 'Ruxx', 'ryuvillota@gmail.com', NULL, 'Ryu', 'Villota', '09914853131', 'Villacuana 2 Pasig City', '$2y$10$O.WxQjYGu9Hb04cPRhjkG.lSYyJCZH3ZpU5V73wRqUkLFVfYGmnqW', NULL, '2025-03-16 07:10:22', 0.70),
(11, 'testtest@email.com', 'testtest@email.com', NULL, 'testtest@email.com', 'testtest@email.com', 'testtest@email.', 'testtest@email.com', '$2y$10$FPTy/GfAwg0jW2ip1mGO/OiOnBgj2w48TbkpIu.3HtNu.z3soxLo.', NULL, '2025-03-16 07:24:42', 0.00),
(13, 'ralphdagsa 123', 'ralphdagsa123@email.com', NULL, 'ralphdagsa 123', 'ralphdagsa 123', 'ralphdagsa 123', 'ralphdagsa 123', '$2y$10$Pbe.Mjd./3pQZa08z1LFke3QiI2TaqIZXEuZaVdTGcTavtbtfnAr2', NULL, '2025-03-16 07:29:33', 12.10),
(17, 'kurup', 'zofymyp@mailinator.com', NULL, 'Nora', 'Mullins', '+1 (463) 994-73', 'Tempora eos doloremq', '$2y$10$4UHg6Ud.LbXPPxqJI.DbkONPY8PqMGE/ViAhHWuYKUbiV6JOuMzyW', NULL, '2025-03-16 07:59:16', 0.00),
(18, 'Nebrao0202', 'angelogotis@gmail.com', NULL, 'Mark Joseph', 'Nebrao', '09098318985', '#55 Blk 19 B Addition Hills Mandaluyong City', '$2y$10$IR.sYzdReAmbQq//wPQV9uCRWf5nroHA6NbqeYetdOivAT9AB2/pO', NULL, '2025-03-16 11:51:02', 0.00),
(19, 'markangelo', 'angelogotis02@gmail.com', NULL, 'mark angelo', 'gerodiaz', '09098318985', 'Addition hills Mandaluyong City', '$2y$10$RpN7uee2lKZYdyHSUmZ4JuZPj16DJBkjBq4oIIY6yhrfGOK/oxQF2', NULL, '2025-03-16 12:11:24', 0.00),
(20, 'markgerodiaz', 'markgotis@gmail.com', NULL, 'mark angelo', 'gerodiaz', '09098318985', '55 Guadalupe Taguig City', '$2y$10$iWD2gDataNyQZTmN3xg27.YuJVRRFAaGl4RUK2ARVB1A61SdDJ/.a', NULL, '2025-03-16 12:23:03', 0.00),
(21, 'villotaryu', 'mark@gmail.com', NULL, 'mark', 'mark', '09098318985', '55 Blk 19 Addition Hills Pasig City', '$2y$10$.T6dKJNPZnO425kMkCQrvOqfYzXL23SPPGVeb9i2h/BsiN057lAQy', NULL, '2025-03-16 12:26:17', 0.00),
(22, 'justinedagsa', 'justinedagsa@gmail.com', NULL, 'Justine', 'Dagsa', '09936540896', '220 A. Luna St., Brgy. Poblacion, Mandaluyong City', '$2y$10$26IOhA535VNcpfg3qTx6fOz4oNH5FP4fm0D58cTicdbl2yhvlsbb6', NULL, '2025-03-17 10:36:43', 0.00),
(23, 'Jenrio', 'karlkerrick1@gmail.com', NULL, 'KARL KERRICK', 'GARCIA', '09914181288', 'pasig city', '$2y$10$H1/2PvLCuu467aVK8all.OAq/km1Xao9dSyclYW2t1iYjDRs68bCi', NULL, '2025-03-17 11:04:15', 0.00),
(24, 'ralph revin5269', '2021-100682@rtu.edu.ph', '107221658460523326302', 'RALPH REVIN', 'DAGSA', '09936540896', '220 A. Luna St., Brgy. Poblacion, taguig City', NULL, NULL, '2025-03-19 01:57:12', 1.00),
(25, 'ligaya9274', 'ligayalagunero@gmail.com', '100258065730214587977', 'Ligaya', 'Lagunero', '09669267169', '23 Callios Compound Brgy. Sta. Lucia', NULL, NULL, '2025-03-19 02:00:53', 0.00),
(26, 'gerodiaz8575', 'gerodiazmarkangelo02@gmail.com', '102528882167888636865', 'GERODIAZ', 'MARK ANGELO', '09129182007', '55 blk 19 addition hills taguig city', NULL, NULL, '2025-03-19 02:02:43', 1.00),
(27, 'mark angelo9552', 'angelogerodiaz4@gmail.com', '114111402059454035057', 'Mark Angelo', 'Gerodiaz', '', '55 Guadalupe Taguig City', NULL, NULL, '2025-03-19 02:06:04', 0.30),
(28, 'biarence gwenjef6044', '2021-101892@rtu.edu.ph', '117560084333917827145', 'BIARENCE GWENJEF', 'LEONOR', '', '', NULL, NULL, '2025-03-19 09:38:16', 4.80),
(29, 'jes023', 'Jesian.Lim08@gmail.com', NULL, 'Ian', 'Sieghart', '09993069489', '92 Rambutan St. Blk. 37, Brgy. Additon Hills, Welfareville Compound, Mandaluyong City', '$2y$10$7VC7a1EFxs97eqcz2JfOx.neJ4cYJDTYWfo8P2uICjaL2dw96uAzS', NULL, '2025-03-19 15:28:11', 0.00),
(30, 'leonor,2465', 'biarencegwen@gmail.com', '103067137070847479897', 'Leonor,', 'Biarence Gwenjef', '', '', NULL, NULL, '2025-03-26 13:17:03', 0.00),
(31, 'triple-z8721', 'triplez.main@gmail.com', '112900833707252994740', 'Triple-Z', 'Main', '', '', NULL, NULL, '2025-03-26 13:47:26', 0.00),
(32, 'alex.usyk', 'alexander@gmail.com', NULL, 'alexander', 'usyk', '09694059622', '55 blk 19 addition hills taguig city', '$2y$10$nSAcLC2czY56vuVmFf4PG.XRTKMrAmf6/jddAtlpur3tgEfGVy7Fu', NULL, '2025-03-28 09:13:15', 0.00),
(33, 'justinedagsa', 'justinebenedictdagsa@gmail.com', NULL, 'Justine', 'Dagsa', '09936540896', '220 A. Luna St., Brgy. Poblacion, Mandaluyong City', '$2y$10$yDuiITRJyjTnf9czFxF4tO22L0AfOG.9e6i/11NxX3Z/5xPoJX.sS', NULL, '2025-03-29 05:01:13', 0.00),
(34, 'charvy.bayoy', 'charvybayoy@gmail.com', NULL, 'charvy', 'bayoy', '09098318985', 'guadalupe taguig city', '$2y$10$56ZCtoAu47D3Oiu3aSgQ1eDAvaI4P4Gg/3hswi6qRPW3q.qnVy0mS', NULL, '2025-03-29 12:46:05', 0.00),
(35, 'Kerk', 'karlkerrick5@gmail.com', NULL, 'John', 'Doe', '09309983714', '3210 jaja killua ponsio city', '$2y$10$wQy/r/4Ykzjii2LyUz9Kl.WFO/WRgPqketNbC6UgCy4DGtUJKjkre', NULL, '2025-04-03 06:42:30', 0.00),
(36, 'christine', 'christinelagunero01@gmail.com', NULL, 'Christine', 'Lagunero', '09669267169', '23 Callos Comp. Brgy. Sta. Lucia, Pasig City', '$2y$10$jw0L4yzMXvmbn1B3oFm.y.xB6UJhkQnksUK79.Vx9eDPVs.cBYGY2', NULL, '2025-04-03 07:14:04', 0.00);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `food`
--
ALTER TABLE `food`
  ADD PRIMARY KEY (`food_id`),
  ADD KEY `category` (`category`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orders_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_history`
--
ALTER TABLE `order_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`order_items_id`),
  ADD KEY `food_id` (`food_id`),
  ADD KEY `orders_id` (`orders_id`);

--
-- Indexes for table `points_history`
--
ALTER TABLE `points_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `points_log`
--
ALTER TABLE `points_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `google_id` (`google_id`),
  ADD KEY `email_2` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_users`
--
ALTER TABLE `admin_users`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `food`
--
ALTER TABLE `food`
  MODIFY `food_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orders_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=150;

--
-- AUTO_INCREMENT for table `order_history`
--
ALTER TABLE `order_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=243;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `order_items_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=212;

--
-- AUTO_INCREMENT for table `points_history`
--
ALTER TABLE `points_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `points_log`
--
ALTER TABLE `points_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_history`
--
ALTER TABLE `order_history`
  ADD CONSTRAINT `order_history_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`orders_id`) ON DELETE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`orders_id`) REFERENCES `orders` (`orders_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`food_id`) REFERENCES `food` (`food_id`) ON DELETE CASCADE;

--
-- Constraints for table `points_history`
--
ALTER TABLE `points_history`
  ADD CONSTRAINT `points_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `points_history_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`orders_id`) ON DELETE SET NULL;

--
-- Constraints for table `points_log`
--
ALTER TABLE `points_log`
  ADD CONSTRAINT `points_log_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
