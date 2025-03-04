<?php
include __DIR__ . "/db.php";

try {
    $admin_username = "admin";
    $admin_password = password_hash("password123", PASSWORD_DEFAULT); // ✅ Hash before storing

    $stmt = $pdo->prepare("INSERT INTO admin_users (admin_username, admin_password) VALUES (?, ?)");
    $stmt->execute([$admin_username, $admin_password]);

    echo "Admin inserted successfully.";
} catch (PDOException $e) {
    echo "Error inserting admin: " . $e->getMessage();
}
?>