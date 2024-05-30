<?php

namespace App\Http\Controllers\Departamento;

use App\Http\Controllers\Controller;
use App\Models\GestDepartamento\Parqueo;
use Illuminate\Http\Request;

class ParqueoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return Parqueo::all();
    }

    public function store(Request $request)
    {
        //
        $parqueo = new Parqueo();
        $validatedData = $request->validate([
            'nombre_parqueo' => 'required',
            'departamento_id' => 'required'
        ]);
        $parqueo->fill($validatedData);
        try{
            $parqueo->save();
            $parqueoId = $parqueo->id;
            return response()->json([
                'status' => 200,
                'message' => 'Parqueo creado exitosamente',
                'parqueo_id' => $parqueoId
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => 'Error al crear el parqueo',
                'parqueo_id' => null
            ], 500);
        }
    }

    public function show($idParqueo)
    {
        //
        $parqueo = Parqueo::find($idParqueo);
        return $parqueo;
    }

    public function update(Request $request,$idParqueo)
    {
        //
        $parqueo = Parqueo::find($idParqueo);
        $validatedData = $request->validate([
            'nombre_parqueo' => 'required',
            'departamento_id' => 'required'
        ]);
        $parqueo->fill($validatedData);
        try{
            $parqueo->save();
            return response()->json([
                'status' => 200,
                'message' => 'Parqueo actualizado exitosamente'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => 'Error al actualizar el parqueo'
            ], 500);
        }
    }

    public function destroy($idParqueo)
    {
        //
        try{
            $parqueo = Parqueo::find($idParqueo);
            $parqueo->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Parqueo eliminado exitosamente'
            ]);
        }catch(\Exception $e){
            return response()->json([
                'status' => 500,
                'message' => 'Error al eliminar el parqueo'
            ]);
        }
    }
    public function getParqueosByDepartamento($idDepartamento)
    {
        $parqueos = Parqueo::where('departamento_id', $idDepartamento)->get();
        return $parqueos;
    }

}
