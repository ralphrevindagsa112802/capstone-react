<?php
header("Access-Control-Allow-Origin: https://yappari-coffee-bar.vercel.app"); // ✅ Allow only your frontend
header("Access-Control-Allow-Credentials: true"); // ✅ Required for session cookies
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// ✅ Handle CORS preflight requests
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

// ✅ Check session
if (isset($_GET["user_id"])) {
    echo json_encode(["success" => true, "user_id" => $_GET["user_id"]]);
} else {
    echo json_encode(["success" => false, "message" => "No active user session"]);
}
?>