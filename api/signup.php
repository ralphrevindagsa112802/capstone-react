<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Database connection using PDO
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (
    isset($data["firstname"]) &&
    isset($data["lastname"]) &&
    isset($data["username"]) &&
    isset($data["email"]) &&
    isset($data["address"]) &&
    isset($data["phone"]) &&
    isset($data["password"]) &&
    isset($data["confirmPassword"])
) {
    $f_name = trim($data["firstname"]);
    $l_name = trim($data["lastname"]);
    $username = trim($data["username"]);
    $email = trim($data["email"]);
    $address = trim($data["address"]);
    $phone = trim($data["phone"]);
    $password = $data["password"];
    $confirmPassword = $data["confirmPassword"];

    // ✅ Check if passwords match
    if ($password !== $confirmPassword) {
        echo json_encode(["success" => false, "message" => "Passwords do not match"]);
        exit;
    }

    try {
        // ✅ Check if email already exists
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$email]);

        if ($stmt->fetch()) {
            echo json_encode(["success" => false, "message" => "Email already exists"]);
            exit;
        }

        // ✅ Hash the password
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // ✅ Insert new user
        $stmt = $pdo->prepare("INSERT INTO users (f_name, l_name, username, email, address, phone, password) 
                               VALUES (?, ?, ?, ?, ?, ?, ?)");
        $result = $stmt->execute([$f_name, $l_name, $username, $email, $address, $phone, $hashedPassword]);

        if ($result) {
            echo json_encode(["success" => true, "message" => "Signup successful"]);
        } else {
            echo json_encode(["success" => false, "message" => "Failed to insert user"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "All fields are required"]);
}
?>