<?php
session_start();
include 'db.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// ✅ Ensure Admin is Logged In
if (!isset($_SESSION["admin_id"])) {
    echo json_encode(["success" => false, "message" => "Unauthorized: Admin login required"]);
    exit();
}

// ✅ Handle Preflight Requests
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit(0);
}

// ✅ Get JSON Data
$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data["food_id"]) || !isset($data["size"]) || !isset($data["availability"])) {
    echo json_encode(["success" => false, "message" => "Invalid request - Missing required fields"]);
    exit();
}

$food_id = intval($data["food_id"]);
$size = strtolower(trim($data["size"])); // ✅ Ensure lowercase & remove extra spaces
$availability = $data["availability"];

// ✅ Get Category of the Food Item
$stmt = $conn->prepare("SELECT category FROM food WHERE food_id = ?");
$stmt->bind_param("i", $food_id);
$stmt->execute();
$result = $stmt->get_result();
$food = $result->fetch_assoc();
$stmt->close();

if (!$food) {
    echo json_encode(["success" => false, "message" => "Food item not found"]);
    exit();
}

$category = $food["category"];

// ✅ Map Sizes Based on Category
$size_column_map = [
    "Rice Meal" => ["regular" => "availability_small", "large" => "availability_medium", "extra large" => "availability_large"],
    "Classic Coffee" => ["small" => "availability_small", "medium" => "availability_medium", "large" => "availability_large"],
    "Frappes" => ["small" => "availability_small", "medium" => "availability_medium", "large" => "availability_large"],
    "Smoothies" => ["small" => "availability_small", "medium" => "availability_medium", "large" => "availability_large"],
    "Refreshers" => ["small" => "availability_small", "medium" => "availability_medium", "large" => "availability_large"],
    "Milk Drinks" => ["small" => "availability_small", "medium" => "availability_medium", "large" => "availability_large"],
    "Dessert" => ["regular" => "availability_small"],
    "Snacks and Pasta" => ["regular" => "availability_small", "large" => "availability_medium", "extra large" => "availability_large"]
];

// ✅ Get the Correct Column for the Selected Size
if (!isset($size_column_map[$category][$size])) {
    echo json_encode(["success" => false, "message" => "Invalid size selection for category: $category"]);
    exit();
}

$column = $size_column_map[$category][$size];

// ✅ Update Availability in Database
$stmt = $conn->prepare("UPDATE food SET $column = ? WHERE food_id = ?");
$stmt->bind_param("si", $availability, $food_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Availability updated successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Database update failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>