<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

// Handle CORS preflight requests
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit(0);
}

// Get the request URI (e.g., `/api/login`)
$request_uri = trim($_SERVER['REQUEST_URI'], '/');

// Ensure the API request starts with "api/"
$api_base_path = "api/";
if (strpos($request_uri, $api_base_path) !== 0) {
    http_response_code(404);
    echo json_encode(["success" => false, "message" => "Invalid API request"]);
    exit;
}

// Extract the API file name (e.g., "login" from "/api/login")
$endpoint = substr($request_uri, strlen($api_base_path));

// Build the file path inside the "api" folder
$api_file = __DIR__ . "/api/" . $endpoint . ".php";

// Check if the requested PHP file exists
if (file_exists($api_file)) {
    include $api_file;
} else {
    http_response_code(404);
    echo json_encode(["success" => false, "message" => "API endpoint not found"]);
}
?>