<?php
session_start();
include __DIR__ . "/db.php"; // Ensure db.php uses PDO

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

if (!isset($_SESSION["user_id"])) {
    echo json_encode(["success" => false, "message" => "Unauthorized: Login required"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);
if (!isset($data["order_id"])) {
    echo json_encode(["success" => false, "message" => "Missing order ID"]);
    exit();
}

$order_id = intval($data["order_id"]);
$user_id = $_SESSION["user_id"];

try {
    $stmt = $pdo->prepare("UPDATE orders SET order_status = 'Order Received' WHERE orders_id = :order_id AND user_id = :user_id");
    $stmt->bindParam(":order_id", $order_id, PDO::PARAM_INT);
    $stmt->bindParam(":user_id", $user_id, PDO::PARAM_INT);
    
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Order marked as completed"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to update order status"]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}
?>