<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$database = "yappari";

$conn = new mysqli($servername, $username, $password, $database);

// Check for connection error
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed"]));
}

// Check if form data is received
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $food_name = $_POST["food_name"];
    $food_description = $_POST["food_description"];
    $food_size = $_POST["food_size"];
    $food_price = $_POST["food_price"];
    $category_id = $_POST["category_id"];
    
    // Handle image upload
    $food_img = null;
    if (isset($_FILES["food_img"])) {
        $target_dir = "uploads/"; // Ensure this folder exists and is writable
        $file_name = time() . "_" . basename($_FILES["food_img"]["name"]);
        $target_file = $target_dir . $file_name;
        
        if (move_uploaded_file($_FILES["food_img"]["tmp_name"], $target_file)) {
            $food_img = $file_name;
        } else {
            echo json_encode(["success" => false, "message" => "Image upload failed"]);
            exit();
        }
    }

    // Insert product into database
    $stmt = $conn->prepare("INSERT INTO food (food_name, food_description, food_size, food_price, food_img, category_id) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssi", $food_name, $food_description, $food_size, $food_price, $food_img, $category_id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Product added successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to add product"]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
}
?>
