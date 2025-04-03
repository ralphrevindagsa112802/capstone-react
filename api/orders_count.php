<?php
// Enable error reporting for debugging (Remove in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Start session only if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Require db.php (Stops execution if missing)
require_once __DIR__ . "/db.php";

// Set CORS headers
header("Access-Control-Allow-Origin: https://admin.yappari-coffee-bar.shop");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Log request for debugging
file_put_contents("log_orders.txt", date("Y-m-d H:i:s") . " - orders_count.php accessed\n", FILE_APPEND);

// Check if admin is logged in
if (!isset($_SESSION["admin_id"])) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Unauthorized access"]);
    exit();
}

try {
    // Verify if the `orders` table exists
    $tableCheck = $pdo->query("SHOW TABLES LIKE 'orders'");
    if ($tableCheck->rowCount() === 0) {
        throw new Exception("Table 'orders' does not exist.");
    }

    // Log table check success
    file_put_contents("log_orders.txt", date("Y-m-d H:i:s") . " - Orders table exists\n", FILE_APPEND);

    // Query to count all orders
// Modified PHP query to ensure ALL orders are counted
$stmt = $pdo->query("SELECT COUNT(orders_id) AS count FROM orders");
$result = $stmt->fetch();

    if (!$result) {
        throw new Exception("Query returned no results.");
    }

    // Log successful query execution
    file_put_contents("log_orders.txt", date("Y-m-d H:i:s") . " - Order count fetched: " . $result["count"] . "\n", FILE_APPEND);

    // Return JSON response
    echo json_encode([
        "success" => true,
        "count" => intval($result["count"])
    ]);
} catch (PDOException $e) {
    file_put_contents("log_orders.txt", date("Y-m-d H:i:s") . " - DB Error: " . $e->getMessage() . "\n", FILE_APPEND);
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
} catch (Exception $e) {
    file_put_contents("log_orders.txt", date("Y-m-d H:i:s") . " - General Error: " . $e->getMessage() . "\n", FILE_APPEND);
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
}
?>
