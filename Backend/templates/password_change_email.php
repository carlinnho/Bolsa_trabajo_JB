<?php
function getPasswordChangeEmailTemplate(string $codigo): string {
    return "
    <!DOCTYPE html>
    <html lang='es'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    </head>
    <body style='margin:0; padding:0; background-color:#f4f6fb; font-family: Lato, Arial, sans-serif;'>

        <table width='100%' cellpadding='0' cellspacing='0' style='background-color:#f4f6fb; padding: 40px 0;'>
            <tr>
                <td align='center'>
                    <table width='600' cellpadding='0' cellspacing='0' style='background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);'>

                        <!-- HEADER -->
                        <tr>
                            <td style='background-color:#123498; padding: 32px 40px; text-align:center;'>
                                <h1 style='margin:0; color:#ffffff; font-size:22px; font-weight:700; letter-spacing:0.5px; font-family: Montserrat, Arial, sans-serif;'>
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

                                <!-- Ícono de seguridad -->
                                <div style='text-align:center; margin-bottom:24px;'>
                                    <div style='display:inline-block; background-color:#eef1fc; border-radius:50%; width:64px; height:64px; line-height:64px; text-align:center;'>
                                        <span style='font-size:30px;'>🔐</span>
                                    </div>
                                </div>

                                <h2 style='margin:0 0 12px; color:#1c2a52; font-size:20px; text-align:center;'>
                                    Código de verificación
                                </h2>
                                <p style='margin:0 0 32px; color:#6b7a9f; font-size:15px; line-height:1.6; text-align:center;'>
                                    Recibimos una solicitud para cambiar la contraseña de tu cuenta. Usa el siguiente código para continuar. <strong>Válido por 15 minutos.</strong>
                                </p>

                                <!-- Código -->
                                <div style='text-align:center; margin: 0 0 32px;'>
                                    <div style='display:inline-block; background-color:#f4f6fb; border:2px dashed #c7d0e8; border-radius:14px; padding:20px 48px;'>
                                        <span style='font-size:38px; font-weight:700; color:#123498; letter-spacing:10px;'>
                                            $codigo
                                        </span>
                                    </div>
                                </div>

                                <!-- Aviso -->
                                <div style='background-color:#fff8f4; border-left:4px solid #f46f0b; border-radius:0 8px 8px 0; padding:14px 18px; margin-bottom:8px;'>
                                    <p style='margin:0; color:#1c2a52; font-size:13px; line-height:1.6;'>
                                        ⚠️ <strong>¿No solicitaste este cambio?</strong> Ignora este correo. Tu contraseña seguirá siendo la misma y el código expirará automáticamente.
                                    </p>
                                </div>

                            </td>
                        </tr>

                        <!-- FOOTER -->
                        <tr>
                            <td style='background-color:#f8fafc; padding:24px 40px; border-top:1px solid #e8edf5; text-align:center;'>
                                <p style='margin:0 0 4px; color:#1c2a52; font-size:13px; font-weight:700;'>
                                    Equipo de Consultora JB
                                </p>
                                <p style='margin:0; color:#9aa3bd; font-size:12px;'>
                                    Por seguridad, nunca te pediremos tu contraseña por correo.
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