<?php
header('Content-type: application/json');

$errors = [];

$mail = trim($_POST['mail']);
$subject = trim($_POST['subject']);
$message = trim($_POST['message']);

if(!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
    $errors['mail'] = 'Adres e-mail jest niepoprawny';
}

$subject = filter_var($subject, FILTER_SANITIZE_STRING);

if(strlen($subject) < 3) {
    $errors['subject'] = 'Temat wiadomości jest za krótki';
}

$message = filter_var($message, FILTER_SANITIZE_STRING);

if(strlen($message) < 3) {
    $errors['message'] = 'Treść wiadomości jest za krótka';
}

if(!$_POST['captchaG']) {
    $errors['captcha'] = 'Zanacz nie jestem robotem';
}

if(count($errors) === 0) {
    $captcha = $_POST['captchaG'];
    // secretKey testowy! dla localhost
    $secret = '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe';
    $response = json_decode(file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$secret."&response=".$captcha."&remoteip=".$_SERVER['REMOTE_ADDR']), true);
    if($response['success'] != false){
        //$capt = 'OK';
    } else {
        $error['captcha'] = 'Błąd captcha. Nie można użyć ponownie tej samej weryfikacji.<br><a href="http://localhost">Kliknij tutaj</a> aby odświeżyć stronę i zredagować wiadomość ponownie.';   
    }
}

if(count($errors) === 0) {
    $to = 'kontakt@ravor.net';

    $htmlCodeStart = '<!DOCTYPE html><html lang="pl"><head><meta charset="UTF-8"></head><body>';
    $htmlCodeEnd = '</body></html>';
    $subject = '=?UTF-8?B?'.base64_encode($subject).'?=';
    $mailMessage = $htmlCodeStart.$message.$htmlCodeEnd;
    $headers = "MIME-Version: 1.0\n";
    $headers .= "Content-type: text/html; charset=UTF-8\n";
    $headers .= "From: $mail\n";

    $s_mail = mail($to, $subject, $mailMessage, $headers);
    if($s_mail) {
        echo json_encode(['success' => 'Dziękujemy, Twoja wiadomość została wysłana.']);
    }
} else {
    echo json_encode($errors);
}