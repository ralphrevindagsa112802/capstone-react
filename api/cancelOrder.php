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

// Update order status to "Cancelled"
$query = "UPDATE orders SET order_status = 'Cancelled' WHERE order_number = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $orderId);

if ($stmt->execute()) {
    echo json_encode(["success" => "Order cancelled successfully"]);
} else {
    echo json_encode(["error" => "Failed to cancel order"]);
}

$stmt->close();
$conn->close();
?>
