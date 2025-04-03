<?php
require_once 'db.php'; // Ensure this file contains a working PDO connection
header('Access-Control-Allow-Origin: https://admin.yappari-coffee-bar.shop');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

try {
    // Check if the database connection exists
    if (!isset($pdo)) {
        throw new Exception("Database connection is not set in db.php.");
    }
    
    // Check if 'food' table exists
    $tableCheck = $pdo->query("SHOW TABLES LIKE 'food'");
    if ($tableCheck->rowCount() == 0) {
        throw new Exception("Table 'food' does not exist.");
    }
    
    // Query to fetch dishes with all size information
    $stmt = $pdo->query("SELECT 
        food_id, 
        food_name AS dish_name, 
        category, 
        price_small,
        price_medium,
        price_large,
        availability_small,
        availability_medium,
        availability_large
    FROM food");
    
    $dishes = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Check if data is fetched
    if (!$dishes) {
        error_log("Warning: No dishes found in the database.");
    }
    
    echo json_encode(["success" => true, "dishes" => $dishes]);
} catch (PDOException $e) {
    error_log("Database Error: " . $e->getMessage());
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
} catch (Exception $e) {
    error_log("General Error: " . $e->getMessage());
    echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
}
?>