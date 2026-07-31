<?php
function getReclamoRespuestaEmailTemplate(
    string $nombre,
    string $numero,
    string $estado,
    string $tipo_reclamo,
    string $respuesta
): string {

    $ESTADO_LABEL = [
        'pendiente'  => 'Pendiente',
        'en_proceso' => 'En proceso',
        'resuelto'   => 'Resuelto',
        'cerrado'    => 'Cerrado',
    ];

    $ESTADO_COLOR = [
        'pendiente'  => '#F59E0B',
        'en_proceso' => '#3B82F6',
        'resuelto'   => '#10B981',
        'cerrado'    => '#6B7280',
    ];

    $estadoLabel = $ESTADO_LABEL[$estado]  ?? $estado;
    $estadoColor = $ESTADO_COLOR[$estado]  ?? '#6B7280';

    return "
    <!DOCTYPE html>
    <html lang='es'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    </head>
    <body style='margin:0; padding:0; background-color:#f4f6fb; font-family: Arial, sans-serif;'>
        <table width='100%' cellpadding='0' cellspacing='0' style='background-color:#f4f6fb; padding:40px 0;'>
            <tr>
                <td align='center'>
                    <table width='600' cellpadding='0' cellspacing='0' style='background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.08);'>

                        <!-- HEADER -->
                        <tr>
                            <td style='background-color:#123498; padding:32px 40px; text-align:center;'>
                                <h1 style='margin:0; color:#ffffff; font-size:22px; font-weight:700; letter-spacing:0.5px;'>
                                    Bolsa de Trabajo JB
                                </h1>
                                <p style='margin:6px 0 0; color:rgba(255,255,255,0.75); font-size:13px;'>
                                    Respuesta a tu reclamo
                                </p>
                            </td>
                        </tr>

                        <!-- CUERPO -->
                        <tr>
                            <td style='padding:40px 40px 32px;'>

                                <p style='margin:0 0 20px; color:#6b7a9f; font-size:15px; line-height:1.6;'>
                                    Hola, <strong style='color:#1c2a52;'>$nombre</strong>. Tu <strong>$tipo_reclamo</strong> ha sido revisada por nuestro equipo.
                                </p>

                                <!-- N° Reclamo + Estado -->
                                <div style='background-color:#f4f6fb; border-radius:12px; padding:16px 20px; margin-bottom:24px; display:flex; align-items:center; justify-content:space-between;'>
                                    <div>
                                        <p style='margin:0 0 4px; font-size:11px; font-weight:700; color:#9aa3bd; text-transform:uppercase; letter-spacing:1px;'>
                                            Número de reclamo
                                        </p>
                                        <p style='margin:0; font-size:22px; font-weight:900; color:#123498; letter-spacing:3px;'>
                                            #$numero
                                        </p>
                                    </div>
                                    <div style='text-align:right;'>
                                        <p style='margin:0 0 4px; font-size:11px; font-weight:700; color:#9aa3bd; text-transform:uppercase; letter-spacing:1px;'>
                                            Estado actual
                                        </p>
                                        <span style='display:inline-block; background-color:{$estadoColor}20; color:{$estadoColor}; border:1px solid {$estadoColor}40; border-radius:20px; padding:4px 14px; font-size:11px; font-weight:900; text-transform:uppercase; letter-spacing:1px;'>
                                            $estadoLabel
                                        </span>
                                    </div>
                                </div>

                                <!-- Respuesta -->
                                <div style='border-left:4px solid #f46f0b; border-radius:0 8px 8px 0; background-color:#fff8f4; padding:16px 20px; margin-bottom:24px;'>
                                    <p style='margin:0 0 8px; font-size:11px; font-weight:700; color:#f46f0b; text-transform:uppercase; letter-spacing:1px;'>
                                        Respuesta de Consultora JB
                                    </p>
                                    <p style='margin:0; font-size:14px; color:#3a4566; line-height:1.7;'>
                                        $respuesta
                                    </p>
                                </div>

                                <p style='margin:0; color:#9aa3bd; font-size:12px; line-height:1.6; text-align:center;'>
                                    Si tienes alguna consulta adicional, puedes responder a este correo o contactarnos por WhatsApp.
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
                                    Este correo fue enviado porque presentaste un reclamo en nuestra plataforma.
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