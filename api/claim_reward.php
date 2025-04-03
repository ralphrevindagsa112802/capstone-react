<?php
// File: claim_reward.php

// Enable CORS and set content type

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");
// Include database connection
require_once '/db.php';

// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        'success' => false,
        'error' => 'User not authenticated'
    ]);
    exit;
}

// Get user ID from session
$user_id = $_SESSION['user_id'];

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get JSON data from request
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validate request data
    if (!isset($data['points_to_reset']) || $data['points_to_reset'] !== true) {
        echo json_encode([
            'success' => false,
            'error' => 'Invalid request parameters'
        ]);
        exit;
    }
    
    try {
        // Begin transaction
        $conn->beginTransaction();
        
        // Get current points
        $stmt = $conn->prepare("SELECT points FROM users WHERE id = ?");
        $stmt->execute([$user_id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$row) {
            throw new Exception("User not found");
        }
        
        $currentPoints = floatval($row['points']);
        
        // Check if user has enough points
        if ($currentPoints < 40) {
            throw new Exception("Not enough points");
        }
        
        // Generate a unique claim code
        $claimCode = generateRandomCode();
        
        // Record the redemption in a separate table for tracking
        $stmt = $conn->prepare("INSERT INTO reward_claims (user_id, points_used, claim_code, claimed_at) VALUES (?, ?, ?, NOW())");
        $stmt->execute([$user_id, 40, $claimCode]);
        
        // Reset user points to 0
        $stmt = $conn->prepare("UPDATE users SET points = 0 WHERE id = ?");
        $stmt->execute([$user_id]);
        
        // Commit transaction
        $conn->commit();
        
        // Return success response
        echo json_encode([
            'success' => true,
            'message' => 'Reward claimed successfully',
            'claim_code' => $claimCode
        ]);
        
    } catch (Exception $e) {
        // Roll back transaction on error
        $conn->rollBack();
        
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ]);
    }
} else {
    // Handle non-POST requests
    echo json_encode([
        'success' => false,
        'error' => 'Method not allowed'
    ]);
}

// Function to generate a random claim code
function generateRandomCode($length = 6) {
    $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    $code = '';
    for ($i = 0; $i < $length; $i++) {
        $code .= $characters[rand(0, strlen($characters) - 1)];
    }
    return $code;
}
?>