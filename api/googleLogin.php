<?php
session_start(); // ✅ Start session for authentication

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include __DIR__ . "/db.php"; // This should now return a PDO connection

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Start output buffering to catch any unexpected output
ob_start();

// ✅ Get and decode JWT from frontend request
$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input["userData"])) {
    ob_end_clean();
    die(json_encode(["success" => false, "message" => "No user data provided"]));
}

try {
    if ($input) {
        // Get the userData value
        $userData = $input["userData"];  // Access the userData object

        // If userData is a JSON string that needs to be decoded
        if (is_string($userData)) {
            $userData = json_decode($userData, true);
            if (!$userData) {
                ob_end_clean();
                die(json_encode(["success" => false, "message" => "Invalid userData JSON"]));
            }
        }

        // Now extract user details
        $googleId = $userData['sub'] ?? $userData['id'] ?? null;
        $email = $userData['email'] ?? null;
        $f_name = $userData['given_name'] ?? $userData['firstName'] ?? null;
        $l_name = $userData['family_name'] ?? $userData['lastName'] ?? null;

        // Verify we have the required fields
        if (!$googleId || !$email || !$f_name) {
            ob_end_clean();
            die(json_encode(["success" => false, "message" => "Missing required user data fields"]));
        }
        
        // ✅ Check if user already exists in the database using PDO
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->execute();
        
        if ($stmt->rowCount() > 0) {
            // ✅ Existing user → Log them in
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
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
            
            ob_end_clean();
            echo json_encode(["success" => true, "message" => "Login successful", "user" => $_SESSION]);
        } else {
            // ✅ Generate unique username (based on first name + random number)
            $username = strtolower($f_name) . rand(1000, 9999);

            // ✅ Insert new user into the database using PDO
            $stmt = $pdo->prepare("INSERT INTO users (username, f_name, l_name, email, google_id) VALUES (:username, :f_name, :l_name, :email, :google_id)");
            $stmt->bindParam(':username', $username, PDO::PARAM_STR);
            $stmt->bindParam(':f_name', $f_name, PDO::PARAM_STR);
            $stmt->bindParam(':l_name', $l_name, PDO::PARAM_STR);
            $stmt->bindParam(':email', $email, PDO::PARAM_STR);
            $stmt->bindParam(':google_id', $googleId, PDO::PARAM_STR);
            
            if ($stmt->execute()) {
                $_SESSION["user_id"] = $pdo->lastInsertId();
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

                ob_end_clean();
                echo json_encode(["success" => true, "message" => "User registered and logged in", "user" => $_SESSION]);
            } else {
                ob_end_clean();
                echo json_encode(["success" => false, "message" => "Error creating user"]);
            }
        }
    }
} catch (PDOException $e) {
    ob_end_clean();
    echo json_encode(["success" => false, "message" => "Database error", "error" => $e->getMessage()]);
} catch (Exception $e) {
    ob_end_clean();
    echo json_encode(["success" => false, "message" => "Error verifying token", "error" => $e->getMessage()]);
}

// No need to explicitly close PDO connection as it closes automatically when script ends
?>