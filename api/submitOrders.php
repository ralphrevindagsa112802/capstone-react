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

// 🔹 Debug: Print the received JSON to check if quantity exists
error_log(print_r($data, true)); // Logs the received data

if (!isset($data["items"]) || !is_array($data["items"])) {
    echo json_encode(["error" => "Invalid data JSON"]);
    exit();
}

foreach ($data["items"] as $item) {
    if (!isset($item["food_id"], $item["quantity"])) {
        echo json_encode(["error" => "Missing food_id or quantity"]);
        exit();
    }
    

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
    foreach ($data["items"] as $item) {
        $food_id = isset($item["food_id"]) ? $item["food_id"] : null;
        $quantity = isset($item["quantity"]) ? $item["quantity"] : 1; // Default to 1 if missing
    
        if ($food_id === null) {
            echo json_encode(["error" => "Missing food_id"]);
            exit();
        }
    
        // 🔹 Now $quantity is always set
    }
    

    
    echo json_encode(["success" => true, "message" => "Order submitted"]); // Success response
} else {
    echo json_encode(["success" => false, "message" => "Failed to insert order: " . $stmt->error]); // Error response
}

}

$stmt->close();
$conn->close();
?>