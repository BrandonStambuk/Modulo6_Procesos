<?php

namespace App\Http\Controllers\Empleados;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Empleados\Atraso;
use App\Models\Empleados\Employee;
use App\Models\Empleados\WorkingHour;
use App\Models\Empleados\Ausencia;
use App\Models\Empleados\Asistencia;


class AusenciaController extends Controller{

    public function store($idEmpleado,$fecha,$motivo){

        $ausencia = new Ausencia();

        $ausencia -> id_empleado = $idEmpleado;
        $ausencia -> fecha = $fecha;
        $ausencia -> motivo = $motivo;

        $ausencia -> save();

        return response()->json([
            'status' => 200,
            'message' => 'hola desde controller ausencia',
        ]);
    }

    public function obtenerAusencias(){
        $ausenciasRealizadas = $this->agregarAusencias();
        $ausencias = Employee::has('ausencias')->get();

        return response()->json([
            'status' => 200,
            'ausencias' => $ausencias,
        ]);
    }

    public function agregarAusencias(){
        date_default_timezone_set('America/La_Paz');
        $fechaActual = time();
        $fechaAnterior = strtotime('-1 day',$fechaActual);
        $fechaanteriorFormateada = date('Y-m-d',$fechaAnterior);
        $numeroDiaLaboral = date('w',$fechaAnterior);
        $nombreDiaLaboral = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'][$numeroDiaLaboral];

        $empleados = Employee::all();

        $idEmpleado = 0;

        $correcto = false;

        foreach($empleados as $empleado){
            $idEmpleado = $empleado -> id;
            $diaLaboralEmpleado = WorkingHour::where('empleado',$idEmpleado)
                                               ->where('dia',$nombreDiaLaboral)
                                               ->first();

            $asistencia = Asistencia::where('id_empleado',$idEmpleado)
                                      ->where('fecha',$fechaanteriorFormateada)
                                      ->first();

            $ausenciaGuardada = Ausencia::where('id_empleado',$idEmpleado)
                                          ->where('fecha',$fechaanteriorFormateada)
                                          ->first();

            if($diaLaboralEmpleado && $asistencia === null && $ausenciaGuardada === null){
                $ausencia = new Ausencia();
                $ausencia -> id_empleado = $idEmpleado;
                $ausencia -> fecha =  $fechaanteriorFormateada;
                $ausencia -> save();
            }

            $correcto = true;

        }

        return response()->json([
            'status' => 200,
            'ausencia' => $correcto,
        ]);
    }

    public function actualizarMotivoAusencia(Request $request, $id){

        $ausencia = Ausencia::find($id);

        $ausencia-> motivo = $request -> motivo;

        $ausencia -> update();

        return response()->json([
            'status' => 200,
            'message' =>'Ausencia actualizado exitosamente']);

    }

}