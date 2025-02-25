-- Create the database (if it doesn't exist)
CREATE DATABASE IF NOT EXISTS yappari_db;
USE yappari_db;

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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create food table with size-based pricing
CREATE TABLE food (
    food_id INT AUTO_INCREMENT PRIMARY KEY,
    food_name VARCHAR(255) NOT NULL,
    category ENUM('Rice Meal', 'Drink', 'Dessert', 'Other') NOT NULL,
    price_small DECIMAL(10,2) DEFAULT NULL,
    price_medium DECIMAL(10,2) DEFAULT NULL,
    price_large DECIMAL(10,2) DEFAULT NULL,
    image_path VARCHAR(255) DEFAULT NULL,
    description TEXT NOT NULL
);

-- Insert sample food items with size-based pricing
INSERT INTO food (food_name, category, price_small, price_medium, price_large, image_path, description) VALUES
('Cafe Vienna', 'Drink', 100, 130, 150, '../img/CLASSIC COFFEES/Cafe Vienna.jpg', 'Viennese coffee with Americano topped with whipped cream and cocoa powder.'),
('Pork Katsudon', 'Rice Meal', 120, 150, 180, '../img/katsudon.jpg', 'Fried panko-breaded pork cutlet with egg cooked in Japanese soy sauce over rice.'),
('Caramel Macchiato', 'Drink', 110, 125, 145, '../img/CLASSIC COFFEES/Caramel Macchiato.jpg', 'Milk espresso-based coffee with caramel syrup and caramel drizzle on top.'),
('Seafood Pasta', 'Other', 160, NULL, NULL, '../img/2022-11-21 (2).jpg', 'Tomato-based pasta served with shrimp.');

-- Create orders table
CREATE TABLE orders (
    orders_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create order items table (✅ Includes size selection)
CREATE TABLE order_items (
    order_items_id INT AUTO_INCREMENT PRIMARY KEY,
    orders_id INT NOT NULL,
    food_id INT NOT NULL,
    size ENUM('Small', 'Medium', 'Large', 'Regular') NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (orders_id) REFERENCES orders(orders_id) ON DELETE CASCADE,
    FOREIGN KEY (food_id) REFERENCES food(food_id) ON DELETE CASCADE
);

-- Create the admin table
CREATE TABLE admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert a default admin account
INSERT INTO admin_users (username, password) VALUES ('admin', 'password123');
