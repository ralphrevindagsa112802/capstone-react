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

// ✅ Fetch user details, including first and last name
$stmt = $conn->prepare("SELECT id, f_name, l_name, username, password FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if ($user && password_verify($password, $user["password"])) {
    // ✅ Set session variables
    $_SESSION["user_id"] = $user["id"];
    $_SESSION["username"] = $user["username"];
    $_SESSION["f_name"] = $user["f_name"];
    $_SESSION["l_name"] = $user["l_name"];

    // ✅ Set an HTTP-Only Cookie with the session ID
    setcookie("PHPSESSID", session_id(), [
        "expires" => 0,
        "path" => "/",
        "domain" => "localhost", // Change this to your domain when deploying
        "secure" => false,        // Ensures it's only sent over HTTPS
        "httponly" => true,      // Prevents JavaScript access
        "samesite" => "Lax"      // Prevents CSRF attacks
    ]);

    // ✅ Send user data along with the response
    echo json_encode([
        "success" => true,
        "message" => "Login successful",
        "user" => [
            "id" => $user["id"],
            "username" => $user["username"],
            "f_name" => $user["f_name"],
            "l_name" => $user["l_name"]
        ]
    ]);
} else {
    echo json_encode(["success" => false, "error" => "Invalid credentials"]);
}

$stmt->close();
$conn->close();
?>
