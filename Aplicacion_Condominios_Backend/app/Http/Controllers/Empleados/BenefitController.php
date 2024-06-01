<?php

namespace App\Http\Controllers\Empleados;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Empleados\Benefit;

class BenefitController extends Controller
{
    public function store(Request $request){

        $beneficio = new Benefit();

        $beneficio-> nombre = $request -> nombre;
        $beneficio-> costo = $request -> costo;
        $beneficio-> costo_empresa = $request -> costo_empresa;
        $beneficio-> costo_empleado = $request -> costo_empleado;

        $beneficio -> save();

        return response()->json([
            'status' => 200,
            'message' => 'Beneficio añadido  exitosamente',
        ]);
    }

    public function getAll(){
        $beneficios = Benefit::all();
        return response()->json([
            'status' => 200,
            'beneficios' => $beneficios,
        ]);
    }
}
