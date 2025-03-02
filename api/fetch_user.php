<?php
session_start();

header("Access-Control-Allow-Origin: https://capstone-react-nine.vercel.app");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");

include 'db.php';


if (isset($_SESSION["user_id"])) {
    $user_id = $_SESSION["user_id"];

    // ✅ Fetch `profile_pic`
    $query = "SELECT ID AS user_id, username, f_name, l_name, email, phone, address, profile_pic FROM users WHERE ID = ?";
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
