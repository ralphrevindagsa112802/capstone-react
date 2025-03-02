<?php
session_start(); // ✅ Start the session

include 'db.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// ✅ Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "User not logged in"]);
    exit;
}

$user_id = intval($_SESSION['user_id']); // ✅ Get user_id from session
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['items'])) {
    echo json_encode(["success" => false, "message" => "Invalid request - No items received"]);
    exit;
}

$items = $data['items'];

$conn->begin_transaction();

try {
    // ✅ Insert order into orders table
    $stmt = $conn->prepare("INSERT INTO orders (user_id, total_amount) VALUES (?, 0)");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $order_id = $conn->insert_id;
    $stmt->close();

    $total_amount = 0;

    // ✅ Insert items into order_items table
    $stmt = $conn->prepare("INSERT INTO order_items (orders_id, food_id, size, quantity, price) VALUES (?, ?, ?, ?, ?)");

    foreach ($items as $item) {
        $food_id = intval($item['food_id']);
        $size = $item['size']; // ✅ Ensure size is included
        $quantity = intval($item['quantity']);
        $price = floatval($item['food_price']); // ✅ Ensure correct price

        $total_amount += $price * $quantity;

        $stmt->bind_param("iisid", $order_id, $food_id, $size, $quantity, $price);
        $stmt->execute();
    }

    $stmt->close();

    // ✅ Update total order amount
    $stmt = $conn->prepare("UPDATE orders SET total_amount = ? WHERE orders_id = ?");
    $stmt->bind_param("di", $total_amount, $order_id);
    $stmt->execute();
    $stmt->close();

    $conn->commit();
    echo json_encode(["success" => true, "order_id" => $order_id]);
} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(["success" => false, "message" => "Order submission failed: " . $e->getMessage()]);
}

$conn->close();
?>
