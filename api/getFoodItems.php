<?php
header('Content-Type: application/json'); // Set response header to JSON
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
include 'db.php'; // Include the database connection

// Query to fetch products
$sql = "SELECT * FROM food";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $food = [];
    while ($row = $result->fetch_assoc()) {
        $food[] = $row;
    }
    echo json_encode(["success" => true, "data" => $food]); // Return products as JSON
} else {
    echo json_encode(["success" => false, "message" => "No products found"]); // No products found
}

$conn->close(); // Close the database connection
?>