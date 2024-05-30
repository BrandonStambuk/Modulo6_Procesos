<?php

namespace App\Http\Controllers\Notificaciones;

use App\Http\Controllers\Controller;
use App\Models\Notificaciones\Aviso;
use Illuminate\Http\Request;

class AvisosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $avisos = Aviso::all();
        return response() ->json([
            "avisos"=> $avisos
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string',
            'descripcion' => 'required|string',
        ]);

        $aviso = Aviso::create($request->all());

        return response()->json($aviso, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $aviso = Aviso::find($id);

        if (!$aviso) {
            return response()->json(['message' => 'Aviso no encontrado'], 404);
        }

        return response()->json($aviso);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $aviso = Aviso::find($id);

        if (!$aviso) {
            return response()->json(['message' => 'Aviso no encontrado'], 404);
        }

        $request->validate([
            'titulo' => 'string',
            'descripcion' => 'string',
        ]);

        $aviso->update($request->all());

        return response()->json($aviso);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $aviso = Aviso::find($id);

        if (!$aviso) {
            return response()->json(['message' => 'Aviso no encontrado'], 404);
        }

        $aviso->delete();

        return response()->json([
            "message" => "se elimino correctamente"
        ], 204);
    }
}
