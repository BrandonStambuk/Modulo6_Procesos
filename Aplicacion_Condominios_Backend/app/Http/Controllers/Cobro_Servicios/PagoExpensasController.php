<?php

namespace App\Http\Controllers\Cobro_Servicios;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\Cobro_Servicios\PagoExpensas;

class PagoExpensasController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Validar los datos de la solicitud
    

        // Crear un nuevo pago de expensa
        $pagoExpensa = new PagoExpensas();
        $pagoExpensa->residente_id = $request ->residente_id;
        $pagoExpensa->montoPagar = $request -> monto;
        $pagoExpensa->save();

        // Retornar una respuesta JSON exitosa
        return response()->json([
            'status' => 'success',
            'message' => 'Pago de expensa creado exitosamente.',
            'data' => $pagoExpensa,
        ], 201);
    }
}