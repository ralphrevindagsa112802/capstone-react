<?php
session_start();
include 'db.php';

header("Access-Control-Allow-Origin: https://capstone-react-nine.vercel.app");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if (!isset($_SESSION["admin_id"])) {
    echo json_encode(["success" => false, "message" => "Unauthorized: Admin login required"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);
$food_id = $data["food_id"];

$stmt = $conn->prepare("DELETE FROM food WHERE food_id=?");
$stmt->bind_param("i", $food_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Product deleted successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to delete product"]);
}

$stmt->close();
$conn->close();
?>
