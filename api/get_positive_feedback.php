<?php 
// Allow requests from the domain where your React app is hosted
header("Access-Control-Allow-Origin: https://yappari-coffee-bar.shop"); // Or specifically set it to your React app's domain
header("Access-Control-Allow-Credentials: true"); 
header("Access-Control-Allow-Methods: GET, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, Authorization"); 
header("Content-Type: application/json"); 
 
// Enable error reporting for debugging 
error_reporting(E_ALL); 
ini_set('display_errors', 1); 
 
// Handle preflight OPTIONS request 
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") { 
    http_response_code(200); 
    exit(); 
} 
 
// ✅ Step 1: Force Load db.php & Check if Exists 
$path = realpath(__DIR__ . "/db.php"); 
if (!$path || !file_exists($path)) { 
    echo json_encode(["success" => false, "message" => "db.php file not found: " . $path]); 
    exit(); 
} 
 
include_once $path; 
clearstatcache(); // Refresh PHP file cache 
 
// ✅ Step 2: Check If $pdo is Defined 
if (!isset($pdo)) { 
    echo json_encode(["success" => false, "message" => "Database connection is not initialized in db.php"]); 
    exit(); 
} 
 
// ✅ Step 3: Fetch Positive Feedback 

try { 
    // First, count all records
    $countQuery = "SELECT COUNT(*) as total FROM orders";
    $countStmt = $pdo->prepare($countQuery);
    $countStmt->execute();
    $totalCount = $countStmt->fetch(PDO::FETCH_ASSOC)['total'];
    
    // Then count records matching your criteria
    $matchingQuery = "SELECT COUNT(*) as matching FROM orders 
                      WHERE feedback_score >= 3 
                      AND order_feedback IS NOT NULL 
                      AND order_feedback != ''";
    $matchingStmt = $pdo->prepare($matchingQuery);
    $matchingStmt->execute();
    $matchingCount = $matchingStmt->fetch(PDO::FETCH_ASSOC)['matching'];
    
    // Original query for actual data
    $query = "SELECT  
                orders_id,  
                user_id,  
                order_feedback,  
                feedback_score,  
                DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS formatted_date 
              FROM orders  
              WHERE feedback_score >= 3  
                AND order_feedback IS NOT NULL  
                AND order_feedback != ''  
              ORDER BY created_at DESC  
              LIMIT 10"; 
 
    $stmt = $pdo->prepare($query); 
    $stmt->execute(); 
    $feedbacks = $stmt->fetchAll(); 
    
    // Return JSON Response with debug info
    echo json_encode([
        "success" => true, 
        "feedbacks" => $feedbacks, 
        "debug" => [
            "total_records" => $totalCount,
            "matching_records" => $matchingCount,
            "returned_records" => count($feedbacks)
        ]
    ]); 
} catch (PDOException $e) { 
    http_response_code(500); 
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]); 
} 
?>