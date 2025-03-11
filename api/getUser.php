<?php
session_start();
include __DIR__ . "/db.php"; // Make sure db.php uses PDO

header("Access-Control-Allow-Origin: https://yappari-coffee-bar.shop");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

// Debugging: Check session values
if (!isset($_SESSION["user_id"])) {
    echo json_encode(["success" => false, "message" => "Unauthorized: Login required", "session_data" => $_SESSION]);
    exit();
}

$user_id = $_SESSION["user_id"];


// Get user points
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'get_points') {
    $userId = $user_id;
    
    $stmt = $pdo->prepare("SELECT points FROM users WHERE id = :userId");
    $stmt->execute([':userId' => $userId]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($result) {
        echo json_encode(["success" => true, "points" => $result['points']]);
    } else {
        echo json_encode(["success" => false, "message" => "User not found"]);
    }
    exit();
}

// Get points history
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'points_history') {
    $userId = $user_id;
    
    $stmt = $pdo->prepare("SELECT * FROM points_history WHERE user_id = :userId ORDER BY transaction_date DESC");
    $stmt->execute([':userId' => $userId]);
    $history = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode(["success" => true, "history" => $history]);
    exit();
}

try {
    // ✅ Use PDO for better security and error handling
    $stmt = $pdo->prepare("SELECT id, username, f_name, l_name, email, phone, address, profile_pic FROM users WHERE id = ?");
    $stmt->execute([$user_id]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        echo json_encode(["success" => true, "user" => $user]);
    } else {
        echo json_encode(["success" => false, "message" => "User not found"]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}
?>