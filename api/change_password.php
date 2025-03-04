<?php
session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

include __DIR__ . "/db.php"; // Ensure db.php uses PDO

// Check if user is logged in
if (!isset($_SESSION["user_id"])) {
    echo json_encode(["success" => false, "message" => "User not logged in"]);
    exit();
}

$user_id = $_SESSION["user_id"];

// Read JSON input
$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data["current_password"]) || !isset($data["new_password"])) {
    echo json_encode(["success" => false, "error" => "Invalid input."]);
    exit();
}

$current_password = $data["current_password"];
$new_password = $data["new_password"];

try {
    // Fetch stored password from database
    $stmt = $pdo->prepare("SELECT password FROM users WHERE id = ?");
    $stmt->execute([$user_id]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode(["success" => false, "error" => "User not found."]);
        exit();
    }

    $stored_password = $user["password"];

    // Verify current password
    if (!password_verify($current_password, $stored_password)) {
        echo json_encode(["success" => false, "error" => "Current password is incorrect."]);
        exit();
    }

    // Hash the new password before storing
    $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);

    // Update the password in the database
    $stmt = $pdo->prepare("UPDATE users SET password = ? WHERE id = ?");
    if ($stmt->execute([$hashed_password, $user_id])) {
        echo json_encode(["success" => true, "message" => "Password updated successfully."]);
    } else {
        echo json_encode(["success" => false, "error" => "Failed to update password."]);
    }

} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => "Database error: " . $e->getMessage()]);
}
?>