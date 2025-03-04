<?php
session_start();
include __DIR__ . "/db.php";

header("Access-Control-Allow-Origin: https://admin.yappari-coffee-bar.shop");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

error_reporting(E_ALL);
ini_set('display_errors', 1);

// ✅ Handle Preflight Requests
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit(0);
}

// ✅ Ensure Admin is Logged In
if (!isset($_SESSION["admin_id"])) {
    echo json_encode(["success" => false, "message" => "Unauthorized: Admin login required"]);
    exit();
}

// ✅ Get JSON Data
$data = json_decode(file_get_contents("php://input"), true);
error_log("Received Data: " . print_r($data, true));

if (!$data || !isset($data["food_id"]) || !isset($data["size"]) || !isset($data["availability"])) {
    echo json_encode(["success" => false, "message" => "Invalid request - Missing required fields"]);
    exit();
}

$food_id = intval($data["food_id"]);
$size = strtolower(trim($data["size"]));
$availability = ($data["availability"] === "Available") ? "Available" : "Not Available"; // ✅ Ensure correct format

// ✅ Get Category of the Food Item
try {
    $stmt = $pdo->prepare("SELECT category FROM food WHERE food_id = ?");
    $stmt->execute([$food_id]);
    $food = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$food) {
        echo json_encode(["success" => false, "message" => "Food item not found"]);
        exit();
    }

    $category = $food["category"];
    error_log("Category: " . $category);

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

    if (!isset($size_column_map[$category][$size])) {
        echo json_encode(["success" => false, "message" => "Invalid size selection for category: $category"]);
        exit();
    }

    $column = $size_column_map[$category][$size];
    error_log("Column: " . $column);

    // ✅ Update Availability in Database
    $query = "UPDATE food SET $column = :availability WHERE food_id = :food_id";
    $stmt = $pdo->prepare($query);
    $stmt->execute(["availability" => $availability, "food_id" => $food_id]);

    error_log("Query Executed: UPDATE food SET $column = $availability WHERE food_id = $food_id");

    echo json_encode(["success" => true, "message" => "Availability updated successfully"]);
} catch (PDOException $e) {
    error_log("Database Error: " . $e->getMessage());
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}
?>