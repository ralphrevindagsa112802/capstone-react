<?php
$request_uri = $_SERVER['REQUEST_URI'];

// Handle API requests separately
if (strpos($request_uri, '/api/') === 0) {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    header('Content-Type: application/json');
    
    session_start([
        'cookie_lifetime' => 86400, // 1 day
        'cookie_secure' => true, // Only for HTTPS
        'cookie_httponly' => true, // JavaScript cannot access
        'cookie_samesite' => 'None' // Required for cross-site cookies
    ]);

    // Get the API file
    $api_file = __DIR__ . $request_uri . '.php';

    if (file_exists($api_file) && is_file($api_file)) {
        include $api_file;
    } else {
        http_response_code(404);
        echo json_encode(["error" => "API endpoint not found"]);
    }
    exit();
}

// Serve React frontend for all non-API requests
include 'index.html';
?>