<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Database connection
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
    $f_name = $data["firstname"];
    $l_name = $data["lastname"];
    $username = $data["username"];
    $email = $data["email"];
    $address = $data["address"];
    $phone = $data["phone"];
    $password = $data["password"];
    $confirmPassword = $data["confirmPassword"];

    // Check if password matches
    if ($password !== $confirmPassword) {
        echo json_encode(["success" => false, "message" => "Passwords do not match"]);
        exit;
    }

    // Check if the email already exists
    $checkEmail = $conn->query("SELECT * FROM users WHERE email='$email'");
    if ($checkEmail->num_rows > 0) {
        echo json_encode(["success" => false, "message" => "Email already exists"]);
        exit;
    }

    // Insert new user
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $query = "INSERT INTO users (f_name, l_name, username, email, address, phone, password) 
              VALUES ('$f_name', '$l_name', '$username', '$email', '$address', '$phone', '$hashedPassword')";

    if ($conn->query($query)) {
        echo json_encode(["success" => true, "message" => "Signup successful"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "message" => "All fields are required"]);
}

$conn->close();
?>