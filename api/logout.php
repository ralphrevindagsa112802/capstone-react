<?php
session_start();

// ✅ Clear session variables
$_SESSION = [];

// ✅ Destroy session
session_destroy();

// ✅ Expire the session cookie in the browser
if (isset($_COOKIE[session_name()])) {
    setcookie(session_name(), '', time() - 3600, '/');
}

// ✅ Send JSON response
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");
echo json_encode(["success" => true, "message" => "User logged out"]);
?>