<?php

namespace App\Http\Controllers\Departamento;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\GestDepartamento\Visita;

class VisitaController extends Controller
{
    public function index()
    {
        //mostrar todos los residentes
        
        $visitas = Visita::all();
        return $visitas;
    }

    public function store(Request $request)
    {
        //
        $visita = new Visita();
        $validatedData = $request->validate([
            'nombre_visita' => 'required|string|max:50',
            'apellidos_visita' => 'nullable|string|max:50',
            'cedula_visita' => 'required',
            'telefono_visita' => 'required',
            'activo_visita' => 'required|boolean',
            'departamento_id' => 'nullable|numeric'
        ]);
        $visita->fill($validatedData);
        try{
            $visita->save();
            $visitaId = $visita->id;
            return response()->json([
                'status' => 200,
                'message' => 'Visita creado exitosamente',
                'contrato_id' => $visitaId
            ]);
        }catch(\Exception $e){
            return response()->json([
                'status' => 500,
                'message' => 'Error al crear la visita'
            ]);
        }
    }

    public function show($id)
    {
        $visita = Visita::find($id);
        return $visita;
    }

    public function desactivarVisita(Request $request, $id)
    {
        $visita = Visita::findOrFail($id);

        // Actualiza el atributo específico
        $visita->activo_visita = $request->input('activo_visita');
        $visita->save();

        return response()->json(['mensaje' => 'Atributo actualizado correctamente']);
    }

    public function destroy($id){
        try{
            $visita = Visita::find($id);
            $visita->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Visita eliminado exitosamente'
            ]);
        }catch(\Exception $e){
            return response()->json([
                'status' => 500,
                'message' => 'Error al eliminar el visita'
            ]);
        }
    }

}
