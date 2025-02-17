<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

header("Access-Control-Allow-Origin: http://localhost:3000"); // Allow only your frontend
header("Access-Control-Allow-Credentials: true"); // Allow cookies/sessions
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight (OPTIONS) request
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

$conn = new mysqli("localhost", "root", "", "yappari_db");

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["username"], $data["password"])) {
    echo json_encode(["error" => "Missing email or password"]);
    exit();
}

$username = $data["username"];
$password = $data["password"];

$stmt = $conn->prepare("SELECT id, username, password FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    if (password_verify($password, $user["password"])) {
        $_SESSION["user_id"] = $user["id"]; // Store user session
        $_SESSION["username"] = $user["username"];
        echo json_encode(["success" => true, "message" => "Login successful"]);
    } else {
        echo json_encode(["error" => "Incorrect password"]);
    }
} else {
    echo json_encode(["error" => "User not found"]);
}

$conn->close();
