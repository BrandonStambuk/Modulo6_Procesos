<?php

namespace App\Http\Controllers\Departamento;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\GestDepartamento\bloque;

class BloqueController extends Controller
{
    public function index()
    {
        $bloques = bloque::all();
        return $bloques;
    }

    public function store(Request $request)
    {
        $bloque = new bloque();
        $bloque-> nombre_bloque = $request -> nombre_bloque;
        $bloque-> direccion_bloque = $request -> direccion_bloque;
        $bloque-> descripcion_bloque = $request -> descripcion_bloque;
        $bloque-> imagen_bloque = $request -> imagen_bloque;

        $bloque->save();
    }

    public function show($id)
    {
        $bloque = bloque::find($id);
        return $bloque;
    }

    public function update(Request $request, $id)
    {
        $bloque = bloque::findOrFail($id);
        $bloque-> nombre_bloque = $request -> nombre_bloque;
        $bloque-> direccion_bloque = $request -> direccion_bloque;
        $bloque-> descripcion_bloque = $request -> descripcion_bloque;
        $bloque-> imagen_bloque = $request -> imagen_bloque;

        $bloque->save();
    }

    public function destroy($id)
    {
        $bloque = bloque::destroy($id);
        return response()->json([
            'message' => 'Bloque eliminado'
        ]);
    }

    public function getBloquesShort(){
        $bloques = bloque::select('id', 'nombre_bloque')->get();
        return $bloques;
    }
}
