<?php
header('Content-type: application/json');

function validate_input($data, $min_length = 3) {
    return htmlspecialchars(trim($data)) && strlen(trim($data)) >= $min_length;
}

function verify_captcha($captcha_token, $secret_key, $remote_ip) {
    $url = "https://www.google.com/recaptcha/api/siteverify?secret={$secret_key}&response={$captcha_token}&remoteip={$remote_ip}";
    $response = file_get_contents($url);
    if ($response === false) {
        return ['success' => false, 'error' => 'Błąd połączenia z serwerem CAPTCHA.'];
    }
    return json_decode($response, true);
}

$errors = [];

// Walidacja danych wejściowych
$mail = $_POST['mail'] ?? '';
$subject = $_POST['subject'] ?? '';
$message = $_POST['message'] ?? '';
$captcha = $_POST['captchaG'] ?? '';

if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
    $errors['mail'] = 'Adres e-mail jest niepoprawny.';
}
if (!validate_input($subject)) {
    $errors['subject'] = 'Temat wiadomości jest za krótki.';
}
if (!validate_input($message)) {
    $errors['message'] = 'Treść wiadomości jest za krótka.';
}
if (!$captcha) {
    $errors['captcha'] = 'Zaznacz "Nie jestem robotem".';
}

// Weryfikacja CAPTCHA
if (empty($errors)) {
    $secret = '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe'; // Testowy klucz
    $captcha_response = verify_captcha($captcha, $secret, $_SERVER['REMOTE_ADDR']);
    if (!$captcha_response['success']) {
        $errors['captcha'] = 'Błąd CAPTCHA. Spróbuj ponownie.';
    }
}

// Wysyłanie e-maila
if (empty($errors)) {
    $to = 'kontakt@ravor.net';
    $subject_encoded = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    $html_message = '<!DOCTYPE html><html lang="pl"><head><meta charset="UTF-8"></head><body>' . htmlspecialchars($message) . '</body></html>';
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: " . htmlspecialchars($mail) . "\r\n";

    if (mail($to, $subject_encoded, $html_message, $headers)) {
        http_response_code(200);
        echo json_encode(['success' => 'Dziękujemy, Twoja wiadomość została wysłana.']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Błąd podczas wysyłania wiadomości. Spróbuj ponownie później.']);
    }
} else {
    http_response_code(400);
    echo json_encode(['errors' => $errors]);
}
