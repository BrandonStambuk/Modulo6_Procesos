<?php

namespace App\Http\Controllers\Cobro_Servicios;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Cobro_Servicios\MultasModel;
use App\Models\Cobro_Servicios\PreAvisoModel;

class MultasController extends Controller
{
    public function index()
    {
        $multas = MultasModel::all()->toArray();
        
        return response()->json([
            'status' => 200,
            'data' => $multas,
        ]);
    }

    public function guardoMulta(Request $request)
    {
     

        $multa = new MultasModel();

        $multa->preaviso_id = $request->preaviso_id;
        $multa->descripcion = $request->descripcion;
        $multa->monto = $request->monto;
        $multa->fecha = $request->fecha;

        $multa->save();

        return response()->json([
            'status' => 200,
            'message' => 'Multa creada exitosamente',
        ]);
    }

    public function show($id)
    {
        $multa = MultasModel::findOrFail($id);
        
        return response()->json([
            'status' => 200,
            'data' => $multa,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'expensa_id' => 'required|exists:expensas,id',
            'descripcion' => 'required|string',
            'monto' => 'required|numeric',
            'fecha' => 'required|date',
        ]);

        $multa = MultasModel::findOrFail($id);

        $multa->expensa_id = $request->expensa_id;
        $multa->descripcion = $request->descripcion;
        $multa->monto = $request->monto;
        $multa->fecha = $request->fecha;

        $multa->save();

        return response()->json([
            'status' => 200,
            'message' => 'Multa actualizada exitosamente',
        ]);
    }

    public function destroy($id)
    {
        $multa = MultasModel::findOrFail($id);
        $multa->delete();
        
        return response()->json([
            'status' => 200,
            'message' => 'Multa eliminada exitosamente',
        ]);
    }


    public function actualizarMonto(Request $request, $id)
    {
        $preaviso = PreAvisoModel::findOrFail($id);
        
        // Verificar si el nuevo monto se proporciona en la solicitud y actualizarlo si es así
        if ($request->has('nuevo_monto')) {
            $preaviso->monto = $request->nuevo_monto;
        }
        
        $preaviso->save();
        
        return response()->json([
            'status' => 200,
            'message' => 'Monto del preaviso actualizado exitosamente',
            'preaviso' => $preaviso,
        ]);
    }

    public function obtenerPreAvisosConMultas()
    {
        $preavisosConMultas = PreAvisoModel::has('multas')->with('multas')->get();
    
        // Iterar sobre cada preaviso y agregar el ID de la multa (si existe)
        $preavisosConMultas->transform(function ($preaviso) {
            $preaviso->multa_id = $preaviso->multas->isNotEmpty() ? $preaviso->multas->first()->id : null;
            return $preaviso;
        });
    
        return response()->json([
            'status' => 200,
            'data' => $preavisosConMultas,
        ]);
    }

    public function obtenerPreAvisosSinMultas()
    {
        $preavisosSinMultas = PreAvisoModel::doesntHave('multas')->get();

        return response()->json([
            'status' => 200,
            'data' => $preavisosSinMultas,
        ]);
    }
    public function obtenerMultasPorPreaviso($idPreaviso)
{
    $preaviso = PreAvisoModel::find($idPreaviso);
    
    if (!$preaviso) {
        return response()->json([
            'status' => 404,
            'message' => 'Preaviso no encontrado',
        ], 404);
    }
    
    $multas = $preaviso->multas;
    
    return response()->json([
        'status' => 200,
        'multas' => $multas,
    ]);
}
    
}
