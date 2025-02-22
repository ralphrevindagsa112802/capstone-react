<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include "db.php"; // Ensure this file correctly connects to your DB

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['food_id']) && isset($data['availability'])) {
    $food_id = $data['food_id'];
    $availability = $data['availability'];

    $query = "UPDATE food SET availability = '$availability' WHERE food_id = $food_id";
    if (mysqli_query($conn, $query)) {
        echo json_encode(["message" => "Availability updated"]);
    } else {
        echo json_encode(["error" => mysqli_error($conn)]);
    }
} else {
    echo json_encode(["error" => "Invalid input"]);
}
?>
