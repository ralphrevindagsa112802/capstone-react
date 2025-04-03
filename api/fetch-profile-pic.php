<?php

// Set CORS headers
header("Access-Control-Allow-Origin: https://admin.yappari-coffee-bar.shop");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Enable error reporting for debugging (Remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Include database connection
require_once __DIR__ . "/db.php";

// Handle preflight OPTIONS request
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

// Validate the user ID
if (!isset($_GET['user_id']) || empty($_GET['user_id'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "No user ID provided"]);
    exit();
}

$user_id = intval($_GET['user_id']); // Sanitize input

// Fetch the profile_pic from the database
$query = "SELECT profile_pic FROM users WHERE ID = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    http_response_code(404);
    echo json_encode(["success" => false, "message" => "User not found"]);
    exit();
}

$row = $result->fetch_assoc();
$profile_pic = $row['profile_pic'];

if (!$profile_pic) {
    http_response_code(404);
    echo json_encode(["success" => false, "message" => "Profile picture not found"]);
    exit();
}

// Define the secure uploads directory (adjust if needed)
$uploadsDir = __DIR__ . "/uploads/"; // Make sure this is the correct path
$filePath = realpath($uploadsDir . $profile_pic);

// Ensure the file exists and is inside the allowed directory
if (!$filePath || !file_exists($filePath) || strpos($filePath, realpath($uploadsDir)) !== 0) {
    http_response_code(404);
    echo json_encode(["success" => false, "message" => "Profile picture file not found"]);
    exit();
}

// Get the file's MIME type securely
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mimeType = finfo_file($finfo, $filePath);
finfo_close($finfo);

// Set headers for file download
header("Content-Type: " . $mimeType);
header("Content-Length: " . filesize($filePath));
header("Cache-Control: no-cache, no-store, must-revalidate");
header("Pragma: no-cache");
header("Expires: 0");

// Read and output the file
readfile($filePath);
exit();

?>
