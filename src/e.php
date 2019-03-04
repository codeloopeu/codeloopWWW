<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  header('HTTP/1.1 405 Method Not Allowed');
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

$json = getJsonFromBody();
$name = htmlspecialchars(@$json['ref']);

header('HTTP/1.1 204 No Content');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: *');
