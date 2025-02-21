<?php
session_start(); // Start session

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Database connection
include 'db.php';

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}

// Ensure user is logged in
if (!isset($_SESSION["user_id"])) {
    echo json_encode(["error" => "User not logged in"]);
    exit();
}

$user_id = $_SESSION["user_id"];

// Read JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Check if JSON data is valid
if (!$data || !isset($data["items"]) || !is_array($data["items"])) {
    echo json_encode(["error" => "Invalid JSON data"]);
    exit();
}

// Insert order into `orders` table
$stmt = $conn->prepare("INSERT INTO orders (user_id, total_price) VALUES (?, ?)");
$total_price = array_reduce($data["items"], function ($sum, $item) {
    return $sum + ($item["food_price"] * $item["quantity"]);
}, 0);
$stmt->bind_param("id", $user_id, $total_price);
$stmt->execute();
$orders_id = $stmt->insert_id; // This should match `orders_id` in your orders table
$stmt->close();


// Insert each item into `order_items` table
$itemStmt = $conn->prepare("INSERT INTO order_items (order_id, food_id, quantity, price) VALUES (?, ?, ?, ?)");

foreach ($data["items"] as $item) {
    if (!isset($item["food_id"], $item["quantity"], $item["food_price"])) {
        continue; // Skip invalid items
    }

    $food_id = $item["food_id"];
    $quantity = $item["quantity"];
    $price = $item["food_price"];

    $itemStmt->bind_param("iiid", $order_id, $food_id, $quantity, $price);
    $itemStmt->execute();
}
$itemStmt->close();

echo json_encode(["success" => true, "message" => "Order placed successfully!", "order_id" => $order_id]);

$conn->close();
?>
