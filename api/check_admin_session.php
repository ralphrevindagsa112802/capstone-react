<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

if (!isset($_SESSION["admin_id"])) {
    echo json_encode(["success" => false, "message" => "Admin not authenticated"]);
    exit();
}

echo json_encode(["success" => true, "message" => "Admin is authenticated"]);
?>
