<?php
session_start();

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

include "db_connection.php";

// ✅ Ensure user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "User not logged in"]);
    exit;
}

$user_id = $_SESSION['user_id'];

// ✅ Fetch user details
$userQuery = $conn->prepare("SELECT f_name, l_name, address FROM users WHERE id = ?");
$userQuery->bind_param("i", $user_id);
$userQuery->execute();
$userResult = $userQuery->get_result();
$userData = $userResult->fetch_assoc();
$userQuery->close();

// ✅ Fetch latest order ID
$orderQuery = $conn->prepare("SELECT orders_id FROM orders WHERE user_id = ? ORDER BY created_at DESC LIMIT 1");
$orderQuery->bind_param("i", $user_id);
$orderQuery->execute();
$orderResult = $orderQuery->get_result();
$orderData = $orderResult->fetch_assoc();
$orderQuery->close();

echo json_encode([
    "success" => true,
    "name" => $userData['f_name'] . " " . $userData['l_name'],
    "address" => $userData['address'],
    "order_id" => $orderData['orders_id']
]);

$conn->close();
?>
