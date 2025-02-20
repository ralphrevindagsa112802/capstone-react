-- Create the database (if it doesn't exist)
CREATE DATABASE IF NOT EXISTS yappari_db;
USE yappari_db;

-- Drop existing tables if they exist (for development purposes)
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS admin_users;

-- Create the users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    f_name VARCHAR(100) NOT NULL,
    l_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15) NOT NULL, -- Added phone number
    address TEXT NOT NULL, -- Added address
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create food table
CREATE TABLE food (
  food_id int(222) NOT NULL,
  food_name varchar(222) NOT NULL,
  food_description varchar(222) NOT NULL,
  food_size varchar(222) NOT NULL,
  food_price int(222) NOT NULL,
  food_img varchar(222) NOT NULL
);

INSERT INTO `food` (`food_id`, `food_name`, `food_description`, `food_size`, `food_price`, `food_img`) VALUES
(1, 'katsudon', 'basta katsudon yan', 'regular', 160, '[value-6]'),
(2, 'fish n chips', 'fish n chips', 'regular', 110, ''),
(3, 'fish n chips', 'fish n chips', 'regular', 110, ''),
(4, 'Pork curry', 'This delicious pork curry recipe has just the right amount of heat, but it can be adjusted to any taste.', 'Regular', 160, '[value-6]');

-- Create food size table
CREATE TABLE size (
  size_id int(222) NOT NULL,
  regular varchar(222) NOT NULL,
  tail varchar(222) NOT NULL
);

-- Create orders table
CREATE TABLE orders (
    orders_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create order items table
CREATE TABLE order_items (
    order_items_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
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
INSERT INTO admin_users (username, password) VALUES ('admin', 'password123'); -- MD5 is used for password hashing