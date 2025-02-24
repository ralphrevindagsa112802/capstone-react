<?php
include 'db_connection.php';

header("Content-Type: application/json");
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['items']) || !isset($data['user_id'])) {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
    exit;
}

$user_id = intval($data['user_id']);
$items = $data['items'];

$conn->begin_transaction();

try {
    // Insert new order into orders table
    $stmt = $conn->prepare("INSERT INTO orders (user_id, total_amount) VALUES (?, 0)");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $order_id = $conn->insert_id;
    $stmt->close();

    $total_amount = 0;

    // Insert each item into order_items table
    $stmt = $conn->prepare("INSERT INTO order_items (orders_id, food_id, size, quantity, price) VALUES (?, ?, ?, ?, ?)");

    foreach ($items as $item) {
        $food_id = intval($item['food_id']);
        $size = $item['size']; // Ensure size is included
        $quantity = intval($item['quantity']);
        $price = floatval($item['food_price']); // Ensure correct price is used

        $total_amount += $price * $quantity;

        $stmt->bind_param("iisid", $order_id, $food_id, $size, $quantity, $price);
        $stmt->execute();
    }

    $stmt->close();

    // Update total amount in orders table
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
