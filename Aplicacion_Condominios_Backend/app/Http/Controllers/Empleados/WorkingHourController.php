<?php

namespace App\Http\Controllers\Empleados;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Empleados\WorkingHour;

class WorkingHourController extends Controller
{
    public function store(Request $request){

        $horario = new WorkingHour();

        $horario-> dia = $request -> dia;
        $horario-> hora_entrada = $request -> hora_entrada;
        $horario-> hora_salida = $request -> hora_salida;
        $horario-> empleado = $request -> empleado;

        $horario -> save();

        return response()->json([
            'status' => 200,
            'message' => 'Horario añadido exitosamente',
        ]);
    }

    public function borrarTodosDadoEmpleado($id){
        WorkingHour::where('empleado', $id)->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Horarios eliminados exitosamente',
        ]);
    }

}
