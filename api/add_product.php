<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once "db.php"; // Ensure this file correctly connects to your database

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
    exit;
}

$category = isset($_POST["category"]) ? trim($_POST["category"]) : "";

if ($category === "") {
    echo json_encode(["success" => false, "message" => "Category is required"]);
    exit;
}

$food_name = isset($_POST["food_name"]) ? trim($_POST["food_name"]) : "";
$food_description = isset($_POST["food_description"]) ? trim($_POST["food_description"]) : "";
$food_size = isset($_POST["food_size"]) ? trim($_POST["food_size"]) : "";
$food_price = isset($_POST["food_price"]) ? floatval($_POST["food_price"]) : 0;
$category = isset($_POST["category"]) ? trim($_POST["category"]) : "";
$food_img = null;

// Ensure required fields are filled
if (empty($food_name) || empty($food_description) || empty($food_size) || $food_price <= 0 || empty($category)) {
    echo json_encode(["success" => false, "message" => "All fields are required and must be valid"]);
    exit;
}

// Handle image upload if provided
if (!empty($_FILES["food_img"]["name"])) {
    $target_dir = "uploads/";
    if (!is_dir($target_dir)) {
        mkdir($target_dir, 0777, true);
    }
    
    $image_name = basename($_FILES["food_img"]["name"]);
    $target_file = $target_dir . uniqid() . "_" . $image_name;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // Validate image file
    $allowed_types = ["jpg", "jpeg", "png", "gif"];
    if (!in_array($imageFileType, $allowed_types)) {
        echo json_encode(["success" => false, "message" => "Invalid image format (JPG, JPEG, PNG, GIF allowed)"]);
        exit;
    }

    if (move_uploaded_file($_FILES["food_img"]["tmp_name"], $target_file)) {
        $food_img = $target_file;
    } else {
        echo json_encode(["success" => false, "message" => "Failed to upload image"]);
        exit;
    }
}

// Insert data into database
$sql = "INSERT INTO food (food_name, food_description, food_size, food_price, category, food_img) 
        VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssdss", $food_name, $food_description, $food_size, $food_price, $category, $food_img);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Product added successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to add product", "error" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
