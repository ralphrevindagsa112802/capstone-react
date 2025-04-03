<?php
session_start();
include 'db.php';

header("Access-Control-Allow-Origin: https://admin.yappari-coffee-bar.shop/");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

$order_id = isset($_GET['order_id']) ? intval($_GET['order_id']) : 0;

if ($order_id === 0) {
    echo json_encode(["success" => false, "message" => "Invalid order ID"]);
    exit;
}

try {
    $query = "SELECT oi.order_item_id, oi.food_id, f.food_name, oi.food_size, oi.quantity, oi.subtotal
              FROM order_items oi
              JOIN food f ON oi.food_id = f.food_id
              WHERE oi.order_id = ?";
    
    $stmt = $pdo->prepare($query);
    $stmt->execute([$order_id]);
    $orderItems = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["success" => true, "data" => $orderItems]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}
?>