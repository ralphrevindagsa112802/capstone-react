<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include "db.php"; // Ensure this file correctly connects to your DB

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['food_id']) && isset($data['size']) && isset($data['availability'])) {
    $food_id = $data['food_id'];
    $size = strtolower($data['size']); // Convert size to lowercase
    $availability = $data['availability'];

    // Determine which column to update based on size
    $column = "";
    if ($size === "small") {
        $column = "availability_small";
    } elseif ($size === "medium") {
        $column = "availability_medium";
    } elseif ($size === "large") {
        $column = "availability_large";
    } else {
        echo json_encode(["error" => "Invalid size"]);
        exit();
    }

    $query = "UPDATE food SET $column = ? WHERE food_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("si", $availability, $food_id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Availability updated"]);
    } else {
        echo json_encode(["error" => $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Invalid input"]);
}

$conn->close();
?>
