<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Database connection
$servername = "localhost";  // Change if needed
$username = "root";  // Change if using a different database user
$password = "";  // Change if you have a password
$database = "yappari";  // Replace with your actual database name

$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Fetch feedback data
$sql = "SELECT ID, name, email, feedback, comment FROM feedback";  // Ensure table and column names match your DB schema
$result = $conn->query($sql);

$feedbackData = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $feedbackData[] = $row;
    }
}

// Close the database connection
$conn->close();

// Return data as JSON
echo json_encode($feedbackData);
?>
