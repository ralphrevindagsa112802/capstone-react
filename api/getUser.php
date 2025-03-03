<?php
include __DIR__ . "/db.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// ✅ Get the Authorization header from the request
$headers = getallheaders();
if (!isset($headers["Authorization"])) {
    echo json_encode(["success" => false, "message" => "Unauthorized: No token provided"]);
    exit();
}

// ✅ Extract user ID from the Authorization header (frontend must send it)
$user_id = intval($headers["Authorization"]);

if (!$user_id) {
    echo json_encode(["success" => false, "message" => "Invalid user ID"]);
    exit();
}

try {
    // ✅ Fetch user details
    $stmt = $pdo->prepare("SELECT id, username, f_name, l_name, email, phone, address, profile_pic FROM users WHERE id = :user_id");
    $stmt->execute([":user_id" => $user_id]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        echo json_encode(["success" => true, "user" => $user]);
    } else {
        echo json_encode(["success" => false, "message" => "User not found"]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => "Database error: " . $e->getMessage()]);
}
?>
