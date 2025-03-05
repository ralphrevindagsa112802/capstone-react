<?php
session_start(); // ✅ Start session

// ✅ Enable Full Debugging
error_reporting(E_ALL);
ini_set("display_errors", 1);
ini_set("log_errors", 1);
ini_set("error_log", __DIR__ . "/error_log.txt"); // Save errors to file

include __DIR__ . "/db.php"; // Ensure db.php connects via PDO

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// ✅ Debug: Check if session exists
if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        "success" => false, 
        "message" => "User not logged in", 
        "session_data" => $_SESSION
    ]);
    exit;
}

// ✅ Debug: Check if request is received
$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    echo json_encode([
        "success" => false, 
        "message" => "No data received", 
        "raw_input" => file_get_contents("php://input")
    ]);
    exit;
}

// ✅ Debug: Log received data
error_log("Received Data: " . print_r($data, true));

// ✅ Validate `items` array
if (!isset($data['items']) || !is_array($data['items']) || count($data['items']) === 0) {
    echo json_encode([
        "success" => false, 
        "message" => "Invalid request - No items received",
        "received_items" => $data['items'] ?? "Not Set"
    ]);
    exit;
}

$user_id = intval($_SESSION['user_id']);
$items = $data['items'];

try {
    $pdo->beginTransaction();

    // ✅ Insert new order
    $stmt = $pdo->prepare("INSERT INTO orders (user_id, total_amount, order_status) VALUES (?, 0, 'Pending')");
    if (!$stmt->execute([$user_id])) {
        throw new Exception("Failed to insert order.");
    }
    $order_id = $pdo->lastInsertId();

    $total_amount = 0;

    // ✅ Prepare SQL for inserting items
    $stmt = $pdo->prepare("INSERT INTO order_items (orders_id, food_id, size, quantity, price) VALUES (?, ?, ?, ?, ?)");

    foreach ($items as $item) {
        if (!isset($item['food_id']) || !isset($item['quantity']) || !isset($item['food_price'])) {
            throw new Exception("Missing required item fields: " . print_r($item, true));
        }

        $food_id = intval($item['food_id']);
        $size = isset($item['size']) ? $item['size'] : null;
        $quantity = intval($item['quantity']);
        $price = floatval($item['food_price']);

        $total_amount += $price * $quantity;

        if (!$stmt->execute([$order_id, $food_id, $size, $quantity, $price])) {
            throw new Exception("Failed to insert order item: " . print_r($item, true));
        }
    }

    // ✅ Update total order amount
    $stmt = $pdo->prepare("UPDATE orders SET total_amount = ? WHERE orders_id = ?");
    if (!$stmt->execute([$total_amount, $order_id])) {
        throw new Exception("Failed to update total amount.");
    }

    $pdo->commit();
    echo json_encode(["success" => true, "order_id" => $order_id, "message" => "Order created successfully"]);

} catch (Exception $e) {
    $pdo->rollBack();
    error_log("Order Creation Failed: " . $e->getMessage());
    echo json_encode(["success" => false, "message" => "Order creation failed: " . $e->getMessage()]);
}
?>
