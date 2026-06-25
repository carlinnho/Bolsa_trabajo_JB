<?php
// templates/welcome_email.php

function getWelcomeEmailTemplate(string $nombre, string $urlVerificacion): string {
    return "
    <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;'>
        <div style='background-color: #003366; padding: 20px; text-align: center;'>
            <h1 style='color: #ffffff; margin: 0;'>Bolsa de Trabajo JB</h1>
        </div>
        <div style='padding: 30px; background-color: #ffffff; color: #333333;'>
            <h2 style='color: #ff6600;'>¡Bienvenido/a, $nombre!</h2>
            <p>Tu cuenta ha sido creada de manera exitosa. Para empezar a postular a las ofertas laborales, necesitamos que valides tu correo electrónico.</p>
            
            <div style='text-align: center; margin: 35px 0;'>
                <a href='$urlVerificacion' style='background-color: #ff6600; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;'>Validar mi cuenta</a>
            </div>
            
            <p style='font-size: 12px; color: #777;'>Si el botón no funciona, copia y pega el siguiente enlace en tu navegador:</p>
            <p style='font-size: 12px; color: #003366; word-break: break-all;'>$urlVerificacion</p>
            
            <br>
            <p style='margin-bottom: 0;'>Atentamente,</p>
            <p style='font-weight: bold; margin-top: 5px;'>El equipo de Consultora JB</p>
        </div>
    </div>
    ";
}