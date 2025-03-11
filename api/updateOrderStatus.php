<?php
// ✅ Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();
include __DIR__ . "/db.php"; // Ensure db.php uses PDO

// ✅ CORS Headers
header("Access-Control-Allow-Origin: https://admin.yappari-coffee-bar.shop");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// ✅ Debugging Logs
error_log("Session Data: " . print_r($_SESSION, true));
error_log("POST Data: " . file_get_contents("php://input"));

// ✅ Ensure Admin Authentication
if (!isset($_SESSION["admin_id"])) {
    echo json_encode(["success" => false, "message" => "Unauthorized: Admin login required"]);
    exit();
}

// ✅ If GET request, fetch the current status
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $orderId = $_GET['order_id'] ?? null;

    if (!$orderId) {
        echo json_encode(["success" => false, "message" => "Order ID is required"]);
        exit();
    }

    try {
        $query = "SELECT order_status FROM orders WHERE orders_id = :orderId";
        $stmt = $pdo->prepare($query);
        $stmt->execute([':orderId' => $orderId]);
        $order = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($order) {
            echo json_encode(["success" => true, "order_status" => $order['order_status']]);
        } else {
            echo json_encode(["success" => false, "message" => "Order not found"]);
        }
    } catch (Exception $e) {
        error_log("Database Error: " . $e->getMessage());
        echo json_encode(["success" => false, "message" => "Database error occurred"]);
    }
    exit();
}

// ✅ If POST request, update the order status
$data = json_decode(file_get_contents("php://input"), true);
if ($data === null) {
    echo json_encode(["success" => false, "message" => "Invalid JSON received"]);
    exit();
}

// ✅ Validate Inputs
$orderId = $data['order_id'] ?? null;
$status = $data['status'] ?? null;
$allowedStatuses = ['Pending', 'Processing', 'Out For Delivery', 'Ready to pickup', 'Completed', 'Order Received', 'Cancelled'];

if (!$orderId || !$status || !in_array($status, $allowedStatuses)) {
    echo json_encode(["success" => false, "message" => "Invalid request or status not allowed"]);
    exit();
}

try {
    // ✅ Ensure $pdo is defined in db.php
    if (!isset($pdo)) {
        throw new Exception("Database connection not established");
    }

    // ✅ Update order status
    $query = "UPDATE orders SET order_status = :status WHERE orders_id = :orderId";
    $stmt = $pdo->prepare($query);
    $stmt->execute([':status' => $status, ':orderId' => $orderId]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(["success" => true, "message" => "Order status updated successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Order not found or status already set"]);
    }
} catch (Exception $e) {
    error_log("Database Error: " . $e->getMessage());
    echo json_encode(["success" => false, "message" => "Server error: " . $e->getMessage()]);
}
?>