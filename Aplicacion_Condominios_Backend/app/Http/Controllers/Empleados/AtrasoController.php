<?php

namespace App\Http\Controllers\Empleados;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Empleados\Atraso;
use App\Models\Empleados\Employee;
use App\Models\Empleados\WorkingHour;

class AtrasoController extends Controller{
    public function store($idEmpleado,$horaEntrada,$tiempoDemora){
        
        $atraso = new Atraso();

        $atraso -> id_empleado = $idEmpleado;
        $atraso -> hora_entrada = $horaEntrada;
        $atraso -> tiempo_demora = $tiempoDemora;

        $atraso -> save();

        return response()->json([
            'status' => 200,
            'message' => 'hola desde controller retraso',
        ]);
    }

    public function obtenerAtrasos(){
        $atrasos = Employee::has('atrasos')->get();
    
        return response()->json([
            'status' => 200,
            'atrasos' => $atrasos,
        ]);
    }

    public function actualizarMotivo(Request $request, $id){

        $atraso = Atraso::find($id);

        $atraso-> motivo = $request -> motivo;

        $atraso -> update();

        return response()->json([
            'status' => 200,
            'message' =>'Atraso actualizado exitosamente']);
    
    }

}
