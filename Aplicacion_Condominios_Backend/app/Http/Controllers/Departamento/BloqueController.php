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

        if($request -> hasFile ('imagen_bloque')){
            $image = $request->file('imagen_bloque');
            $name = time().'.'.$image->getClientOriginalExtension();
            $image->move('departamento/images/bloques/', $name);

            $bloque-> imagen_bloque = "departamento/images/bloques/${name}";
            $bloque-> save();

            return response()->json([
                'status' => 200,
                'message' =>'Bloque añadido exitosamente',
            ]);

        }
        if(!$request->hasFile('imagen_bloque') || !$bloque->imagen_bloque){
            $imagenPredeterminada = 'departamento/images/bloques/bloque_defecto.jpg';
            $bloque->imagen_bloque = $imagenPredeterminada;
            $bloque->save();
            return response()->json([
                'status' => 200,
                'message' =>'Bloque añadido exitosamente con imagen predeterminada',
            ]);
        }
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

        if($request -> hasFile ('imagen_bloque')){
            $image = $request->file('imagen_bloque');
            $name = time().'.'.$image->getClientOriginalExtension();
            $image->move('departamento/images/bloques/', $name);

            $bloque-> imagen_bloque = "departamento/images/bloques/${name}";
            $bloque-> save();

            return response()->json([
                'status' => 200,
                'message' =>'Bloque actualizado exitosamente',
            ]);

        }
        if(!$request->hasFile('imagen_bloque') || !$bloque->imagen_bloque){
            $imagenPredeterminada = 'departamento/images/bloques/bloque_defecto.jpg';
            $bloque->imagen_bloque = $imagenPredeterminada;

            $bloque->save();
            return response()->json([
                'status' => 200,
                'message' =>'Bloque actualizado exitosamente con imagen predeterminada',
            ]);
        }
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

    public function cantEdificiosByBloque($id){
        $cantEdificios = bloque::find($id)->edificios->count();
        return $cantEdificios;
    }
}
