<?php
// Set error reporting for debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('HTTP/1.1 200 OK');
    exit();
}

// Target URL (replace with your target)
$targetUrl = 'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt';

// Get the request method
$method = $_SERVER['REQUEST_METHOD'];

// Get query parameters from the original request
$queryString = $_SERVER['QUERY_STRING'] ?? '';

// Append query string to target URL if it exists
if (!empty($queryString)) {
    $targetUrl .= '?' . $queryString;
}

// Initialize cURL session
$ch = curl_init();

// Set cURL options
curl_setopt($ch, CURLOPT_URL, $targetUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

// Forward headers (excluding some that would conflict)
$headers = getallheaders();
$forwardHeaders = [];
foreach ($headers as $name => $value) {
    if (!in_array(strtolower($name), ['host', 'content-length'])) {
        $forwardHeaders[] = "$name: $value";
    }
}
curl_setopt($ch, CURLOPT_HTTPHEADER, $forwardHeaders);

// Forward POST/PUT data if applicable
if ($method === 'POST' || $method === 'PUT') {
    curl_setopt($ch, CURLOPT_POSTFIELDS, file_get_contents('php://input'));
}

// Execute cURL session
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);

// Check for cURL errors
if (curl_errno($ch)) {
    header('HTTP/1.1 500 Internal Server Error');
    echo 'Proxy Error: ' . curl_error($ch);
    exit;
}

// Close cURL session
curl_close($ch);

// Forward the HTTP status code
http_response_code($httpCode);

// Forward content type header
if ($contentType) {
    header("Content-Type: $contentType");
}

// Output the response
echo $response;
?>