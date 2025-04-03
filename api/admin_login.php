<?php
session_start();
header("Access-Control-Allow-Origin: https://admin.yappari-coffee-bar.shop");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

include __DIR__ . "/db.php";

// ✅ Handle CORS preflight request
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit(0);
}

// ✅ Get input data
$raw_input = file_get_contents("php://input");
$data = json_decode($raw_input, true);

if (!$data || !isset($data["admin_username"]) || !isset($data["admin_password"])) {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
    exit();
}

$admin_username = trim($data["admin_username"]);
$admin_password = trim($data["admin_password"]);

try {
    // ✅ Fetch admin from DB
    $stmt = $pdo->prepare("SELECT admin_id, admin_username, admin_password FROM admin_users WHERE admin_username = :username");
    $stmt->execute([":username" => $admin_username]);
    $admin = $stmt->fetch(PDO::FETCH_ASSOC);

    // ✅ Debugging: Log fetched admin
    error_log("Fetched admin: " . print_r($admin, true));

    if ($admin && password_verify($admin_password, $admin["admin_password"])) {
        $_SESSION["admin_id"] = $admin["admin_id"];
        $_SESSION["admin_username"] = $admin["admin_username"];

        // ✅ Set secure session cookie
        setcookie("PHPSESSID", session_id(), [
            "expires" => 0,
            "path" => "/",
            "domain" => "admin.yappari-coffee-bar.shop", // Change for production
            "secure" => true, // Change to `true` if using HTTPS
            "httponly" => true,
            "samesite" => "Lax"
        ]);

        echo json_encode([
            "success" => true,
            "message" => "Login successful",
            "admin_user" => [
                "admin_id" => $admin["admin_id"],
                "admin_username" => $admin["admin_username"],
            ]
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid admin credentials"]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}
?>