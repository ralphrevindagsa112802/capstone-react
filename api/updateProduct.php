<?php
include 'db.php'; // Ensure this connects to your database

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get data from request
    $food_id = $_POST["food_id"];
    $food_name = $_POST["food_name"];
    $food_description = $_POST["food_description"]; // Ensure consistency
    $category = $_POST["category"];
    $size = $_POST["food_size"]; // Custom size name (e.g., "Regular", "Large")
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

    // Reverse size mapping to match database fields
    $sizeMapping = [
        "Rice Meal" => ["Regular" => "price_small", "Large" => "price_medium", "Extra Large" => "price_large"],
        "Classic Coffee" => ["Small" => "price_small", "Medium" => "price_medium", "Large" => "price_large"],
        "Frappes" => ["Small" => "price_small", "Medium" => "price_medium", "Large" => "price_large"],
        "Smoothies" => ["Small" => "price_small", "Medium" => "price_medium", "Large" => "price_large"],
        "Refreshers" => ["Small" => "price_small", "Medium" => "price_medium", "Large" => "price_large"],
        "Milk Drinks" => ["Small" => "price_small", "Medium" => "price_medium", "Large" => "price_large"],
        "Dessert" => ["Regular" => "price_small"], // Only one size
        "Snacks and Pasta" => ["Regular" => "price_small", "Large" => "price_medium", "Extra Large" => "price_large"]
    ];

    // Get the correct column for the selected size
    $price_column = $sizeMapping[$category][$size] ?? null;
    if (!$price_column) {
        echo json_encode(["success" => false, "message" => "Invalid size for category"]);
        exit();
    }

    // Prepare SQL statement to update the correct price field
    $query = "UPDATE food SET food_name=?, food_description=?, category=?, $price_column=?, image_path=? WHERE food_id=?";
    $stmt = $conn->prepare($query);
    if (!$stmt) {
        die(json_encode(["success" => false, "message" => "Prepare failed: " . $conn->error]));
    }

    $stmt->bind_param("sssssi", $food_name, $food_description, $category, $food_price, $target_file, $food_id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Product updated successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Update failed: " . $stmt->error]);
    }

    $stmt->close();
}
?>
