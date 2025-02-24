<?php
header("Access-Control-Allow-Origin: ");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Database connection
include 'db.php';

// Get JSON data from request
$data = json_decode(file_get_contents("php://input"), true);

// Debugging: Print received data
file_put_contents("debug.log", print_r($data, true)); // This will create a debug.log file in the API folder

if (!isset($data["username"]) || !isset($data["password"])) {
    echo json_encode(["error" => "Missing username or password"]);
    exit();
}

$username = $data["username"];
$password = $data["password"];

// Query the database
$stmt = $conn->prepare("SELECT * FROM admin_users WHERE username = ? AND password = ?");
$stmt->bind_param("ss", $username, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["success" => true, "message" => "Login successful"]);
} else {
    echo json_encode(["success" => false, "message" => "Invalid credentials"]);
}

$conn->close();
?>
