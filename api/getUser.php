<?php
session_start();
include __DIR__ . "/db.php"; // Make sure db.php uses PDO

header("Access-Control-Allow-Origin: https://yappari-coffee-bar.shop");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

// Debugging: Check session values
if (!isset($_SESSION["user_id"])) {
    echo json_encode(["success" => false, "message" => "Unauthorized: Login required", "session_data" => $_SESSION]);
    exit();
}

$user_id = $_SESSION["user_id"];

try {
    // ✅ Use PDO for better security and error handling
    $stmt = $pdo->prepare("SELECT id, username, f_name, l_name, email, phone, address, profile_pic FROM users WHERE id = ?");
    $stmt->execute([$user_id]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        echo json_encode(["success" => true, "user" => $user]);
    } else {
        echo json_encode(["success" => false, "message" => "User not found"]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}
?>