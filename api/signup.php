<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); // Allow only React frontend
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "yappari_db");

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}

$data = json_decode(file_get_contents("php://input"), true);

// Validate required fields
if (!isset($data["firstname"], $data["lastname"], $data["username"], $data["password"])) {
    echo json_encode(["error" => "Missing required fields"]);
    exit();
}

$firstname = trim($data["firstname"]);
$lastname = trim($data["lastname"]);
$username = trim($data["username"]);
$password = password_hash($data["password"], PASSWORD_DEFAULT); // Hash password for security

// Check if username already exists
$checkStmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
$checkStmt->bind_param("s", $username);
$checkStmt->execute();
$checkStmt->store_result();
if ($checkStmt->num_rows > 0) {
    echo json_encode(["error" => "Username already exists"]);
    exit();
}
$checkStmt->close();

// Insert user into the database
$stmt = $conn->prepare("INSERT INTO users (firstname, lastname, username, password) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $firstname, $lastname, $username, $password);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Signup successful"]);
} else {
    echo json_encode(["error" => "Signup failed. Please try again."]);
}

$stmt->close();
$conn->close();
?>
