<?php
session_start();
header("Access-Control-Allow-Origin: https://capstone-react-nine.vercel.app");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if (isset($_SESSION["admin_id"])) {
    echo json_encode(["success" => true, "admin_id" => $_SESSION["admin_id"]]);
} else {
    echo json_encode(["success" => false, "message" => "No active admin session"]);
}
?>
