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
    password VARCHAR(255) NOT NULL
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the admin table
CREATE TABLE admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert a default admin account
INSERT INTO admin_users (username, password) VALUES ('admin', 'password123'); -- MD5 is used for password hashing

