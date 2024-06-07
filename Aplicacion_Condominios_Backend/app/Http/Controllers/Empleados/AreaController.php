<?php

namespace App\Http\Controllers\Empleados;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Empleados\Area;

class AreaController extends Controller
{

    public function store(Request $request){

        $area = new Area();

        $area-> nombre = $request -> nombre;
        $area-> descripcion = $request -> nombre;

        $area -> save();
        $area->id;

        return response()->json([
            'status' => 200,
            'message' => 'Area añadida exitosamente',
            'ultima_area' => $area->id
        ]);
    }

    public function getAll(){
        $areas = Area::all();
        return response()->json([
            'status' => 200,
            'areas' => $areas,
        ]);
    }
}
