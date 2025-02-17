<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("db.php"); // Import database connection

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["username"], $data["password"])) {
    echo json_encode(["error" => "Missing email or password"]);
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
        echo json_encode(["success" => true, "message" => "Login successful", "token" => md5(uniqid())]);
        session_start();
        $_SESSION['user_id'] = $user['id']; // Store logged-in user ID

    } else {
        echo json_encode(["error" => "Incorrect password"]);
    }
} else {
    echo json_encode(["error" => "User not found"]);
}

$conn->close();
?>
