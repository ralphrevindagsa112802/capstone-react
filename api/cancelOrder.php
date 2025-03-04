<?php
session_start();
include 'db.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

if (!isset($_SESSION["user_id"])) {
    echo json_encode(["success" => false, "message" => "Unauthorized: Login required"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);
$order_id = $data["order_id"];
$user_id = $_SESSION["user_id"]; // ✅ Get user ID from session

$stmt = $conn->prepare("UPDATE orders SET status='Cancelled' WHERE orders_id=? AND user_id=?");
$stmt->bind_param("ii", $order_id, $user_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Order cancelled successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to cancel order"]);
}

$stmt->close();
$conn->close();
?>
