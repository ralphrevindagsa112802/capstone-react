<?php
session_start();
include 'db.php';

header("Access-Control-Allow-Origin: https://admin.yappari-coffee-bar.shop");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

try {
    $query = "SELECT o.orders_id, o.user_id, u.f_name, u.l_name, u.email, u.phone, o.total_amount, o.created_at
              FROM orders o
              JOIN users u ON o.user_id = u.id
              ORDER BY o.created_at DESC";
    
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["success" => true, "data" => $orders]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}
?>