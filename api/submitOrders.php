<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "yappari_db");

if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => "Database connection failed"]));
}

// Read raw JSON input
$jsonData = file_get_contents("php://input");
$data = json_decode($jsonData, true);

// Debugging: Log received data
error_log("Received Order Data: " . print_r($data, true));

if (!$data || !isset($data["items"]) || empty($data["items"])) {
    echo json_encode(["success" => false, "error" => "Invalid order data"]);
    exit();
}

if (!isset($_SESSION["user_id"])) {
    echo json_encode(["success" => false, "error" => "User not logged in"]);
    exit();
}

$user_id = $_SESSION["user_id"];
$total_amount = 0;

// Calculate total price
foreach ($data["items"] as $item) {
    if (!isset($item["food_id"], $item["quantity"], $item["food_price"])) {
        echo json_encode(["success" => false, "error" => "Invalid item data"]);
        error_log("Total amount calculated: " . $total_amount);
        exit();
    }

    // Ensure numeric values are properly formatted
    $food_id = intval($item["food_id"]);
    $quantity = intval($item["quantity"]);
    $price = floatval($item["food_price"]);

    $total_amount += $quantity * $price;
}

// Insert order into orders table
$stmt = $conn->prepare("INSERT INTO orders (user_id, total_amount) VALUES (?, ?)");
if (!$stmt) {
    error_log("Prepare failed: " . $conn->error);
    echo json_encode(["success" => false, "error" => "Prepare failed: " . $conn->error]);
    exit();
}
$stmt->bind_param("id", $user_id, $total_amount);

if (!$stmt->execute()) {
    error_log("Execute failed: " . $stmt->error);
    echo json_encode(["success" => false, "error" => "Execute failed: " . $stmt->error]);
    exit();
}

$order_id = $stmt->insert_id;
$stmt->close();


// Insert order items
foreach ($data["items"] as $item) {
    $stmt = $conn->prepare("INSERT INTO order_items (orders_id, food_id, quantity, price) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("iiid", $order_id, $food_id, $quantity, $price);
    $stmt->execute();
    $stmt->close();
}

echo json_encode(["success" => true, "message" => "Order placed successfully", "order_id" => $order_id]);

$conn->close();
?>
