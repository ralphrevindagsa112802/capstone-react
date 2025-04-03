<?php
// File: deleteCompletedOrders.php
session_start();
require_once __DIR__ . "/db.php";
header("Access-Control-Allow-Origin: https://admin.yappari-coffee-bar.shop");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Ensure admin authentication
if (!isset($_SESSION["admin_id"])) {
    echo json_encode(['success' => false, 'message' => 'Unauthorized: Admin login required']);
    exit();
}

// Get JSON request data
$data = json_decode(file_get_contents('php://input'), true);

// Validate the required parameters
if (!isset($data['order_id']) || empty($data['order_id'])) {
    echo json_encode(['success' => false, 'message' => 'Order ID is required']);
    exit();
}

$order_id = $data['order_id'];

try {
    // IMPORTANT: Changed 'order_id' to 'orders_id' to match your database schema
    $stmtDeleteOrder = $pdo->prepare("DELETE FROM orders WHERE orders_id = ?");
    $stmtDeleteOrder->execute([$order_id]);
    
    // Also delete from order_items table to avoid orphaned records
    $stmtDeleteItems = $pdo->prepare("DELETE FROM order_items WHERE order_id = ?");
    $stmtDeleteItems->execute([$order_id]);
    
    if ($stmtDeleteOrder->rowCount() > 0) {
        echo json_encode(['success' => true, 'message' => 'Order successfully deleted']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Order not found or already deleted']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>