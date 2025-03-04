<?php
session_set_cookie_params([
    'lifetime' => 86400, // 1 day
    'path' => '/',
    'domain' => '.yappari-coffee-bar.shop', // ✅ Allows session sharing across subdomains
    'secure' => true, // ✅ Use true if running on HTTPS
    'httponly' => true,
    'samesite' => 'None' // ✅ Required for cross-site cookies
]);

session_start();
header("Access-Control-Allow-Origin: https://admin.yappari-coffee-bar.shop"); // ✅ Adjust to your admin subdomain
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if (isset($_SESSION["admin_id"])) {
    echo json_encode(["success" => true, "admin_id" => $_SESSION["admin_id"]]);
} else {
    echo json_encode(["success" => false, "message" => "No active admin session"]);
}
?>