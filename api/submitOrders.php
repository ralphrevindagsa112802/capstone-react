<?php
header('Content-Type: application/json'); // Set response header to JSON
include 'db.php'; // Include the database connection

// Get raw JSON data from the request body
$data = json_decode(file_get_contents('php://input'), true);

// Validate input data
if (empty($data['user_name']) || empty($data['user_email']) || empty($data['items'])) {
    echo json_encode(["success" => false, "message" => "Invalid input data"]);
    exit;
}

// Extract data
$userName = $conn->real_escape_string($data['user_name']);
$userEmail = $conn->real_escape_string($data['user_email']);
$items = $data['items'];

// Calculate total amount
$totalAmount = 0;
foreach ($items as $item) {
    $totalAmount += $item['price'] * $item['quantity'];
}

// Insert order into the `orders` table
$sql = "INSERT INTO orders (user_name, user_email, total_amount) VALUES ('$userName', '$userEmail', $totalAmount)";
if ($conn->query($sql) === TRUE) {
    $orderId = $conn->insert_id; // Get the ID of the newly inserted order

    // Insert order items into the `order_items` table
    foreach ($items as $item) {
        $productId = $conn->real_escape_string($item['product_id']);
        $quantity = $conn->real_escape_string($item['quantity']);
        $price = $conn->real_escape_string($item['price']);

        $sql = "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($orderId, $productId, $quantity, $price)";
        if (!$conn->query($sql)) {
            echo json_encode(["success" => false, "message" => "Failed to insert order items: " . $conn->error]);
            exit;
        }
    }

    echo json_encode(["success" => true, "order_id" => $orderId]); // Success response
} else {
    echo json_encode(["success" => false, "message" => "Failed to insert order: " . $conn->error]); // Error response
}

$conn->close(); // Close the database connection
?>