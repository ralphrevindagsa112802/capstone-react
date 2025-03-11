<?php
session_start();
include __DIR__ . "/db.php"; // Ensure this file contains the correct PDO database connection

header("Access-Control-Allow-Origin: https://admin.yappari-coffee-bar.shop");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// ✅ Check if the admin is logged in
if (!isset($_SESSION["admin_id"])) {
    echo json_encode(["success" => false, "message" => "Unauthorized: Admin login required"]);
    exit();
}

// ✅ Handle preflight requests (CORS fix)
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

try {
    // ✅ Fetch feedback with customer details
    $query = "SELECT 
                o.order_feedback, 
                o.feedback_score, 
                u.f_name, 
                u.l_name, 
                u.email 
              FROM orders o 
              JOIN users u ON o.user_id = u.id
              WHERE o.order_feedback IS NOT NULL";

    $stmt = $pdo->prepare($query);
    $stmt->execute();

    $feedbackData = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["success" => true, "feedback" => $feedbackData]);
} catch (PDOException $e) {
    error_log("Database Error: " . $e->getMessage());
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}
?>
