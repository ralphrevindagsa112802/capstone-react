<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

// Handle preflight requests
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit(0);
}

$raw_input = file_get_contents("php://input");
$data = json_decode($raw_input, true);

if (!$data || !isset($data["admin_username"]) || !isset($data["admin_password"])) {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
    exit();
}

$admin_username = trim($data["admin_username"]);
$admin_password = trim($data["admin_password"]);

// ✅ Fetch hashed password from DB
$stmt = $conn->prepare("SELECT admin_id, admin_username, admin_password FROM admin_users WHERE admin_username = ?");
$stmt->bind_param("s", $admin_username);
$stmt->execute();
$result = $stmt->get_result();
$admin = $result->fetch_assoc();

if ($admin) {
    error_log("Fetched admin: " . print_r($admin, true)); // ✅ Debug fetched data
}

if ($admin && password_verify($admin_password, $admin["admin_password"])) { // ⚠️ Use password_verify() if password is hashed
    $_SESSION["admin_id"] = $admin["admin_id"];
    $_SESSION["admin_username"] = $admin["admin_username"];

    setcookie("PHPSESSID", session_id(), [
        "expires" => 0,
        "path" => "/",
        "domain" => "localhost",
        "secure" => false, // ❗ Change to `true` for HTTPS
        "httponly" => true,
        "samesite" => "Lax"
    ]);

    echo json_encode(["success" => true, "message" => "Admin login successful"]);
} else {
    echo json_encode(["success" => false, "message" => "Invalid admin credentials"]);
}

$stmt->close();
$conn->close();
?>
