<?php
require_once __DIR__ . '/templates/welcome_email.php';
require_once __DIR__ . '/templates/password_change_email.php';

// Cambia ?ver=welcome o ?ver=password en la URL para alternar
$ver = $_GET['ver'] ?? 'welcome';

if ($ver === 'welcome') {
    echo getWelcomeEmailTemplate(
        'Paolo Tello',
        'http://localhost/verificar?token=abc123'
    );
} else {
    echo getPasswordChangeEmailTemplate('847291');
}