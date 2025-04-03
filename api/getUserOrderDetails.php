<?php
session_start();

header("Access-Control-Allow-Origin: https://yappari-coffee-bar.shop");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

include __DIR__ . "/db.php"; // Ensure db.php uses PDO

// ✅ Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// ✅ Ensure user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "User not logged in"]);
    exit;
}

$user_id = $_SESSION['user_id'];

try {
    // ✅ Fetch user details
    $stmt = $pdo->prepare("SELECT email, f_name, l_name, address, phone FROM users WHERE id = ?");
    $stmt->execute([$user_id]);
    $userData = $stmt->fetch(PDO::FETCH_ASSOC);

    // ✅ Check if user exists
    if (!$userData) {
        echo json_encode(["success" => false, "message" => "User not found"]);
        exit;
    }

    // ✅ Fetch latest order ID
    $stmt = $pdo->prepare("SELECT orders_id FROM orders WHERE user_id = ? ORDER BY created_at DESC LIMIT 1");
    $stmt->execute([$user_id]);
    $orderData = $stmt->fetch(PDO::FETCH_ASSOC);

    // ✅ Return response, even if no orders exist
    echo json_encode([
        "success" => true,
        "name" => $userData['f_name'] . " " . $userData['l_name'],
        "phone" => $userData['phone'],
        "address" => $userData['address'],
        "orders_id" => $orderData['orders_id'] ?? null // ✅ Return `null` if no order found
    ]);

} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}
?>