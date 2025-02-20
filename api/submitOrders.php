<?php
session_start(); // Start session to access user data

header("Access-Control-Allow-Origin: http://localhost:5173"); // Allow React frontend
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Database connection
include 'db.php';

// Check if the user is logged in
if (!isset($_SESSION["user_id"])) {
    echo json_encode(["success" => false, "message" => "User not logged in"]);
    exit();
}

// Get raw JSON data from the request body
$data = json_decode(file_get_contents('php://input'), true);

error_log("Received data: " . print_r($data, true));

// Validate input data
if (empty($data['items'])) {
    echo json_encode(["success" => false, "message" => "Invalid input data"]);
    exit;
}

// Extract data
$userId = $_SESSION["user_id"]; // Get user ID from session
$items = $data['items'];

// Calculate total amount
$totalAmount = 0;
foreach ($items as $item) {
    $totalAmount += $item['price'] * $item['quantity'];
}

// Insert order into the `orders` table
$sql = "INSERT INTO orders (user_id, total_amount) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("id", $userId, $totalAmount);

if ($stmt->execute()) {
    $orderId = $stmt->insert_id; // Get the ID of the newly inserted order

    // Insert order items into the `order_items` table
    foreach ($items as $item) {
        $productId = $conn->real_escape_string($item['foods_id']);
        $quantity = $conn->real_escape_string($item['quantity']);
        $price = $conn->real_escape_string($item['price']);

        $sql = "INSERT INTO order_items (order_id, foods_id, quantity, price) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("iiid", $orderId, $productId, $quantity, $price);

        if (!$stmt->execute()) {
            echo json_encode(["success" => false, "message" => "Failed to insert order items: " . $stmt->error]);
            exit;
        }
    }

    echo json_encode(["success" => true, "order_id" => $orderId]); // Success response
} else {
    echo json_encode(["success" => false, "message" => "Failed to insert order: " . $stmt->error]); // Error response
}

$stmt->close();
$conn->close();
?>