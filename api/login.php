<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173"); // ✅ Allow Vite frontend
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight (OPTIONS) requests
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit(0);
}

// Database connection
include 'db.php';

$raw_input = file_get_contents("php://input");
$data = json_decode($raw_input, true);

// Debugging
file_put_contents("debug.txt", "RAW: " . $raw_input);

if ($data === null) {
    // Fallback to $_POST if JSON fails
    $data = $_POST;
    file_put_contents("debug.txt", "FALLBACK TO POST: " . json_encode($data));
}

if (!isset($data["username"]) || !isset($data["password"])) {
    echo json_encode([
        "error" => "Missing username or password",
        "received_data" => $data
    ]);
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
        exit();
    }
} else {
    echo json_encode(["error" => "User not found"]);
    exit();
}

$stmt->close();
$conn->close();
?>
