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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create food table
CREATE TABLE food (
    food_id INT AUTO_INCREMENT PRIMARY KEY,
    food_name VARCHAR(222) NOT NULL,
    food_description VARCHAR(222) NOT NULL,
    food_price INT(222) NOT NULL,
    food_img VARCHAR(222) NOT NULL,
    size VARCHAR(255)
);

INSERT INTO `food` (`food_name`, `food_description`, `food_price`, `food_img`, `size`) VALUES
('Cafe Vienna', 'Viannese Coffee that serves Americano topped with a heavy whipped cream. Dashed with cocoa powder', 130, '../img//CLASSIC COFFEES/Cafe Vienna.jpg', 'Regular'),
('Pork Katsudon', 'Fried panko-breaded pork cutlet with egg cooked in japanese soy sauce over rice.', 120, '../img/katsudon.jpg', 'Regular'),
('Caramel Macchiato', 'Milk espresso-based coffee with use of freshly steamed milk, caramel syrup and caramel drizzle on top.', 125, '../img/CLASSIC COFFEES/Caramel Macchiato.jpg', 'Regular'),
('Seafood Pasta', ' A tomato-based pasta that is served with shrimp.', 160, '../img/2022-11-21 (2).jpg', 'Regular');

-- Create orders table
CREATE TABLE orders (
    orders_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_amount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create order items table
CREATE TABLE order_items (
    order_items_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    food_id INT,
    quantity INT,
    price DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES orders(orders_id),
    FOREIGN KEY (food_id) REFERENCES food(food_id)
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