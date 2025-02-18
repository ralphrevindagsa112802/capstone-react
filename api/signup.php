<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "yappari_db");

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["username"], $data["email"], $data["password"], $data["f_name"], $data["l_name"], $data["phone_number"], $data["address"])) {
    echo json_encode(["error" => "Missing required fields"]);
    exit();
}

$username = $data["username"];
$email = $data["email"];
$f_name = $data["f_name"];
$l_name = $data["l_name"];
$phone_number = $data["phone_number"];
$address = $data["address"];
$password = password_hash($data["password"], PASSWORD_DEFAULT); // Secure password

$stmt = $conn->prepare("INSERT INTO users (username, email, f_name, l_name, phone_number, address, password) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssss", $username, $email, $f_name, $l_name, $phone_number, $address, $password);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Signup successful"]);
} else {
    echo json_encode(["success" => false, "message" => "All fields are required"]);
}

$conn->close();
?>
