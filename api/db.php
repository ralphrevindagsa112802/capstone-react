<?php
$host = "sql104.infinityfree.com"; // Change this if your database is hosted elsewhere
$username = "if0_38428136"; // Your MySQL username (default is 'root' for XAMPP)
$password = "IDYn5KrxBXYK1x"; // Your MySQL password (default is empty for XAMPP)
$database = "if0_38428136_yappari"; // Change this to your actual database name

// Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed: " . $conn->connect_error]));
}

// Set charset to UTF-8
$conn->set_charset("utf8mb4");
?>
