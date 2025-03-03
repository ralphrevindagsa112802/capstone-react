<?php
$host = "blueviolet-vulture-695342.hostingersite.com";
$dbname = "u580700656_yappari";
$username = "u580700656_yapadmin";
$password = "]hVQ3n8Kc18";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(["error" => "Database connection failed: " . $e->getMessage()]));
}
?>