<?php
session_start();
include 'db.php';

header("Access-Control-Allow-Origin: http://localhost:5173"); // ✅ Allow frontend
header("Access-Control-Allow-Credentials: true"); // ✅ Allow cookies
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight (OPTIONS) requests
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit(0);
}

$raw_input = file_get_contents("php://input");
$data = json_decode($raw_input, true);

if (!$data || !isset($data["username"]) || !isset($data["password"])) {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
    exit();
}

$username = trim($data["username"]);
$password = trim($data["password"]);

// ✅ Fetch hashed password from DB
$stmt = $conn->prepare("SELECT id, username, password FROM admin_users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
$admin = $result->fetch_assoc();

if ($admin && password_verify($password, $admin["password"])) {
    $_SESSION["admin_id"] = $admin["id"];
    $_SESSION["admin_username"] = $admin["username"];

    setcookie("PHPSESSID", session_id(), [
        "expires" => 0,
        "path" => "/",
        "domain" => "localhost",
        "secure" => false, // ❗ Change to `true` for HTTPS
        "httponly" => true,
        "samesite" => "Lax"
    ]);

    echo json_encode(["success" => true, "message" => "Admin login successful", "admin" => ["username" => $admin["username"]]]);
} else {
    echo json_encode(["success" => false, "message" => "Invalid admin credentials"]);
}

$stmt->close();
$conn->close();
?>
