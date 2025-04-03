<?php
session_start();
header("Access-Control-Allow-Origin: https://admin.yappari-coffee-bar.shop");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Enable error logging
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);

// Handle preflight OPTIONS request
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

// Check admin authentication
if (!isset($_SESSION["admin_id"])) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Unauthorized access"]);
    exit();
}

// Include database connection (Ensure $pdo is already defined in db.php)
require_once __DIR__ . "/db.php";

// Check if the database connection exists
if (!isset($pdo)) {
    error_log("Database connection is not set in db.php.");
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database connection error."]);
    exit();
}

try {
    // Query to fetch completed orders
    $query = "SELECT 
                id, 
                order_id, 
                customer_name, 
                COALESCE(DATE_FORMAT(date, '%Y-%m-%d %H:%i:%s'), '0000-00-00 00:00:00') AS date, 
                total, 
                status
              FROM order_history 
              WHERE status = 'Completed'
              ORDER BY date DESC
              LIMIT 20";

    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $completeOrders = $stmt->fetchAll();

    // Return JSON response
    echo json_encode(["success" => true, "orders" => $completeOrders]);
} catch (PDOException $e) {
    error_log("Database Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to retrieve orders."]);
}
?>
