<?php
session_start();

include 'db.php';

header("Access-Control-Allow-Origin: https://capstone-react-nine.vercel.app");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

    // ✅ Debug: Log session values
    error_log("Session Data: " . print_r($_SESSION, true));

    if (!isset($_SESSION["admin_id"])) {
        echo json_encode([
            "success" => false,
            "message" => "Unauthorized: Admin login required",
            "session_data" => $_SESSION // ✅ Debug: Check session data
        ]);
        exit();
    }

    // ✅ Debug: Check incoming POST data
    error_log("POST Data: " . print_r($_POST, true));
    error_log("FILES Data: " . print_r($_FILES, true));

    // ✅ Ensure required fields exist
    $data = json_decode(file_get_contents("php://input"), true);
    $food_name = $_POST["food_name"] ?? null;
    $category = $_POST["category"] ?? null;
    $price_small = $_POST["price_small"] ?? null;
    $price_medium = $_POST["price_medium"] ?? null;
    $price_large = $_POST["price_large"] ?? null;
    $description = $_POST["description"] ?? null;

    if (!$food_name || !$category) {
        echo json_encode(["success" => false, "message" => "Missing required fields"]);
        exit();
    }

    // ✅ Handle Image Upload
    $target_file = null;
    if (!empty($_FILES["food_img"]["name"])) {
        $image_name = str_replace(" ", "_", $_FILES["food_img"]["name"]);
        $target_dir = $_SERVER["DOCUMENT_ROOT"] . "/capstone-react/public/uploads/";
        $target_file = $target_dir . basename($image_name);

        if (!is_dir($target_dir)) {
            mkdir($target_dir, 0777, true);
        }

        if (move_uploaded_file($_FILES["food_img"]["tmp_name"], $target_file)) {
            $target_file = "/uploads/" . basename($image_name);
        } else {
            echo json_encode(["success" => false, "message" => "Image upload failed"]);
            exit();
        }
    }

    // ✅ Insert into database
    $query = "INSERT INTO food (food_name, category, price_small, price_medium, price_large, description, image_path) 
            VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("sssssss", $food_name, $category, $price_small, $price_medium, $price_large, $description, $target_file);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Product added successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Insert failed: " . $stmt->error]);
    }

$stmt->close();
$conn->close();
?>
