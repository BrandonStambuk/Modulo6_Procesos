<?php

namespace App\Http\Controllers\Notificaciones;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactanosMailable;

class CorreoController extends Controller
{
    public function enviarCorreo(Request $request)
    {
        $titulo = $request->input('titulo');
        $correo = $request->input('correo');
        $monto = $request->input('monto');
        $multa = $request ->input('multa');
        $mensajeAdicional = $request->input('mensaje'); // Nuevo campo para el mensaje adicional desde el frontend

        // Aquí puedes agregar la lógica necesaria para enviar el correo electrónico
        // Por ejemplo:
        Mail::to($correo)->send(new ContactanosMailable($titulo, $monto,  $multa ,$mensajeAdicional));

        return response()->json(['message' => 'Correo enviado correctamente']);
    }
}
