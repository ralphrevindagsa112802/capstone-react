<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include 'db.php'; // Ensure this connects to your database

$category = isset($_GET['category']) ? $_GET['category'] : "All"; // Get category from URL

if ($category === "All") {
    $query = "SELECT * FROM food";
    $stmt = $conn->prepare($query);
} else {
    $query = "SELECT * FROM food WHERE category = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $category);
}

$stmt->execute();
$result = $stmt->get_result();
$menuItems = [];

while ($row = $result->fetch_assoc()) {
    $menuItems[] = [
        "food_id" => $row["food_id"],
        "food_name" => $row["food_name"],
        "category" => $row["category"],
        "description" => $row["description"],
        "price_small" => $row["price_small"],
        "price_medium" => $row["price_medium"],
        "price_large" => $row["price_large"],
        "availability_small" => $row["availability_small"] ?: "Not Available",
        "availability_medium" => $row["availability_medium"] ?: "Not Available",
        "availability_large" => $row["availability_large"] ?: "Not Available",
        "image_path" => $row["image_path"]
    ];
}

echo json_encode(["success" => true, "data" => $menuItems]);

$stmt->close();
$conn->close();
?>
