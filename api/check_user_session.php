<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// ✅ Debugging: Log session data for testing
error_log("Session Data: " . print_r($_SESSION, true));

// ✅ Check if the user is logged in
if (!empty($_SESSION["user_id"])) {
    echo json_encode([
        "success" => true,
        "user_id" => $_SESSION["user_id"],
        "username" => $_SESSION["username"] ?? null,
        "f_name" => $_SESSION["f_name"] ?? null,
        "l_name" => $_SESSION["l_name"] ?? null
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "No active user session"
    ]);
}
?>