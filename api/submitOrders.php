<?php
session_start(); // ✅ Start the session

include __DIR__ . "/db.php"; // Ensure db.php uses PDO

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// ✅ Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "User not logged in"]);
    exit;
}

$user_id = intval($_SESSION['user_id']); // ✅ Get user_id from session
$data = json_decode(file_get_contents("php://input"), true);

// ✅ Validate request
if (!isset($data['items']) || !is_array($data['items'])) {
    echo json_encode(["success" => false, "message" => "Invalid request - No items received"]);
    exit;
}

$items = $data['items'];

try {
    $pdo->beginTransaction();

    // ✅ Insert order into orders table
    $stmt = $pdo->prepare("INSERT INTO orders (user_id, total_amount) VALUES (?, 0)");
    $stmt->execute([$user_id]);
    $order_id = $pdo->lastInsertId();

    $total_amount = 0;

    // ✅ Insert items into order_items table
    $stmt = $pdo->prepare("INSERT INTO order_items (orders_id, food_id, size, quantity, price) VALUES (?, ?, ?, ?, ?)");

    foreach ($items as $item) {
        $food_id = intval($item['food_id']);
        $size = $item['size']; // ✅ Ensure size is included
        $quantity = intval($item['quantity']);
        $price = floatval($item['food_price']); // ✅ Ensure correct price

        $total_amount += $price * $quantity;

        $stmt->execute([$order_id, $food_id, $size, $quantity, $price]);
    }

    // ✅ Update total order amount
    $stmt = $pdo->prepare("UPDATE orders SET total_amount = ? WHERE orders_id = ?");
    $stmt->execute([$total_amount, $order_id]);

    $pdo->commit();
    echo json_encode(["success" => true, "order_id" => $order_id]);

} catch (PDOException $e) {
    $pdo->rollBack();
    echo json_encode(["success" => false, "message" => "Order submission failed: " . $e->getMessage()]);
}
?>