<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$host = "localhost";
$username = "root"; 
$password = ""; 
$database = "yappari"; 

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['orderId'])) {
    die(json_encode(["error" => "Order ID is required"]));
}

$orderId = $conn->real_escape_string($data['orderId']);

// Check current order status
$queryCheck = "SELECT order_status FROM orders WHERE order_number = ?";
$stmtCheck = $conn->prepare($queryCheck);
$stmtCheck->bind_param("s", $orderId);
$stmtCheck->execute();
$result = $stmtCheck->get_result();
$row = $result->fetch_assoc();
$stmtCheck->close();

if (!$row) {
    die(json_encode(["error" => "Order not found"]));
}

$currentStatus = $row['order_status'];

if ($currentStatus === "Cancelled") {
    die(json_encode(["error" => "Cancelled orders cannot be received."]));
} elseif ($currentStatus === "Received") {
    die(json_encode(["error" => "Order is already marked as received."]));
}

// Update order status to "Received"
$query = "UPDATE orders SET order_status = 'Received' WHERE order_number = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $orderId);

if ($stmt->execute()) {
    echo json_encode(["success" => "Order marked as received"]);
} else {
    echo json_encode(["error" => "Failed to update order status"]);
}

$stmt->close();
$conn->close();
?>
