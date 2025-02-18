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
            "firstname" => $_SESSION["firstname"],
            "lastname" => $_SESSION["lastname"],
            "username" => $_SESSION["username"]
        ]
    ]);
} else {
    echo json_encode(["success" => false, "error" => "User not logged in"]);
}
?>
