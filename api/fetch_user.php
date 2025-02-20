<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Database connection
include 'db.php';

if (isset($_SESSION["user_id"])) {
    $user_id = $_SESSION["user_id"];
    
    $query = "SELECT username, f_name, l_name, email, phone_number, address FROM users WHERE ID = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($row = $result->fetch_assoc()) {
        echo json_encode(["success" => true, "user" => $row]);
    } else {
        echo json_encode(["success" => false, "error" => "User not found"]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "error" => "User not logged in"]);
}

$conn->close();
?>
