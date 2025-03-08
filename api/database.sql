-- Create the database (if it doesn't exist)
CREATE DATABASE IF NOT EXISTS yappari CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
USE yappari;

-- Drop existing tables if they exist (for development purposes)
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS food;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS admin_users;

-- Create the users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    f_name VARCHAR(100) NOT NULL,
    l_name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    address TEXT NOT NULL,
    password VARCHAR(255) NOT NULL,
    profile_pic VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX (email)
) CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create food table with size-based pricing
CREATE TABLE food (
    food_id INT AUTO_INCREMENT PRIMARY KEY,
    food_name VARCHAR(255) NOT NULL,
    category ENUM('Rice Meal', 'Classic Coffee', 'Frappes', 'Smoothies', 'Refreshers', 'Milk Drinks', 'Dessert', 'Snacks and Pasta') NOT NULL,
    price_small DECIMAL(10,2) DEFAULT NULL,
    price_medium DECIMAL(10,2) DEFAULT NULL,
    price_large DECIMAL(10,2) DEFAULT NULL,
    availability_small VARCHAR(255) DEFAULT "Not Available",
    availability_medium VARCHAR(255) DEFAULT "Not Available",
    availability_large VARCHAR(255) DEFAULT "Not Available",
    image_path VARCHAR(255) DEFAULT NULL,
    description TEXT NOT NULL,
    INDEX (category)
) CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create orders table
CREATE TABLE orders (
    orders_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_method ENUM('Cash on Delivery', 'Credit Card', 'GCash') NOT NULL DEFAULT 'Cash on Delivery',
    shipping_method ENUM('Pickup', 'Delivery') NOT NULL DEFAULT 'Pickup',
    order_status ENUM('Pending', 'Processing', 'Out for Delivery', 'Completed', 'Cancelled') NOT NULL DEFAULT 'Pending',
    order_feedback TEXT DEFAULT NULL,
    feedback_score TINYINT(1) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create order items table
CREATE TABLE order_items (
    order_items_id INT AUTO_INCREMENT PRIMARY KEY,
    orders_id INT NOT NULL,
    food_id INT NOT NULL,
    size ENUM('Small', 'Medium', 'Large', 'Regular', 'Extra Large') NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (orders_id) REFERENCES orders(orders_id) ON DELETE CASCADE,
    FOREIGN KEY (food_id) REFERENCES food(food_id) ON DELETE CASCADE
) CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create the admin table
CREATE TABLE admin_users (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    admin_username VARCHAR(50) NOT NULL,
    admin_password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
