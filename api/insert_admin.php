<?php
include 'db.php';

$admin_username = "admin";
$admin_password = password_hash("password123", PASSWORD_DEFAULT); // ✅ Hash before storing

$stmt = $conn->prepare("INSERT INTO admin_users (admin_username, admin_password) VALUES (?, ?)");
$stmt->bind_param("ss", $admin_username, $admin_password);

if ($stmt->execute()) {
    echo "Admin inserted successfully.";
} else {
    echo "Error inserting admin.";
}

$stmt->close();
$conn->close();
?>
