<?php
session_start();

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include __DIR__ . "/db.php"; // Ensure db.php initializes PDO correctly

// Check if user is logged in
if (!isset($_SESSION["user_id"])) {
    echo json_encode(["success" => false, "message" => "Unauthorized: Please log in"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['orders_id']) || !isset($data['feedback']) || !isset($data['score'])) {
    echo json_encode(["success" => false, "message" => "Missing required fields"]);
    exit();
}

$orders_id = intval($data['orders_id']);
$feedback = trim($data['feedback']);
$score = intval($data['score']);

if ($score < 1 || $score > 5) {
    echo json_encode(["success" => false, "message" => "Invalid score. Must be between 1 and 5"]);
    exit();
}

try {
    $stmt = $pdo->prepare("UPDATE orders SET order_feedback = :feedback, feedback_score = :score WHERE orders_id = :orders_id AND user_id = :user_id");
    $stmt->bindParam(":feedback", $feedback, PDO::PARAM_STR);
    $stmt->bindParam(":score", $score, PDO::PARAM_INT);
    $stmt->bindParam(":orders_id", $orders_id, PDO::PARAM_INT);
    $stmt->bindParam(":user_id", $_SESSION["user_id"], PDO::PARAM_INT);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Feedback submitted successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to submit feedback"]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}
?>
