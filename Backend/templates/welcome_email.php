<?php
function getWelcomeEmailTemplate(string $nombre, string $urlVerificacion): string {
    return "
    <!DOCTYPE html>
    <html lang='es'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    </head>
    <body style='margin:0; padding:0; background-color:#f4f6fb; font-family: Arial, sans-serif;'>

        <table width='100%' cellpadding='0' cellspacing='0' style='background-color:#f4f6fb; padding: 40px 0;'>
            <tr>
                <td align='center'>
                    <table width='600' cellpadding='0' cellspacing='0' style='background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);'>
                        
                        <!-- HEADER -->
                        <tr>
                            <td style='background-color:#123498; padding: 32px 40px; text-align:center;'>
                                <h1 style='margin:0; color:#ffffff; font-size:22px; font-weight:700; letter-spacing:0.5px;'>
                                    Bolsa de Trabajo JB
                                </h1>
                                <p style='margin:6px 0 0; color:rgba(255,255,255,0.75); font-size:13px;'>
                                    Tu portal de empleo de confianza
                                </p>
                            </td>
                        </tr>

                        <!-- CUERPO -->
                        <tr>
                            <td style='padding: 40px 40px 32px;'>

                                <!-- Ícono de bienvenida -->
                                <div style='text-align:center; margin-bottom:24px;'>
                                    <div style='display:inline-block; background-color:#fff4ec; border-radius:50%; width:64px; height:64px; line-height:64px; text-align:center;'>
                                        <span style='font-size:30px;'>👋</span>
                                    </div>
                                </div>

                                <h2 style='margin:0 0 12px; color:#1c2a52; font-size:20px; text-align:center;'>
                                    ¡Bienvenido/a, $nombre!
                                </h2>
                                <p style='margin:0 0 24px; color:#6b7a9f; font-size:15px; line-height:1.6; text-align:center;'>
                                    Tu cuenta ha sido creada exitosamente. Para empezar a postular a las mejores oportunidades laborales, confirma tu correo electrónico haciendo clic en el botón de abajo.
                                </p>

                                <!-- Botón CTA -->
                                <div style='text-align:center; margin: 32px 0;'>
                                    <a href='$urlVerificacion'
                                       style='background-color:#f46f0b; color:#ffffff; padding:16px 36px; text-decoration:none; border-radius:10px; font-weight:700; font-size:15px; display:inline-block; letter-spacing:0.3px;'>
                                        Verificar mi cuenta →
                                    </a>
                                </div>

                                <!-- Divider -->
                                <hr style='border:none; border-top:1px solid #e8edf5; margin:28px 0;'>

                                <!-- Enlace alternativo -->
                                <p style='margin:0 0 6px; color:#9aa3bd; font-size:12px; text-align:center;'>
                                    Si el botón no funciona, copia y pega este enlace en tu navegador:
                                </p>
                                <p style='margin:0; font-size:12px; color:#123498; word-break:break-all; text-align:center;'>
                                    $urlVerificacion
                                </p>
                            </td>
                        </tr>

                        <!-- FOOTER -->
                        <tr>
                            <td style='background-color:#f8fafc; padding:24px 40px; border-top:1px solid #e8edf5; text-align:center;'>
                                <p style='margin:0 0 4px; color:#1c2a52; font-size:13px; font-weight:700;'>
                                    Equipo de Consultora JB
                                </p>
                                <p style='margin:0; color:#9aa3bd; font-size:12px;'>
                                    Este correo fue enviado porque alguien creó una cuenta con esta dirección. Si no fuiste tú, ignora este mensaje.
                                </p>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>

    </body>
    </html>
    ";
}