<?php

session_start();
include __DIR__ . "/db.php"; 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Read input if any
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Debug logging
error_log("Reset points request - POST data: " . print_r($data, true));
error_log("Reset points request - Session: " . print_r($_SESSION, true));

// Ensure user is logged in
if (!isset($_SESSION["user_id"])) {
    echo json_encode(["success" => false, "message" => "Unauthorized: Login required"]);
    exit();
}

// Always use the session user ID for security
$user_id = $_SESSION["user_id"];

try {
    // Fetch user's current points
    $stmt = $pdo->prepare("SELECT points FROM users WHERE id = :user_id");
    $stmt->bindParam(":user_id", $user_id, PDO::PARAM_INT);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$user) {
        echo json_encode(["success" => false, "message" => "User not found"]);
        exit();
    }
    
    $current_points = floatval($user["points"]);
    
    if ($current_points < 1) {
        echo json_encode(["success" => false, "message" => "Not enough points to reset"]);
        exit();
    }
    
    // Reset points to 0
    $update_stmt = $pdo->prepare("UPDATE users SET points = 0 WHERE id = :user_id");
    $update_stmt->bindParam(":user_id", $user_id, PDO::PARAM_INT);
    
    if ($update_stmt->execute()) {
        // Log redemption
        $log_stmt = $pdo->prepare("INSERT INTO points_log (user_id, points_redeemed, redeemed_at) VALUES (:user_id, :points_redeemed, NOW())");
        $log_stmt->bindParam(":user_id", $user_id, PDO::PARAM_INT);
        $log_stmt->bindParam(":points_redeemed", $current_points, PDO::PARAM_STR);
        $log_stmt->execute();
        
        echo json_encode(["success" => true, "message" => "Points reset successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to reset points", "error" => $update_stmt->errorInfo()]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}
?>