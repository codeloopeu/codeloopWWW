<?php declare(strict_types = 1);

include_once('helpers/HttpHelper.php');
include_once('helpers/JsonHelper.php');
include_once('helpers/DatabaseHelper.php');

class MailHelper {

    public static function formatBody(string $name, string $email, string $body): string {
        return "
        <html>
            <body>
                <p>
                    Name: $name
                </p>
                <p>
                    E-mail: <a href='mailto:$email'>$email</a>
                </p>
                <p>
                    <span style='white-space: pre-line'>$body</span>
                </p>
            </body>
        </html>";
    }

    public static function formatConfirmationBody() {
        return "
        <html>
            <body>
                <p>Thank you! We’ll contact you within 48 hours!</p>
            </body>
        </html>";
    }

    public static function extractFirstEmailAddressOrDie(string $rawEmail) {
        $pattern = "/^[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/";
        preg_match_all($pattern, $rawEmail, $matches);
        if (count($matches) != 1 || count($matches[0]) != 1) {
            header('HTTP/1.1 400 Bad Request');
            die();
        }
        return $matches[0][0];
    }

    public static function sendConfirmationMail(string $email, string $subject, $message) {
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
        $headers .= 'From: "codeloop.eu" <contact@codeloop.eu>' . "\r\n";
        mail($email, $subject, $message, $headers);
    }

    public static function sendRequestMail(string $name, string $email, string $subject, string $message) {
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
        $headers .= "From: \"$name\" <$email>" . "\r\n";
        $to = 'contact@codeloop.eu';
        mail($to, $subject, $message, $headers);
    }
}

HttpHelper::checkIfPostOrDie();
$json = JsonHelper::getJsonFromBodyOrDie();

$name = htmlspecialchars(@$json['name']);
$email = htmlspecialchars(MailHelper::extractFirstEmailAddressOrDie(@$json['email']));
$body = htmlspecialchars(@$json['body']);
$subject = 'codeloop.eu - contact form';

MailHelper::sendRequestMail($name, $email, $subject, MailHelper::formatBody($name, $email, $body));
MailHelper::sendConfirmationMail($email, $subject, MailHelper::formatConfirmationBody());

HttpHelper::setNotContentResponseStatusCode();
HttpHelper::addCorsHeaders();
