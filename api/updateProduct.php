<?php
include 'db.php'; // Ensure this connects to your database

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get data from request
    $food_id = $_POST["food_id"];
    $food_name = $_POST["food_name"];
    $food_description = $_POST["food_description"];
    $food_size = $_POST["food_size"];
    $category = $_POST["category"];
    $food_price = $_POST["food_price"];
    
    // Check if food_id is provided
    if (empty($food_id)) {
        echo json_encode(["success" => false, "message" => "Missing food_id"]);
        exit();
    }

    // Handle image upload
    if (!empty($_FILES["food_img"]["name"])) {
        $image = $_FILES["food_img"]["name"];
        $target_dir = "uploads/";
        $target_file = $target_dir . basename($image);
        move_uploaded_file($_FILES["food_img"]["tmp_name"], $target_file);
    } else {
        $target_file = $_POST["existing_image"] ?? ""; // Use existing image if available
    }

    // Debug: Check if values are received correctly
    error_log("Updating food_id: " . $food_id);

    // Prepare SQL statement
    $query = "UPDATE food SET food_name=?, food_description=?, food_size=?, category=?, food_price=?, food_img=? WHERE food_id=?";
    $stmt = $conn->prepare($query);
    if (!$stmt) {
        die(json_encode(["success" => false, "message" => "Prepare failed: " . $conn->error]));
    }

    $stmt->bind_param("ssssssi", $food_name, $food_description, $food_size, $category, $food_price, $target_file, $food_id);
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Product updated successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Update failed: " . $stmt->error]);
    }

    $stmt->close();
}
?>
