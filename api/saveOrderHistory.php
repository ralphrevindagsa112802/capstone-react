
<?php
session_start();
include __DIR__ . "/db.php";
header("Access-Control-Allow-Origin: https://admin.yappari-coffee-bar.shop");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Check admin authentication
if (!isset($_SESSION["admin_id"])) {
    echo json_encode(["success" => false, "message" => "Unauthorized: Admin login required"]);
    exit();
}

// Get JSON request data
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['order_ids']) || !is_array($data['order_ids']) || empty($data['order_ids'])) {
    echo json_encode(["success" => false, "message" => "No order IDs provided"]);
    exit();
}

if (!isset($data['status']) || empty($data['status'])) {
    echo json_encode(["success" => false, "message" => "No order status provided"]);
    exit();
}

$orderIds = $data['order_ids'];
$status = $data['status']; // Accept the provided status

try {
    $pdo->beginTransaction();

    foreach ($orderIds as $orderId) {
        // Debugging: Log the received order ID and status
        error_log("Processing order: $orderId with status: $status");

        // Get order details
        $stmt = $pdo->prepare("
            SELECT o.*, u.f_name, u.l_name, u.address, u.phone
            FROM orders o
            LEFT JOIN users u ON o.user_id = u.id
            WHERE o.orders_id = ?
        ");
        $stmt->execute([$orderId]);
        $order = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$order) {
            throw new Exception("Order #$orderId not found");
        }
        
        // Get order items
        $stmtItems = $pdo->prepare("
            SELECT oi.*, f.food_name 
            FROM order_items oi
            LEFT JOIN food f ON oi.food_id = f.food_id
            WHERE oi.orders_id = ?
        ");
        $stmtItems->execute([$orderId]);
        $orderItems = $stmtItems->fetchAll(PDO::FETCH_ASSOC);
        
        // Combine first and last name
        $customerName = trim(($order["f_name"] ?? "") . " " . ($order["l_name"] ?? ""));
        if (empty($customerName)) $customerName = "Customer";
        
        $location = $order["address"] ?? "";
        $phoneNumber = $order["phone"] ?? "";
        $shippingMethod = $order["shipping_method"] ?? "Pickup";
        
        // Insert into order_history using the correct status
        $stmtHistory = $pdo->prepare("
            INSERT INTO order_history 
                (order_id, customer_name, date, order_details, total, location, status, shipping_method, phone) 
            VALUES (?, ?, NOW(), ?, ?, ?, ?, ?, ?)
        ");
        $stmtHistory->execute([
            $orderId,
            $customerName,
            json_encode($orderItems),
            $order["total_amount"],
            $location,
            $status, // ✅ Use the provided status
            $shippingMethod,
            $phoneNumber
        ]);
        
        // Debugging: Verify insertion into order_history
        if ($stmtHistory->rowCount() > 0) {
            error_log("Order $orderId saved in order_history with status: $status");
        } else {
            error_log("Failed to save order $orderId in order_history");
        }

        // Update the order status in the `orders` table
        $stmtUpdate = $pdo->prepare("UPDATE orders SET order_status = ? WHERE orders_id = ?");
        $stmtUpdate->execute([$status, $orderId]);

        // Debugging: Verify update in orders table
        if ($stmtUpdate->rowCount() > 0) {
            error_log("Order $orderId status updated to: $status in orders table");
        } else {
            error_log("Failed to update status for order $orderId");
        }
    }

    $pdo->commit();
    echo json_encode(["success" => true, "message" => "Orders marked as '$status' and saved in history"]);
} catch (Exception $e) {
    $pdo->rollBack();
    echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
}
?>