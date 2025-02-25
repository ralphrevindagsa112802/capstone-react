<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "yappari  "; // Change to your database

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}

if (!isset($_GET['orderId'])) {
    die(json_encode(["error" => "Order ID is required"]));
}

$orderId = $conn->real_escape_string($_GET['orderId']);
$query = "SELECT * FROM orders WHERE order_number = '$orderId'";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode($row);
} else {
    echo json_encode(["error" => "Order not found"]);
}

$conn->close();
?>
