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

// Include database connection
require_once __DIR__ . "/db.php";

// Check if the database connection exists
if (!isset($pdo)) {
    error_log("Database connection is not set in db.php.");
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database connection error."]);
    exit();
}

try {
    // Check if 'order_history' table exists
    $tableCheck = $pdo->query("SHOW TABLES LIKE 'order_history'");
    if ($tableCheck->rowCount() == 0) {
        throw new Exception("Table 'order_history' does not exist.");
    }

    // Query to fetch cancelled orders
    $query = "SELECT 
                id, 
                order_id, 
                customer_name, 
                COALESCE(DATE_FORMAT(date, '%Y-%m-%d %H:%i:%s'), '0000-00-00 00:00:00') AS date, 
                total, 
                status
              FROM order_history 
              WHERE status = 'Cancelled'
              ORDER BY date DESC
              LIMIT 20";

    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $cancelledOrders = $stmt->fetchAll();

    // Log success
    error_log("Cancelled orders fetched successfully. Count: " . count($cancelledOrders));

    // Return JSON response
    echo json_encode(["success" => true, "orders" => $cancelledOrders]);
} catch (PDOException $e) {
    error_log("Database Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
} catch (Exception $e) {
    error_log("General Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
}
?>
