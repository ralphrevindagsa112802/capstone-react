<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if (isset($_SESSION["user_id"])) {
    echo json_encode([
        "success" => true,
        "user" => [
            "id" => $_SESSION["user_id"],
            "f_name" => $_SESSION["f_name"],
            "l_name" => $_SESSION["l_name"],
            "username" => $_SESSION["username"]
        ]
    ]);
} else {
    echo json_encode(["success" => false, "error" => "User not logged in"]);
}
?>
