<?php
// File: moveOrderToHistory.php
// A combined solution that saves order to history and then deletes it
session_start();
require_once __DIR__ . "/db.php";
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

// Ensure admin authentication
if (!isset($_SESSION["admin_id"])) {
    echo json_encode(['success' => false, 'message' => 'Unauthorized: Admin login required']);
    exit();
}

// Get JSON request data
$data = json_decode(file_get_contents('php://input'), true);

// Validate the required parameters
if (!isset($data['order_id']) || empty($data['order_id'])) {
    echo json_encode(['success' => false, 'message' => 'Order ID is required']);
    exit();
}

$order_id = $data['order_id'];

try {
    // Begin transaction to ensure atomicity
    $pdo->beginTransaction();
    
    // Step 1: Fetch the order with all its details
    $stmt = $pdo->prepare("
        SELECT o.*, u.full_name, u.address, u.phone, u.email 
        FROM orders o 
        JOIN users u ON o.user_id = u.id 
        WHERE o.orders_id = ?
    ");
    $stmt->execute([$order_id]);
    $order = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$order) {
        $pdo->rollBack();
        echo json_encode(['success' => false, 'message' => "Order #$order_id not found"]);
        exit();
    }
    
    // Step 2: Fetch the order items
    $stmtItems = $pdo->prepare("
        SELECT * FROM order_items 
        WHERE order_id = ?
    ");
    $stmtItems->execute([$order_id]);
    $items = $stmtItems->fetchAll(PDO::FETCH_ASSOC);
    
    // Step 3: Insert into order_history
    $stmtHistory = $pdo->prepare("
        INSERT INTO order_history (
            original_order_id, 
            user_id, 
            user_name,
            user_address,
            user_phone,
            shipping_method, 
            total_amount, 
            order_status, 
            payment_method,
            created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");
    
    $stmtHistory->execute([
        $order_id,
        $order['user_id'],
        $order['full_name'],
        $order['address'],
        $order['phone'],
        $order['shipping_method'],
        $order['total_amount'],
        $order['order_status'] ?? 'Completed',
        $order['payment_method'] ?? 'Unknown',
        $order['created_at']
    ]);
    
    $history_id = $pdo->lastInsertId();
    
    // Step 4: Insert items into order_history_items
    if (!empty($items)) {
        $stmtHistoryItems = $pdo->prepare("
            INSERT INTO order_history_items (
                history_id,
                food_id,
                food_name,
                size,
                quantity,
                price
            ) VALUES (?, ?, ?, ?, ?, ?)
        ");
        
        foreach ($items as $item) {
            $stmtHistoryItems->execute([
                $history_id,
                $item['food_id'],
                $item['food_name'],
                $item['size'],
                $item['quantity'],
                $item['price']
            ]);
        }
    }
    
    // Step 5: Delete from order_items
    $stmtDeleteItems = $pdo->prepare("DELETE FROM order_items WHERE order_id = ?");
    $stmtDeleteItems->execute([$order_id]);
    
    // Step 6: Delete from orders
    $stmtDeleteOrder = $pdo->prepare("DELETE FROM orders WHERE orders_id = ?");
    $stmtDeleteOrder->execute([$order_id]);
    
    // Commit the transaction
    $pdo->commit();
    
    echo json_encode([
        'success' => true, 
        'message' => "Order #$order_id successfully saved to history and deleted"
    ]);
    
} catch (Exception $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    echo json_encode([
        'success' => false, 
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
?>