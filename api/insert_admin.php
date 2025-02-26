<?php
include 'db.php';

// Securely hash the password before inserting
$hashed_password = password_hash("password123", PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO admin_users (username, password) VALUES (?, ?)");
$stmt->bind_param("ss", $username, $hashed_password);
$username = "admin";

if ($stmt->execute()) {
    echo "Admin account created successfully.";
} else {
    echo "Error: " . $conn->error;
}

$stmt->close();
$conn->close();
?>
