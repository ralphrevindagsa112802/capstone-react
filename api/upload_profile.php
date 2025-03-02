<?php
session_start();
header("Access-Control-Allow-Origin: https://yappari-coffee-bar.vercel.app");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

include 'db.php';

// ✅ Check if user is logged in
if (!isset($_SESSION["user_id"])) {
    die(json_encode(["success" => false, "error" => "User ID not found in session."]));
}
$user_id = intval($_SESSION["user_id"]); // ✅ Ensure ID is an integer

// ✅ Debugging: Check user ID
file_put_contents("debug_user_id.txt", "User ID: " . $user_id . "\n");

// ✅ Check if file was uploaded
if (!isset($_FILES["profile_pic"])) {
    die(json_encode(["success" => false, "error" => "No file was uploaded."]));
}

// ✅ Check for upload errors
if ($_FILES["profile_pic"]["error"] !== UPLOAD_ERR_OK) {
    die(json_encode(["success" => false, "error" => "File upload error: " . $_FILES["profile_pic"]["error"]]));
}

// ✅ Set upload directory
$uploadDir = __DIR__ . "/uploads/";
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

// ✅ Generate a unique filename
$filename = time() . "_" . basename($_FILES["profile_pic"]["name"]);
$targetFile = "uploads/" . $filename;

// ✅ Move the uploaded file
if (!move_uploaded_file($_FILES["profile_pic"]["tmp_name"], $uploadDir . $filename)) {
    die(json_encode(["success" => false, "error" => "Failed to move uploaded file."]));
}

// ✅ Debugging: Log SQL query before execution
file_put_contents("debug_sql.txt", "Query: UPDATE users SET profile_pic = '$targetFile' WHERE ID = $user_id\n", FILE_APPEND);

// ✅ Save file path in the database
$query = "UPDATE users SET profile_pic = ? WHERE ID = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("si", $targetFile, $user_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "profile_pic" => $targetFile]);
} else {
    echo json_encode(["success" => false, "error" => "Database update failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
