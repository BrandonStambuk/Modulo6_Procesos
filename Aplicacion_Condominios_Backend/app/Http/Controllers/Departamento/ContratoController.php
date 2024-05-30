<?php

namespace App\Http\Controllers\Departamento;

use App\Http\Controllers\Controller;
use App\Models\GestDepartamento\Contrato;
use Illuminate\Http\Request;

class ContratoController extends Controller
{
    public function index()
    {
        //
        return Contrato::all();
    }

    public function contratosVigentes()
    {
        try {
            $contratos = Contrato::where('vigente_contrato', true)->get();

            if ($contratos->isEmpty()) {
                return response()->json([
                    'status' => 404,
                    'message' => 'Contratos vigentes no encontrados',
                    'contratos' => []
                ]);
            }

            return response()->json([
                'status' => 200,
                'message' => 'Contratos vigentes encontrados',
                'contratos' => $contratos
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => 'Error al buscar los contratos vigentes'
            ], 500);
        }
    }

    public function store(Request $request)
    {
        //
        $contrato = new Contrato();
        $validatedData = $request->validate([
            'fecha_inicio_contrato' => 'required|date',
            'fecha_fin_contrato' => 'nullable|date',
            'precio_contrato' => 'required|numeric',
            'tipo_contrato' => 'required|string',
            'vigente_contrato' => 'required|boolean',
            'departamento_id' => 'nullable|numeric'
        ]);
        $contrato->fill($validatedData);
        try{
            $contrato->save();
            $contratoId = $contrato->id;
            return response()->json([
                'status' => 200,
                'message' => 'Contrato creado exitosamente',
                'contrato_id' => $contratoId
            ]);
        }catch(\Exception $e){
            return response()->json([
                'status' => 500,
                'message' => 'Error al crear el contrato'
            ]);
        }
    }

    public function buscarContratoPorDepartamento($valorDepartamento)
    {
        try {
            // Buscar los primeros dos contratos por el valor en el atributo "departamento"
            $contratos = Contrato::where('departamento_id', $valorDepartamento)->where('vigente_contrato', true)->take(2)->get();
    
            if ($contratos->isEmpty()) {
                // Si no se encuentran contratos, devolver un mensaje de error
                return response()->json([
                    'status' => 404,
                    'message' => 'Contratos no encontrados',
                    'contratos' => []
                ]);
            }
    
            // Devolver los contratos encontrados en la respuesta
            return response()->json([
                'status' => 200,
                'message' => 'Contratos encontrados',
                'contratos' => $contratos
            ]);
        } catch (\Exception $e) {
            // Manejar cualquier error que ocurra durante la búsqueda de contratos
            return response()->json([
                'status' => 500,
                'message' => 'Error al buscar los contratos'
            ], 500);
        }
    }
    public function getContratByDepShort($idDepartament){
        try{
            $contratos = Contrato::select('id','precio_contrato','tipo_contrato','vigente_contrato','departamento_id')
                                ->where('departamento_id',$idDepartament)
                                ->where('vigente_contrato',true)
                                ->take(2)->get();
            if($contratos->isEmpty()){
                return response()->json([
                    'status' => 404,
                    'message' => 'Contratos no encontrados',
                    'contratos' => []
                ]);
            }
            return response()->json([
                'status' => 200,
                'message' => 'Contratos encontrados',
                'contratos' => $contratos
            ]);
        } catch (\Exception $e) {
            // Manejar cualquier error que ocurra durante la búsqueda de contratos
            return response()->json([
                'status' => 500,
                'message' => 'Error al buscar los contratos'
            ], 500);
        }
    }

    public function show($id)
    {
        //mostrar el residente por su id
        $contrato = Contrato::find($id);
        //return response()->json($residente);
        return $contrato;
    }

    /* public function show(Contrato $contrato)
    {
        //
        if(!$contrato){
            return response()->json([
                'status' => 404,
                'message' => 'Contrato no encontrado'
            ]);
        }
        return response()->json([
            'status' => 200,
            'data' => $contrato
        ]);
    } */
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\GestDepartamento\Contrato  $contrato
     * @return \Illuminate\Http\Response
     */
    public function edit(Contrato $contrato)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\GestDepartamento\Contrato  $contrato
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $contrato = Contrato::find($id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\GestDepartamento\Contrato  $contrato
     * @return \Illuminate\Http\Response
     */
    public function destroy($id){
        //
        try{
            $contrato = Contrato::find($id);
            $contrato->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Contrato eliminado exitosamente'
            ]);
        }catch(\Exception $e){
            return response()->json([
                'status' => 500,
                'message' => 'Error al eliminar el contrato'
            ]);
        }
    }
    /* public function destroy(Contrato $contrato)
    {
        //
        try{
            $contrato->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Contrato eliminado exitosamente'
            ]);
        }catch(\Exception $e){
            return response()->json([
                'status' => 500,
                'message' => 'Error al eliminar el contrato'
            ]);
        }
        
    } */

    public function anularContrato(Request $request, $id)
    {
        $contrato = Contrato::findOrFail($id);

        // Actualiza el atributo específico
        $contrato->vigente_contrato = $request->input('vigente_contrato');
        $contrato->save();

        return response()->json(['mensaje' => 'Atributo actualizado correctamente']);
    }
}
