<?php

namespace App\Http\Controllers\Cobro_Servicios;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Cobro_Servicios\PreAvisoModel;
use App\Models\Cobro_Servicios\ExpensaModel;
use App\Models\GestDepartamento\departamento;

class PreAvisoController extends Controller
{
    public function index()
    {
        $preavisos = PreAvisoModel::all();
        return response()->json([
            'status' => 200,
            'data' => $preavisos,
        ]);
    }

    public function obtenerNombresDepartamentos()
    {
        $departamentos = Departamento::pluck('nombre_departamento','id');
        return $departamentos;
    }

    public function store(Request $request)
    {
        $preavisos = new PreAvisoModel();
        $preavisos->departamento_id = $request->departamento_id;
        $preavisos->fecha = $request->fecha;
        $preavisos->propietario_pagar = $request->propietario_pagar; // Agregar punto y coma aquí
        $preavisos->descripcion_servicios = $request->descripcion_servicios;
        $preavisos->servicio_pagar = $request->servicio_pagar; // Agregar punto y coma aquí
        $preavisos->monto = $request->monto;
        $preavisos->id_propietarioPagar = $request ->id_propietarioPagar;
        $preavisos->save();
        
        return response()->json([
            'status' => 200,
            'message' => 'Preaviso de Expensa generado exitosamente',
            'id' => $preavisos->id,
        ]);
    
    }


    /*public function obtenerTodosPreAvisos()
    {
        $preAvisos = ExpensaModel::all()->toArray(); // Convertimos los resultados a un array
        return response()->json([
            'status' => 200,
            'preAvisos' => $preAvisos,
        ]);
    }*/



    public function obtenerTodosPreAvisos()
{
    $preAvisos = PreAvisoModel::with('departamento:id,nombre_departamento')->get()->toArray();
    return response()->json([
        'status' => 200,
        'preAvisos' => $preAvisos,
    ]);
}
}
