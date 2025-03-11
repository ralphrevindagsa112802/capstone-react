<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'db.php'; // Ensure this initializes $pdo

header("Access-Control-Allow-Origin: https://admin.yappari-coffee-bar.shop");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight requests (CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

// Ensure database connection
if (!isset($pdo)) {
    echo json_encode(["success" => false, "message" => "Database connection error."]);
    exit();
}

// Check if admin is logged in
if (!isset($_SESSION["admin_id"])) { 
    echo json_encode(["success" => false, "message" => "Unauthorized: Admin login required"]);
    exit();
}

try {
   $stmt = $pdo->prepare("
    SELECT 
        o.orders_id, o.total_amount, o.created_at, o.shipping_method,
        u.id AS user_id, u.username, u.email, u.f_name, u.l_name, u.phone, u.address,
        oi.food_id, f.food_name, oi.size, oi.quantity, oi.price
    FROM orders o
    LEFT JOIN users u ON o.user_id = u.id  
    LEFT JOIN order_items oi ON o.orders_id = oi.orders_id
    LEFT JOIN food f ON oi.food_id = f.food_id  -- Updated 'menu' to 'food'
    ORDER BY o.created_at DESC
");

    $stmt->execute();
    $ordersData = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($ordersData)) {
        echo json_encode(["success" => false, "message" => "No orders found"]);
        exit();
    }

    $orders = [];
    foreach ($ordersData as $row) {
        $order_id = $row['orders_id'];

        if (!isset($orders[$order_id])) {
            $orders[$order_id] = [
                'orders_id' => $order_id,
                'total_amount' => floatval($row['total_amount']),
                'created_at' => $row['created_at'],
                'shipping_method' => $row['shipping_method'], // Added Shipping Method
                'user' => [
                    'user_id' => $row['user_id'],
                    'username' => $row['username'],
                    'email' => $row['email'],
                    'full_name' => trim($row['f_name'] . ' ' . $row['l_name']),
                    'phone' => $row['phone'],
                    'address' => $row['address']
                ],
                'items' => []
            ];
        }

        if ($row['food_id']) { // Ensure order contains at least one item
            $orders[$order_id]['items'][] = [
                'food_name' => $row['food_name'], // Replaced food_id with food_name
                'size' => $row['size'],
                'quantity' => intval($row['quantity']),
                'price' => floatval($row['price'])
            ];
        }
    }

    echo json_encode(["success" => true, "orders" => array_values($orders)]);
    exit();
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
    exit();
}
