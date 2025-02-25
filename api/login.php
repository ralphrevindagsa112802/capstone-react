<?php
session_start();

header("Access-Control-Allow-Origin: *"); // Allow React frontend
header("Access-Control-Allow-Credentials: include");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "db.php";

// ✅ Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// ✅ Read and decode JSON input
$jsonInput = file_get_contents("php://input");
$data = json_decode($jsonInput, true);

// ✅ Debugging: Log received JSON
file_put_contents("debug_log.txt", "Received JSON: " . print_r($data, true) . "\n", FILE_APPEND);

// ✅ Check if username and password are provided
if (!isset($data['username']) || !isset($data['password'])) {
    echo json_encode(["success" => false, "message" => "Missing username or password"]);
    exit;
}

$username = trim($data['username']);
$password = trim($data['password']);

// ✅ Check if fields are empty
if (empty($username) || empty($password)) {
    echo json_encode(["success" => false, "message" => "Username and password cannot be empty"]);
    exit;
}

// ✅ Fetch user from database
$stmt = $conn->prepare("SELECT id, username, f_name, l_name, password FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();
$stmt->close();

// ✅ Check if user exists
if (!$user) {
    echo json_encode(["success" => false, "message" => "Invalid username or password"]);
    exit;
}

// ✅ Verify hashed password
if (!password_verify($password, $user['password'])) {
    echo json_encode(["success" => false, "message" => "Incorrect password"]);
    exit;
}

// ✅ Set session after successful login
$_SESSION['user_id'] = $user['id'];
$_SESSION['username'] = $user['username'];

echo json_encode([
    "success" => true,
    "user" => [
        "id" => $user['id'],
        "username" => $user['username'],
        "f_name" => $user['f_name'],
        "l_name" => $user['l_name']
    ]
]);

$conn->close();
?>