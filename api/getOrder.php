<?php
session_start();
include __DIR__ . "/db.php"; // Ensure db.php uses PDO

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// ✅ Ensure user is logged in
if (!isset($_SESSION["user_id"])) {
    echo json_encode(["success" => false, "message" => "Unauthorized: Login required"]);
    exit();
}

$user_id = $_SESSION["user_id"];

try {
    // ✅ Fetch all orders for the logged-in user
    $stmt = $pdo->prepare("SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC");
    $stmt->execute([$user_id]);
    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["success" => true, "orders" => $orders]);

} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}
?>