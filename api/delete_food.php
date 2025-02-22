<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once "db.php"; // Ensure this file correctly connects to your database

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["food_id"])) {
    echo json_encode(["success" => false, "message" => "Missing food ID"]);
    exit;
}

$food_id = intval($data["food_id"]);

// Delete query
$sql = "DELETE FROM food WHERE food_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $food_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Item deleted successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to delete item"]);
}

$stmt->close();
$conn->close();
?>
