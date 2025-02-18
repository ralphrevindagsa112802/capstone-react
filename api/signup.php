<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); // Allow only React frontend
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "yappari");

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["username"], $data["email"], $data["password"])) {
    echo json_encode(["error" => "Missing required fields"]);
    exit();
}

$username = $data["username"];
$email = $data["email"];
$password = password_hash($data["password"], PASSWORD_DEFAULT); // Secure password

$stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $username, $email, $password);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Signup successful"]);
} else {
    echo json_encode(["error" => "Email already exists"]);
}

$stmt->close();
$conn->close();
?>
