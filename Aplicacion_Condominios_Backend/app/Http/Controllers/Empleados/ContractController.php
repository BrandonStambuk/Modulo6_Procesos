<?php

namespace App\Http\Controllers\Empleados;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Empleados\Contract;
class ContractController extends Controller
{
    public function store(Request $request){

        $contrato = new Contract();

        $contrato-> tipo_contrato = $request -> tipo_contrato;
        $contrato-> fecha_inicio = $request -> fecha_inicio;
        $contrato-> fecha_final = $request -> fecha_final;
        $contrato-> area = $request -> area;
        $contrato-> cargo = $request -> cargo;
        $contrato-> beneficios = $request -> beneficios;
        $contrato-> salario = $request -> salario;
        $contrato-> empleado = $request -> empleado;
        $contrato-> area_comun = $request -> area_comun;
        $contrato-> edificio = $request -> edificio;

        $contrato -> save();

        return response()->json([
            'status' => 200,
            'message' => 'Contrato añadido exitosamente',
        ]);
    }
    


}
