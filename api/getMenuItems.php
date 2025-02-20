<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

// Database connection
include 'db.php';

// Fetch menu items
$sql = "SELECT * FROM food";

$result = $conn->query($sql);

$menuItems = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $menuItems[] = $row;
    }
}

// Return JSON response
echo json_encode($menuItems);
$conn->close();
?>
