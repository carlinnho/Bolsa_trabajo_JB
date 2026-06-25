<?php
// test_mail.php - Prueba directa de SMTP

ini_set('display_errors', 1);
error_reporting(E_ALL);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/libs/PHPMailer/Exception.php';
require_once __DIR__ . '/libs/PHPMailer/PHPMailer.php';
require_once __DIR__ . '/libs/PHPMailer/SMTP.php';
require_once __DIR__ . '/config/mail.php'; // Aquí están tus credenciales

echo "<h2>Iniciando prueba de conexión con Google SMTP...</h2>";
echo "<pre style='background: #1e1e1e; color: #00ff00; padding: 15px; border-radius: 5px;'>";

$mail = new PHPMailer(true);

try {
    // ESTA ES LA MAGIA: Nivel 2 imprimirá toda la comunicación con el servidor
    $mail->SMTPDebug = SMTP::DEBUG_SERVER; 
    
    $mail->isSMTP();
    $mail->Host       = SMTP_HOST; // Debe ser smtp.gmail.com
    $mail->SMTPAuth   = true;
    $mail->Username   = SMTP_USER;
    $mail->Password   = SMTP_PASS; // Tu contraseña de aplicación de 16 dígitos
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;

    $mail->SMTPOptions = array(
            'ssl' => array(
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            )
        );

    $mail->setFrom(SMTP_USER, MAIL_FROM_NAME);
    $mail->addAddress('carlospure777@hotmail.com'); // Tu Hotmail

    $mail->isHTML(true);
    $mail->Subject = 'Prueba de Diagnostico SMTP - JB';
    $mail->Body    = 'Si este correo llega, la conexion desde XAMPP es exitosa.';

    $mail->send();
    echo "</pre>";
    echo "<h3 style='color: green;'>¡El servidor de Google aceptó el correo!</h3>";

} catch (Exception $e) {
    echo "</pre>";
    echo "<h3 style='color: red;'>Error de PHPMailer: {$mail->ErrorInfo}</h3>";
} catch (\Error $e) {
    echo "</pre>";
    echo "<h3 style='color: red;'>Error de PHP: {$e->getMessage()}</h3>";
}