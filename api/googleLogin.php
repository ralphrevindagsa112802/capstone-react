<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

require '../vendor/autoload.php'; // Adjust path if needed
use Google\Client;

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->token)) {
    echo json_encode(["error" => "No token provided"]);
    exit;
}

try {
    $payload = $client->verifyIdToken($data->token);

    if ($payload) {
        $userId = $payload['sub'];
        $email = $payload['email'];
        $name = $payload['name'];

        echo json_encode(["success" => true, "user" => ["id" => $userId, "email" => $email, "name" => $name]]);
    } else {
        echo json_encode(["error" => "Invalid token"]);
    }
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
