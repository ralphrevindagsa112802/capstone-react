<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");


$conn = new mysqli("localhost", "root", "", "yappari_db");

if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => "Database connection failed: " . $conn->connect_error]));
}

// Read JSON data
$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Ensure `user_id` exists and is valid
if (!isset($data['user_id']) || !is_numeric($data['user_id'])) {
    die(json_encode(["success" => false, "error" => "Invalid or missing user ID."]));
}

// Prepare dynamic SQL statement
$update_fields = [];
$params = [];
$types = "";

// Allowed updatable fields
$allowed_fields = ['f_name', 'l_name', 'username', 'email', 'phone', 'address'];

foreach ($allowed_fields as $field) {
    if (isset($data[$field]) && !empty(trim($data[$field]))) {
        $update_fields[] = "$field = ?";
        $params[] = $data[$field];
        $types .= "s";
    }
}

// If no fields to update, return error
if (empty($update_fields)) {
    die(json_encode(["success" => false, "error" => "No fields provided for update."]));
}

// Add `user_id` for the WHERE condition
$params[] = $data['user_id'];
$types .= "i";

// Construct and execute query
$sql = "UPDATE users SET " . implode(", ", $update_fields) . " WHERE ID = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    die(json_encode(["success" => false, "error" => "SQL preparation failed: " . $conn->error]));
}

$stmt->bind_param($types, ...$params);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Profile updated successfully."]);
} else {
    echo json_encode(["success" => false, "error" => "Failed to update profile: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
