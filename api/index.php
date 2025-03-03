<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Get the requested route
$route = isset($_GET['route']) ? $_GET['route'] : '';

// Define the path to the API folder
$apiFolder = __DIR__ . '/';

// Check if the requested file exists (e.g., `users.php`, `orders.php`, etc.)
$file = $apiFolder . $route . '.php';

if (file_exists($file) && is_file($file)) {
    include $file;
} else {
    http_response_code(404);
    echo json_encode(["error" => "API endpoint not found"]);
}
?>