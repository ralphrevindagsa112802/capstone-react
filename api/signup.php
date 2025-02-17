<?php
// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// CORS headers to allow frontend requests
header("Access-Control-Allow-Origin: http://localhost:5173"); // Allow only frontend
header("Access-Control-Allow-Credentials: true"); // Allow cookies/sessions
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight request
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

// Database connection
$conn = new mysqli("localhost", "root", "", "yappari_db");

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}

// Get request data
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["username"], $data["email"], $data["password"])) {
    echo json_encode(["error" => "Missing required fields"]);
    exit();
}

$username = trim($data["username"]);
$email = trim($data["email"]);
$password = password_hash($data["password"], PASSWORD_DEFAULT); // Hash password securely

// Check if email already exists
$checkEmail = $conn->prepare("SELECT id FROM users WHERE email = ?");
$checkEmail->bind_param("s", $email);
$checkEmail->execute();
$checkEmail->store_result();

if ($checkEmail->num_rows > 0) {
    echo json_encode(["error" => "Email already exists"]);
    $checkEmail->close();
    $conn->close();
    exit();
}
$checkEmail->close();

// Insert new user
$stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $username, $email, $password);

if ($stmt->execute()) {
    $_SESSION["user_id"] = $stmt->insert_id; // Store user session
    $_SESSION["username"] = $username;
    echo json_encode(["success" => true, "message" => "Signup successful"]);
} else {
    echo json_encode(["error" => "Signup failed. Please try again."]);
}

$stmt->close();
$conn->close();
?>
