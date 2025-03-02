<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

include 'db.php';

// Check if the user is logged in
if (!isset($_SESSION["user_id"])) {
    echo json_encode(["success" => false, "message" => "User not logged in"]);
    exit();
}
$user_id = $_SESSION["user_id"]; // ✅ Get user ID from session

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    die(json_encode(["success" => false, "error" => "Invalid input."]));
}

// Get user input
$current_password = $data["current_password"] ?? '';
$new_password = $data["new_password"] ?? '';

// Fetch stored password from DB
$stmt = $conn->prepare("SELECT password FROM users WHERE ID = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($stored_password);
$stmt->fetch();

if (!$stored_password) {
    die(json_encode(["success" => false, "error" => "User not found."]));
}

// Verify current password
if (!password_verify($current_password, $stored_password)) {
    die(json_encode(["success" => false, "error" => "Current password is incorrect."]));
}

// Hash the new password before storing
$hashed_password = password_hash($new_password, PASSWORD_DEFAULT);

// Update the password in the database
$stmt = $conn->prepare("UPDATE users SET password = ? WHERE ID = ?");
$stmt->bind_param("si", $hashed_password, $user_id);
if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Password updated successfully."]);
} else {
    echo json_encode(["success" => false, "error" => "Failed to update password."]);
}

$stmt->close();
$conn->close();
?>
