<?php declare(strict_types = 1);

include_once('helpers/HttpHelper.php');
include_once('helpers/JsonHelper.php');
include_once('helpers/DatabaseHelper.php');
include_once('helpers/MailHelper.php');

const SUBJECT = 'codeloop.eu - contact form';
const CODELOOP_EMAIL = 'contact@codeloop.eu';
const CODELOOP_DISPLAY_NAME = 'codeloop.eu';

function formatBody(string $name, string $email, string $body): string {
    return "
        <html lang=\"en\">
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

function formatConfirmationBody() {
    return "
        <html lang=\"en\">
            <body>
                <p>Thank you! We’ll contact you within 48 hours!</p>
            </body>
        </html>";
}

function sendRequestMail(string $name, string $email, string $body) {
    $message = formatBody($name, $email, $body);
    MailHelper::sendHtmlMail(CODELOOP_EMAIL, $name, $email, SUBJECT, $message);
}

function sendConfirmationMail(string $email) {
    $message = formatConfirmationBody();
    MailHelper::sendHtmlMail($email, CODELOOP_DISPLAY_NAME, CODELOOP_EMAIL, SUBJECT, $message);
}

HttpHelper::checkIfPostOrDie();
$json = JsonHelper::getJsonFromBodyOrDie();

$name = htmlspecialchars(@$json['name']);
$email = htmlspecialchars(MailHelper::extractFirstEmailAddressOrDie(@$json['email']));
$body = htmlspecialchars(@$json['body']);

sendRequestMail($name, $email, $body);
sendConfirmationMail($email);

HttpHelper::setNotContentResponseStatusCode();
HttpHelper::addCorsHeaders();
