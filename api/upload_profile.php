<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include __DIR__ . "/db.php"; // Ensure db.php uses PDO

// ✅ Check if user is logged in
if (!isset($_SESSION["user_id"])) {
    echo json_encode(["success" => false, "error" => "User not logged in."]);
    exit();
}

$user_id = intval($_SESSION["user_id"]); // ✅ Ensure ID is an integer

// ✅ Check if file was uploaded
if (!isset($_FILES["profile_pic"])) {
    echo json_encode(["success" => false, "error" => "No file was uploaded."]);
    exit();
}

// ✅ Check for upload errors
if ($_FILES["profile_pic"]["error"] !== UPLOAD_ERR_OK) {
    echo json_encode(["success" => false, "error" => "File upload error: " . $_FILES["profile_pic"]["error"]]);
    exit();
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
    echo json_encode(["success" => false, "error" => "Failed to move uploaded file."]);
    exit();
}

try {
    // ✅ Save file path in the database
    $query = "UPDATE users SET profile_pic = ? WHERE id = ?";
    $stmt = $pdo->prepare($query);

    if ($stmt->execute([$targetFile, $user_id])) {
        echo json_encode(["success" => true, "profile_pic" => $targetFile]);
    } else {
        echo json_encode(["success" => false, "error" => "Failed to update database."]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => "Database error: " . $e->getMessage()]);
}
?>