<?php
session_start();

include 'db.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

error_log("Session Data: " . print_r($_SESSION, true));

if (!isset($_SESSION["admin_id"])) {
    echo json_encode([
        "success" => false,
        "message" => "Unauthorized: Admin login required",
        "session_data" => $_SESSION // ✅ Debug: Check session data
    ]);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    error_log("POST Data: " . print_r($_POST, true));

    // ✅ Get Data from Request
    $food_id = $_POST["food_id"] ?? null;
    $food_name = $_POST["food_name"] ?? "";
    $description = $_POST["description"] ?? "";
    $category = $_POST["category"] ?? "";
    $price_small = $_POST["price_small"] ?? null;
    $price_medium = $_POST["price_medium"] ?? null;
    $price_large = $_POST["price_large"] ?? null;

    if (!$food_id || !$food_name || !$category) {
        echo json_encode(["success" => false, "message" => "Missing required fields"]);
        exit();
    }

    // ✅ Handle Image Upload
    $target_file = null;
    if (!empty($_FILES["food_img"]["name"])) {
        $image = $_FILES["food_img"]["name"];

        // ✅ Set the correct path to React's public folder
        $target_dir = $_SERVER["DOCUMENT_ROOT"] . "/capstone-react/public/uploads/";
        $target_file = $target_dir . basename($_FILES["food_img"]["name"]);

        // ✅ Ensure the directory exists
        if (!is_dir($target_dir)) {
            mkdir($target_dir, 0777, true); // Create uploads folder if missing
        }

        // ✅ Fix spaces in filenames
        $image_name = str_replace(" ", "_", $_FILES["food_img"]["name"]);
        $target_file = $target_dir . basename($image_name);

        // ✅ Move the file to React's `public/uploads/`
        if (move_uploaded_file($_FILES["food_img"]["tmp_name"], $target_file)) {
            error_log("File uploaded successfully: " . $target_file);
            $target_file = "/uploads/" . basename($image_name); // Relative path for frontend
        } else {
            error_log("Failed to upload file: " . $_FILES["food_img"]["error"]);
            echo json_encode(["success" => false, "message" => "Failed to upload image"]);
            exit();
        }


    } else {
        // ✅ Keep the existing image if no new one is uploaded
        $query = "SELECT image_path FROM food WHERE food_id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("i", $food_id);
        $stmt->execute();
        $stmt->bind_result($existing_image);
        $stmt->fetch();
        $stmt->close();
        
        $target_file = $existing_image; // ✅ Keep existing image path
    }

    // ✅ Prepare SQL Statement
    $query = "UPDATE food SET food_name=?, description=?, category=?, price_small=?, price_medium=?, price_large=?, image_path=? WHERE food_id=?";
    $stmt = $conn->prepare($query);

    if (!$stmt) {
        die(json_encode(["success" => false, "message" => "Prepare failed: " . $conn->error]));
    }

    $stmt->bind_param("sssssssi", $food_name, $description, $category, $price_small, $price_medium, $price_large, $target_file, $food_id);
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Product updated successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Update failed: " . $stmt->error]);
    }

    $stmt->close();
}
?>