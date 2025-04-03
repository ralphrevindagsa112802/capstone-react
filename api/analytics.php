<?php
// File: analytics.php
session_start();
require_once __DIR__ . "/db.php"; // Ensure correct database connection

header("Access-Control-Allow-Origin: https://admin.yappari-coffee-bar.shop");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");

// Enable error logging
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);

// Ensure admin authentication
if (!isset($_SESSION["admin_id"])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized access']);
    exit();
}

// Get time range parameter with default value
$timeRange = $_GET['timeRange'] ?? 'daily';

// Set appropriate date intervals and formats based on time range
if ($timeRange === 'daily') {
    // Last 7 days, include zero sales days
    $startDate = date('Y-m-d', strtotime('-6 days'));
    $dateFormat = '%Y-%m-%d';
    $intervalDesc = 'last 7 days';
    $includeZeroDays = true;  // Changed to true to include zero sales days
} else if ($timeRange === 'monthly') {
    // Last 30 days, exclude zero sales days
    $startDate = date('Y-m-d', strtotime('-29 days'));
    $dateFormat = '%Y-%m-%d';
    $intervalDesc = 'last 30 days';
    $includeZeroDays = false;
} else if ($timeRange === 'yearly') {
    // Last 12 months, show by month (including zero months)
    $startDate = date('Y-m-01', strtotime('-11 months'));
    $dateFormat = '%Y-%m';
    $intervalDesc = 'last 12 months';
    $includeZeroDays = true;
} else {
    // Default to daily
    $startDate = date('Y-m-d', strtotime('-6 days'));
    $dateFormat = '%Y-%m-%d';
    $intervalDesc = 'last 7 days';
    $includeZeroDays = true;  // Changed to true to include zero sales days
}

try {
    // Verify that database connection exists
    if (!isset($pdo)) {
        throw new Exception("Database connection is not set in db.php.");
    }

    // Validate table existence
    $tables = ["users", "orders", "order_items", "food"];
    foreach ($tables as $table) {
        $checkTable = $pdo->query("SHOW TABLES LIKE '$table'");
        if ($checkTable->rowCount() == 0) {
            throw new Exception("Table '$table' does not exist.");
        }
    }

    // Check correct user ID column
    $userColumn = "user_id"; // Default
    $checkUserColumn = $pdo->query("SHOW COLUMNS FROM users LIKE 'user_id'");
    if ($checkUserColumn->rowCount() == 0) {
        // If user_id doesn't exist, try common alternatives
        $alternatives = ["id", "customer_id", "uid"];
        foreach ($alternatives as $alt) {
            $check = $pdo->query("SHOW COLUMNS FROM users LIKE '$alt'");
            if ($check->rowCount() > 0) {
                $userColumn = $alt;
                break;
            }
        }
    }

    // Get total users with the correct column name
    $usersQuery = "SELECT COUNT(DISTINCT $userColumn) as total_users FROM users";
    $totalUsers = $pdo->query($usersQuery)->fetch()['total_users'];

    // Get aggregated sales data for the specified time range
    if ($includeZeroDays) {
        // Generate date series based on time range
        $datePoints = [];
        
        if ($timeRange === 'yearly') {
            // Generate 12 months for yearly view
            for ($i = 0; $i < 12; $i++) {
                $date = date('Y-m', strtotime("-$i months"));
                $datePoints[$date] = $date;
            }
        } else {
            // Generate daily points for the past 7 days (for daily view)
            $days = ($timeRange === 'daily') ? 7 : 30;
            for ($i = 0; $i < $days; $i++) {
                $date = date('Y-m-d', strtotime("-$i days"));
                $datePoints[$date] = $date;
            }
        }
        
        // Reverse the array to get chronological order (oldest first)
        $datePoints = array_reverse($datePoints, true);
        
        // Get data from database
        $salesQuery = "
            SELECT 
                DATE_FORMAT(created_at, '$dateFormat') as label,
                SUM(total_amount) as amount,
                COUNT(orders_id) as orders
            FROM orders
            WHERE created_at >= ? 
                AND order_status != 'Cancelled'
            GROUP BY label
            ORDER BY label ASC
        ";
        
        $stmt = $pdo->prepare($salesQuery);
        $stmt->execute([$startDate]);
        $salesResults = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Create an associative array with all days/months
        $salesData = [];
        foreach ($datePoints as $date) {
            $salesData[$date] = [
                'label' => $date,
                'amount' => 0,
                'orders' => 0
            ];
        }
        
        // Fill in actual data
        foreach ($salesResults as $row) {
            if (isset($salesData[$row['label']])) {
                $salesData[$row['label']]['amount'] = (float)$row['amount'];
                $salesData[$row['label']]['orders'] = (int)$row['orders'];
            }
        }
        
        // Convert to indexed array
        $salesData = array_values($salesData);
    } else {
        // For monthly view - only include days with sales
        $salesQuery = "
            SELECT 
                DATE_FORMAT(created_at, '$dateFormat') as label,
                SUM(total_amount) as amount,
                COUNT(orders_id) as orders
            FROM orders
            WHERE created_at >= ? 
                AND order_status != 'Cancelled'
            GROUP BY label
            HAVING SUM(total_amount) > 0
            ORDER BY label ASC
        ";
        
        $stmt = $pdo->prepare($salesQuery);
        $stmt->execute([$startDate]);
        $salesData = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Get top products for the selected time period
    $topProductsQuery = "
        SELECT 
            f.food_name as name,
            SUM(oi.quantity) as quantity,
            SUM(oi.price * oi.quantity) as revenue
        FROM order_items oi
        JOIN food f ON oi.food_id = f.food_id
        JOIN orders o ON oi.orders_id = o.orders_id
        WHERE o.created_at >= ? AND o.order_status != 'Cancelled'
        GROUP BY f.food_id
        ORDER BY quantity DESC
        LIMIT 5
    ";

    $stmt = $pdo->prepare($topProductsQuery);
    $stmt->execute([$startDate]);
    $topProducts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Calculate totals
    $totalSales = array_sum(array_column($salesData, 'amount'));
    $totalOrders = array_sum(array_column($salesData, 'orders'));

    // Prepare the response
    $response = [
        'success' => true,
        'timeRange' => $timeRange,
        'intervalDesc' => $intervalDesc,
        'salesData' => $salesData,
        'totalSales' => $totalSales,
        'totalOrders' => $totalOrders,
        'totalUsers' => $totalUsers,
        'topProducts' => $topProducts
    ];

    // Return JSON response
    echo json_encode($response);
} catch (PDOException $e) {
    error_log("Database Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
} catch (Exception $e) {
    error_log("General Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>