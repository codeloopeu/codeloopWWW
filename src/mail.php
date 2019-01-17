<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  header('HTTP/1.1 404 Not Found');
  die();
}

function isJson($string) {
  return is_string($string) && is_object(json_decode($string)) && (json_last_error() == JSON_ERROR_NONE) ? true : false;
}

function getJsonFromBody() {
  $body = file_get_contents('php://input');
  if (!isJson($body)) {
    header('HTTP/1.1 400 Bad Request');
    die();
  }
  return json_decode($body, true);
}

function formatBody($name, $email, $body) {
  return "
<html>
<body>
  <p>Imię i nazwisko: $name</p>
  <p>E-mail: <a href='mailto:$email'>$email</a></p>
  <p>
    Treść:<br>
    <span style='white-space: pre-line'>$body</span>
  </p>
</body>
</html>
";
}

function firstEmailAddress($rawEmail) {
  $parsed = mailparse_rfc822_parse_addresses($rawEmail);
  return $parsed[0]['address'];
}

function confirmationMail($email, $subject, $message) {
  $headers = "MIME-Version: 1.0" . "\r\n";
  $headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
  $headers .= 'From: "codeloop.eu" <contact@codeloop.eu>' . "\r\n";

  mail($email, $subject, $message, $headers);
}

function requestMail($name, $email, $subject, $message) {
  $headers = "MIME-Version: 1.0" . "\r\n";
  $headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
  $headers .= "From: \"$name\" <$email>" . "\r\n";

  $to = 'contact@codeloop.eu';
  mail($to, $subject, $message, $headers);
}

$json = getJsonFromBody();

$name = htmlspecialchars(@$json['name']);
$email = firstEmailAddress(@$json['email']);
$body = htmlspecialchars(@$json['body']);

$subject = 'codeloop.eu - contact form';
$message = formatBody($name, $email, $body);

requestMail($name, $email, $subject, $message);
confirmationMail($email, $subject, $message);

header('HTTP/1.1 204 No Content');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: *');
