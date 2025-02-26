<?php
session_start();
include 'db.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if (!isset($_SESSION["admin_id"])) {
    echo json_encode(["success" => false, "message" => "Unauthorized: Admin login required"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);
$food_name = $data["food_name"];
$category = $data["category"];
$price_small = $data["price_small"];
$price_medium = $data["price_medium"];
$price_large = $data["price_large"];
$description = $data["description"];

$stmt = $conn->prepare("INSERT INTO food (food_name, category, price_small, price_medium, price_large, description) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $food_name, $category, $price_small, $price_medium, $price_large, $description);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Product added successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to add product"]);
}

$stmt->close();
$conn->close();
?>
