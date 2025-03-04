<?php
session_start();
include __DIR__ . "/db.php";

header("Access-Control-Allow-Origin: https://admin.yappari-coffee-bar.shop");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

// ✅ Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// ✅ Ensure admin is logged in
if (!isset($_SESSION["admin_id"])) {
    echo json_encode(["success" => false, "message" => "Unauthorized: Admin login required"]);
    exit();
}

// ✅ Check if request is POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
    exit();
}

// ✅ Get Data from Request
$data = $_POST;
$food_id = $data["food_id"] ?? null;
$food_name = $data["food_name"] ?? "";
$description = $data["description"] ?? "";
$category = $data["category"] ?? "";
$price_small = $data["price_small"] ?? null;
$price_medium = $data["price_medium"] ?? null;
$price_large = $data["price_large"] ?? null;

if (!$food_id || !$food_name || !$category) {
    echo json_encode(["success" => false, "message" => "Missing required fields"]);
    exit();
}

// ✅ Handle Image Upload
$target_file = null;
if (!empty($_FILES["food_img"]["name"])) {
    $image_name = time() . "_" . str_replace(" ", "_", $_FILES["food_img"]["name"]); // Prevent filename conflicts
    $target_dir = __DIR__ . "/uploads/"; // Upload directory
    $target_file = $target_dir . $image_name;

    // ✅ Ensure directory exists
    if (!is_dir($target_dir)) {
        mkdir($target_dir, 0777, true);
    }

    // ✅ Move uploaded file
    if (move_uploaded_file($_FILES["food_img"]["tmp_name"], $target_file)) {
        $target_file = "/uploads/" . $image_name; // ✅ Store relative path in DB
    } else {
        echo json_encode(["success" => false, "message" => "Failed to upload image"]);
        exit();
    }
} else {
    // ✅ Keep existing image if no new one is uploaded
    $stmt = $pdo->prepare("SELECT image_path FROM food WHERE food_id = ?");
    $stmt->execute([$food_id]);
    $existing_image = $stmt->fetchColumn();
    $target_file = $existing_image;
}

// ✅ Update Product Data
try {
    $query = "UPDATE food SET food_name=?, description=?, category=?, price_small=?, price_medium=?, price_large=?, image_path=? WHERE food_id=?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$food_name, $description, $category, $price_small, $price_medium, $price_large, $target_file, $food_id]);

    echo json_encode(["success" => true, "message" => "Product updated successfully"]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}
?>