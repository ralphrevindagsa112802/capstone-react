<?php
session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include __DIR__ . "/db.php"; // Ensure db.php uses PDO

// Ensure user is logged in
if (!isset($_SESSION["user_id"])) {
    echo json_encode(["success" => false, "error" => "User not logged in."]);
    exit;
}

// Read JSON input
$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Ensure `user_id` exists and is valid
if (!isset($data['user_id']) || !is_numeric($data['user_id'])) {
    echo json_encode(["success" => false, "error" => "Invalid or missing user ID."]);
    exit;
}

// Allowed updatable fields
$allowed_fields = ['f_name', 'l_name', 'username', 'email', 'phone', 'address'];

$update_fields = [];
$params = [];

// Prepare SQL statement dynamically
foreach ($allowed_fields as $field) {
    if (isset($data[$field]) && !empty(trim($data[$field]))) {
        $update_fields[] = "$field = ?";
        $params[] = $data[$field];
    }
}

// If no fields to update, return error
if (empty($update_fields)) {
    echo json_encode(["success" => false, "error" => "No fields provided for update."]);
    exit;
}

// Add `user_id` to params
$params[] = $data['user_id'];

try {
    $sql = "UPDATE users SET " . implode(", ", $update_fields) . " WHERE id = ?";
    $stmt = $pdo->prepare($sql);

    if ($stmt->execute($params)) {
        echo json_encode(["success" => true, "message" => "Profile updated successfully."]);
    } else {
        echo json_encode(["success" => false, "error" => "Failed to update profile."]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => "Database error: " . $e->getMessage()]);
}
?>