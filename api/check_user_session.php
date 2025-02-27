<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if (isset($_SESSION["user_id"])) {
    echo json_encode(["success" => true, "user_id" => $_SESSION["user_id"]]);
} else {
    echo json_encode(["success" => false, "message" => "No active user session"]);
}
?>
