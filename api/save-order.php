<?php
session_start(); // ✅ Start session

include __DIR__ . "/db.php"; // Ensure db.php connects via PDO

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

$user_id = intval($_SESSION['user_id']);
$data = json_decode(file_get_contents("php://input"), true);

// ✅ Validate required fields
if (!isset($data['order_id']) || !isset($data['status']) || !isset($data['paymentMethod'])) {
    echo json_encode(["success" => false, "message" => "Invalid request - Missing required fields"]);
    exit;
}

$order_id = intval($data['order_id']);
$status = htmlspecialchars($data['status']); // Prevent SQL injection
$paymentMethod = htmlspecialchars($data['paymentMethod']);

try {
    $pdo->beginTransaction();

    // ✅ Update order status and payment method
    $stmt = $pdo->prepare("UPDATE orders SET order_status = ?, payment_method = ? WHERE orders_id = ? AND user_id = ?");
    $stmt->execute([$status, $paymentMethod, $order_id, $user_id]);

    // ✅ Check if order was updated
    if ($stmt->rowCount() > 0) {
        $pdo->commit();
        echo json_encode(["success" => true, "order_id" => $order_id, "message" => "Payment confirmed"]);
    } else {
        throw new Exception("Order not found or already updated");
    }

} catch (Exception $e) {
    $pdo->rollBack();
    echo json_encode(["success" => false, "message" => "Order update failed: " . $e->getMessage()]);
}
?>
