<?php
session_start();
include 'db.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


$data = json_decode(file_get_contents("php://input"), true);
$order_id = $data["order_id"];

$stmt = $conn->prepare("UPDATE orders SET status='Received' WHERE orders_id=?");
$stmt->bind_param("i", $order_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Order marked as received"]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to update order status"]);
}

$stmt->close();
$conn->close();
?>
