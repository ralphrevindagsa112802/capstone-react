<?php
session_start();
include __DIR__ . "/db.php";


header("Access-Control-Allow-Origin: https://yappari-coffee-bar.shop");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=UTF-8');

// ✅ Handle CORS preflight request
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit(0);
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
    // ✅ Fetch user details, including first and last name
    $stmt = $pdo->prepare("SELECT id, f_name, l_name, username, password FROM users WHERE username = :username");
    $stmt->execute([":username" => $username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user["password"])) {
        // ✅ Set session variables
        $_SESSION["user_id"] = $user["id"];
        $_SESSION["username"] = $user["username"];
        $_SESSION["f_name"] = $user["f_name"];
        $_SESSION["l_name"] = $user["l_name"];

        // ✅ Set secure session cookie
        setcookie("PHPSESSID", session_id(), [
            "expires" => 0,
            "path" => "/",
            "domain" => "yappari-coffee-bar.shop", // Change for production
            "secure" => true,        // Ensure it's only sent over HTTPS
            "httponly" => true,      // Prevent JavaScript access
            "samesite" => "None"     // Prevent CSRF attacks
        ]);

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