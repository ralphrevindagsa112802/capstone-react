<?php
require_once 'vendor/autoload.php'; // Load Google Client Library

session_start(); // Start the session for user authentication


// Database connection
include __DIR__ . "/db.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Get POST request data
$input = json_decode(file_get_contents("php://input"), true);

if (isset($input["credential"])) {
    // Google OAuth Login Flow
    $client = new Google_Client(['client_id' => '702818809229-bk6vh4bk1v766flofh0vk6rna342gcq1.apps.googleusercontent.com']); // Replace with your Google Client ID
    $idToken = $input["credential"];

    try {
        $payload = $client->verifyIdToken($idToken);
        if ($payload) {
            $email = $payload["email"];
            $name = $payload["name"];
            $googleId = $payload["sub"];

            // Check if user exists
            $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                // User exists, retrieve data
                $user = $result->fetch_assoc();
                $_SESSION["user_id"] = $user["id"];
                $_SESSION["user_name"] = $user["username"];
                $_SESSION["f_name"] = $user["f_name"];
                $_SESSION["l_name"] = $user["l_name"];

                 // ✅ Set secure session cookie
                setcookie("PHPSESSID", session_id(), [
                    "expires" => 0,
                    "path" => "/",
                    "domain" => "yappari-coffee-bar.shop", // Change for production
                    "secure" => true,        // Ensure it's only sent over HTTPS
                    "httponly" => true,      // Prevent JavaScript access
                    "samesite" => "None"     // Prevent CSRF attacks
                ]);

                echo json_encode(["success" => true, "message" => "Login successful", "user" => $_SESSION]);
            } else {
                // Create new user with Google details
                $username = explode(" ", $name)[0] . rand(1000, 9999); // Generate a unique username
                $stmt = $conn->prepare("INSERT INTO users (username, f_name, l_name, email, google_id) VALUES (?, ?, ?, ?, ?)");
                $nameParts = explode(" ", $name);
                $f_name = $nameParts[0];
                $l_name = isset($nameParts[1]) ? $nameParts[1] : "";

                $stmt->bind_param("sssss", $username, $f_name, $l_name, $email, $googleId);
                if ($stmt->execute()) {
                    $_SESSION["user_id"] = $conn->insert_id;
                    $_SESSION["user_name"] = $username;
                    $_SESSION["f_name"] = $f_name;
                    $_SESSION["l_name"] = $l_name;

                    // ✅ Set secure session cookie
                    setcookie("PHPSESSID", session_id(), [
                        "expires" => 0,
                        "path" => "/",
                        "domain" => "yappari-coffee-bar.shop", // Change for production
                        "secure" => true,        // Ensure it's only sent over HTTPS
                        "httponly" => true,      // Prevent JavaScript access
                        "samesite" => "None"     // Prevent CSRF attacks
                    ]);


                    echo json_encode(["success" => true, "message" => "User registered and logged in", "user" => $_SESSION]);
                } else {
                    echo json_encode(["success" => false, "message" => "Error creating user"]);
                }
            }
            $stmt->close();
        } else {
            echo json_encode(["success" => false, "message" => "Invalid Google token"]);
        }
    } catch (Exception $e) {
        echo json_encode(["success" => false, "message" => "Error verifying token", "error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "No credential provided"]);
}

$conn->close();
?>
