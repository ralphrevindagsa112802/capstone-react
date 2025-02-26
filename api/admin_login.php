<?php
session_start();
include 'db.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$raw_input = file_get_contents("php://input");
$data = json_decode($raw_input, true);

if (!$data || !isset($data["username"]) || !isset($data["password"])) {
    echo json_encode(["success" => false, "error" => "Invalid request"]);
    exit();
}

$username = trim($data["username"]);
$password = trim($data["password"]);

// ✅ Fetch admin details
$stmt = $conn->prepare("SELECT id, username, password FROM admin_users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
$admin = $result->fetch_assoc();

if ($admin && password_verify($password, $admin["password"])) {
    // ✅ Set session variables
    $_SESSION["admin_id"] = $admin["id"];
    $_SESSION["admin_username"] = $admin["username"];

    // ✅ Set secure HTTP-Only session cookie
    setcookie("PHPSESSID", session_id(), [
        "expires" => 0,
        "path" => "/",
        "domain" => "localhost",
        "secure" => true,
        "httponly" => true,
        "samesite" => "Lax"
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Admin login successful",
        "admin" => [
            "id" => $admin["id"],
            "username" => $admin["username"]
        ]
    ]);
} else {
    echo json_encode(["success" => false, "error" => "Invalid admin credentials"]);
}

$stmt->close();
$conn->close();
?>
