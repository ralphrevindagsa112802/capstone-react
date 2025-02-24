<?php
session_start(); // Start session at the top

header("Access-Control-Allow-Origin: http://localhost:5173"); // Allow React frontend
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Database connection
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

// Check if required fields are provided
if (!isset($data["username"], $data["password"])) {
    echo json_encode(["error" => "Missing username or password"]);
    exit();
}

$username = trim($data["username"]);
$password = trim($data["password"]);

// Fetch user details based on username
$stmt = $conn->prepare("SELECT id, f_name, l_name, username, password FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    // Verify the hashed password
    if (password_verify($password, $user["password"])) {
        // Store user info in session
        $_SESSION["user_id"] = $user["id"];
        $_SESSION["f_name"] = $user["f_name"];
        $_SESSION["l_name"] = $user["l_name"];
        $_SESSION["username"] = $user["username"];

        echo json_encode([
            "success" => true,
            "message" => "Login successful",
            "user" => [
                "id" => $user["id"],
                "f_name" => $user["f_name"],
                "l_name" => $user["l_name"],
                "username" => $user["username"]
            ],
        ]);
    } else {
        echo json_encode(["error" => "Incorrect password"]);
    }
} else {
    echo json_encode(["error" => "User not found"]);
}

$stmt->close();
$conn->close();
?>
