<?php
namespace App\Http\Controllers\Notificaciones;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\AnuncioVerification;


class AuthController extends Controller
{
    public function enviarCorreo(Request $request)
    {
        $titulo = $request->input('titulo');
        $correo = $request->input('correo');
        $anuncio = $request->input('anuncio');

        try {
            // Envía el correo electrónico usando el mailable ContactanosMailable
            Mail::to($correo)->send(new AnuncioVerification($titulo, $anuncio));

            // Devuelve una respuesta JSON indicando que el correo se envió correctamente
            return response()->json(['message' => 'Correo enviado correctamente']);
        } catch (\Exception $e) {
            // Si hay un error al enviar el correo, devuelve un mensaje de error
            return response()->json(['error' => 'Error al enviar el correo electrónico: ' . $e->getMessage()], 500);
        }
    }
}
