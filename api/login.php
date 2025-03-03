<?php
include __DIR__ . "/db.php";

header("Access-Control-Allow-Origin: https://yappari-coffee-bar.vercel.app");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// ✅ Handle CORS preflight request
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    header("HTTP/1.1 200 OK");
    exit();
}

// ✅ Get input data
$raw_input = file_get_contents("php://input");
$data = json_decode($raw_input, true);

if (!$data || !isset($data["username"]) || !isset($data["password"])) {
    echo json_encode(["success" => false, "error" => "Invalid request"]);
    exit();
}

$username = trim($data["username"]);
$password = trim($data["password"]);

try {
    // ✅ Fetch user details
    $stmt = $pdo->prepare("SELECT id, f_name, l_name, username, password FROM users WHERE username = :username");
    $stmt->execute([":username" => $username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user["password"])) {
        // ✅ Return user details without setting PHP sessions
        echo json_encode([
            "success" => true,
            "message" => "Login successful",
            "user" => [
                "id" => $user["id"],
                "username" => $user["username"],
                "f_name" => $user["f_name"],
                "l_name" => $user["l_name"]
            ]
        ]);
    } else {
        echo json_encode(["success" => false, "error" => "Invalid credentials"]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => "Database error: " . $e->getMessage()]);
}
?>