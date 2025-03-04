<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include 'db.php'; // Ensure this connects using PDO

$category = isset($_GET['category']) ? $_GET['category'] : "All";

try {
    if ($category === "All") {
        $query = "SELECT * FROM food";
        $stmt = $pdo->prepare($query);
        $stmt->execute();
    } else {
        $query = "SELECT * FROM food WHERE category = ?";
        $stmt = $pdo->prepare($query);
        $stmt->execute([$category]);
    }

    $menuItems = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Convert availability (1 = Available, 0 = Not Available)
    foreach ($menuItems as &$item) {
        $item["availability_small"] = $item["availability_small"] == 1 ? "Available" : "Not Available";
        $item["availability_medium"] = $item["availability_medium"] == 1 ? "Available" : "Not Available";
        $item["availability_large"] = $item["availability_large"] == 1 ? "Available" : "Not Available";
    }

    echo json_encode(["success" => true, "data" => $menuItems]);

} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}
?>