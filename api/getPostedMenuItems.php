<?php
include 'db.php';

$sql = "SELECT * FROM menu_items WHERE status = 'Posted'";
$result = $conn->query($sql);

$menuItems = [];

while ($row = $result->fetch_assoc()) {
    $menuItems[] = $row;
}

echo json_encode($menuItems);

$conn->close();
?>
