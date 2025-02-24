<?php
$host = "localhost";
$user = "root"; // Default for XAMPP
$password = ""; // Default is empty in XAMPP
$database = "yappari_db";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

?>
