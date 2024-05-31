<?php

namespace App\Http\Controllers\Empleados;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Empleados\Position;

class PositionController extends Controller
{
    public function store(Request $request){

        $cargo = new Position();

        $cargo-> nombre = $request -> nombre;
        $cargo-> area = $request -> area;
        $cargo-> descripcion = $request -> descripcion;

        $cargo -> save();

        return response()->json([
            'status' => 200,
            'message' => 'cargo añadido  exitosamente',
        ]);
    }

    public function getAll(){
        $cargos = Position::all();
        return response()->json([
            'status' => 200,
            'cargos' => $cargos,
        ]);
    }
}
