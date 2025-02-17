<?php
session_start(); // Start session at the very top

header("Access-Control-Allow-Origin: http://localhost:5173"); // Allow React frontend
header("Access-Control-Allow-Credentials: true"); // Allow session cookies
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "yappari_db");

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["username"], $data["password"])) {
    echo json_encode(["error" => "Missing username or password"]);
    exit();
}

$username = $data["username"];
$password = $data["password"];

$stmt = $conn->prepare("SELECT id, username, password FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    if (password_verify($password, $user["password"])) {
        $_SESSION["user_id"] = $user["id"]; // Store user ID in session
        $_SESSION["username"] = $user["username"]; // Store username in session

        echo json_encode([
            "success" => true,
            "message" => "Login successful",
            "user" => ["id" => $user["id"], "username" => $user["username"]],
        ]);
    } else {
        echo json_encode(["error" => "Incorrect password"]);
    }
} else {
    echo json_encode(["error" => "User not found"]);
}

$conn->close();
?>
