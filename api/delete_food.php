<?php
session_start();
include __DIR__ . "/db.php";

// ✅ Allow both the main site and admin subdomain
$allowed_origins = [
    "https://yappari-coffee-bar.shop",
    "https://admin.yappari-coffee-bar.shop"
];

if (isset($_SERVER["HTTP_ORIGIN"]) && in_array($_SERVER["HTTP_ORIGIN"], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER["HTTP_ORIGIN"]);
} else {
    header("Access-Control-Allow-Origin: https://yappari-coffee-bar.shop"); // Fallback
}

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// ✅ Handle CORS preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ✅ Ensure admin is logged in
if (!isset($_SESSION["admin_id"])) {
    echo json_encode(["success" => false, "message" => "Unauthorized: Admin login required"]);
    exit();
}

// ✅ Get and validate input
$data = json_decode(file_get_contents("php://input"), true);
if (!isset($data["food_id"]) || !is_numeric($data["food_id"])) {
    echo json_encode(["success" => false, "message" => "Invalid or missing food_id"]);
    exit();
}

$food_id = intval($data["food_id"]); // ✅ Ensure it's an integer

try {
    // ✅ Use PDO prepared statement
    $stmt = $pdo->prepare("DELETE FROM food WHERE food_id = ?");
    $stmt->execute([$food_id]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(["success" => true, "message" => "Product deleted successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "No matching product found"]);
    }
} catch (Exception $e) {
    // ✅ Log database errors for debugging
    file_put_contents("delete_log.txt", "DB Error: " . $e->getMessage() . "\n", FILE_APPEND);
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}
?>
