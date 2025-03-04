<?php
header("Access-Control-Allow-Origin: https://admin.yappari-coffee-bar.shop");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include __DIR__ . "/db.php"; // Ensure db.php uses PDO

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

    foreach ($menuItems as &$item) {
        $item["availability_small"] = ($item["availability_small"] === "Available") ? "Available" : "Not Available";
        $item["availability_medium"] = ($item["availability_medium"] === "Available") ? "Available" : "Not Available";
        $item["availability_large"] = ($item["availability_large"] === "Available") ? "Available" : "Not Available";
    }    

    echo json_encode(["success" => true, "data" => $menuItems]);

} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}
?>