<?php

namespace App\Http\Controllers\Departamento;

use App\Http\Controllers\Controller;
use App\Models\GestDepartamento\Residente;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class ResidenteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //mostrar todos los residentes
        
        $residentes = Residente::all();
        return $residentes;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //validacion de datos
        $validate = $request->validate([
            'nombre_residente' => 'required|string|max:50',
            'apellidos_residente' => 'required|string|max:150',
            'cedula_residente' => 'required',
            'telefono_residente' => 'required',
            'fecha_nacimiento_residente' => 'required|date',
            'tipo_residente' => 'required',
            'nacionalidad_residente' => 'required',
            'email_residente' => 'nullable|email|unique:residentes,email_residente',
            'genero_residente' => 'required',
            'estado_residente' => 'required',
            'imagen_residente' => 'sometimes|file|image|mimes:jpeg,png,jpg,gif,svg|max:3048',
            'contrato_id' => 'nullable',
            'monto_pagar' => 'nullable'
        ]);
        //Residente::create($validate);
        $residente = new Residente($validate);
        if($request->hasFile('imagen_residente')){
            $image = $request->file('imagen_residente');
            $name = time().'.'.$image->getClientOriginalExtension();
            $image->move('departamento/images/residentes/', $name);
            $residente->imagen_residente = "departamento/images/residentes/${name}";
            $residente->save();
            return response()->json([
                'status' => 200,
                'message' => 'Residente creado exitosamente'
            ]);
        }else{
            $errors = $request->file('imagen_residente') ? $request->file('imagen_residente')->getErrorMessage() : 'No file or file has errors';
            \Log::info('Error with image upload: ' . $errors);  // Utiliza Log para verificar qué está pasando


            $residente->imagen_residente = 'departamento/images/residentes/residente_default.png';
            $residente->save();
            return response()->json([
                'status' => 200,
                'message' => 'Residente creado por defecto'
            ]);
        }
        
        /* if(!$request->hasFile('imagen_residente') || !$residente->imagen_residente){
            //añade una imagen predeterminada si no se sube una imagen
            $imagenPredeterminada = 'departamento/images/residentes/residente_default.png';
            $residente->imagen_residente = $imagenPredeterminada;
            $residente->save();
            return response()->json([
                'status' => 200,
                'message' => 'Residente creado exitosamente'
            ]);
        } */
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\GestDepartamento\Residente  $residente
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //mostrar el residente por su id
        $residente = Residente::find($id);
        //return response()->json($residente);
        return $residente;
    }

    public function getResidentesbyEstado($estado)
    {
        $residentes = Residente::where('estado_residente', $estado)->get();
        return $residentes;
    } 

    public function actualizarEstadoContrato()
    {
        // Busca los residentes con contrato_id null
        $residentesSinContrato = Residente::whereNull('contrato_id')->get();

        // Actualiza el estado_residente a 0 para los residentes encontrados
        foreach ($residentesSinContrato as $residente) {
            $residente->estado_residente = 0;
            $residente->save();
        }

        return response()->json(['mensaje' => 'Estado de residentes actualizado correctamente']);
    }

    public function actualizarEstadoResidente(Request $request, $id)
    {
        $residente = Residente::findOrFail($id);

        // Verifica si el residente tiene contrato_id null antes de modificar los atributos
        if ($residente->contrato_id === null) {
            $usuario->estado_residente = $request->input('estado_residente');
            
        }else{
            $residente->contrato_id = null;
            $residente->estado_residente = $request->input('estado_residente');
            $residente->tipo_residente = "ninguno";
        }

        $residente->save();

        return response()->json(['mensaje' => 'Atributos actualizados correctamente']);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\GestDepartamento\Residente  $residente
     * @return \Illuminate\Http\Response
     */
    public function edit(Residente $residente)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\GestDepartamento\Residente  $residente
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id)
    {
        //
        $residente = Residente::find($id);
        if(!$residente){
            return response()->json([
                'status' => 404,
                'message' => 'Residente no encontrado'
            ]);
        }
        //actualizar el residente

        $residente->update($request->all());
        if($request->hasFile('imagen_residente')){
            $image = $request->file('imagen_residente');
            $name = time().'.'.$image->getClientOriginalExtension();
            $image->move('departamento/images/residentes/', $name);
            $residente->imagen_residente = "departamento/images/residentes/${name}";
            $residente->save();
            return response()->json([
                'status' => 200,
                'message' => 'Residente actualizado exitosamente'
            ]);
        }else{
            $errors = $request->file('imagen_residente') ? $request->file('imagen_residente')->getErrorMessage() : 'No file or file has errors';
            \Log::info('Error with image upload: ' . $errors);  // Utiliza Log para verificar qué está pasando

            $residente->imagen_residente = 'departamento/images/residentes/residente_pred.jpg';
            $residente->save();
            return response()->json([
                'status' => 200,
                'message' => 'Residente creado por defecto',
                'errors' => $errors,
                'imagen' => $request
            ]);
        }
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\GestDepartamento\Residente  $residente
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //eliminar un residente 
        $residente = Residente::find($id);
        $residente->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Residente eliminado exitosamente'
        ]);
    }

    public function actualizarContrato(Request $request, $id)
    {
        $residente = Residente::findOrFail($id);

        // Actualiza el atributo específico
        $residente->contrato_id = $request->input('contrato_id');
        $residente->tipo_residente = $request->input('tipo_residente');
        $residente->save();

        return response()->json(['mensaje' => 'Atributo actualizado correctamente']);
    }

    /* public function import(Request $request){
        $file = $request->file('file');
        //leer el archivo csv
        $csv = Reader::createFromPath($file->getPathname(), 'r');
        $csv->setHeaderOffset(0); //ignora la primera fila asumiendo que son los encabezados

        $records = $csv->getRecords(); //obtiene todos los registros

        foreach($records as $record){
            //validar si el registro ya existe
            $validator = Validator::make($record,[
                'nombre_residente' => 'required|string|max:100',
                'apellidos_residente' => 'required|string|max:150',
                'cedula_residente' => 'required',
                'telefono_residente' => 'required',
                'fecha_nacimiento_residente' => 'required',
                'tipo_residente' => 'required',
                'nacionalidad_residente' => 'required',
                'email_residente' => 'nullable|email|unique:residentes,email_residente',
                'genero_residente' => 'required',
                'estado_residente' => 'required',
                'imagen_residente' => 'required',
                'contrato_id' => 'nullable'
            ]);

            //verificar si la validación falla
            if($validator->fails()){
                //retornar respuesta con errores
                return response()->json([
                    'status' => 400,
                    'message' => 'Error de validación',
                    'errors' => $validator->errors()
                ]);
                continue; //continuar con el siguiente registro
            }
            //crear un nuevo residente
            //$residente = new Residente();
            //$residente->nombre_residente = $record['nombre_residente'];
            //$residente->apellido_residente = $record['apellido_residente'];
            //$residente->cedula_residente = $record['cedula_residente']; 
            //si la validación es exitosa, crear un nuevo residente
            $residente = Residente::create([
                'nombre_residente' => $record['nombre_residente'],
                'apellidos_residente' => $record['apellidos_residente'],
                'cedula_residente' => $record['cedula_residente'],
                'telefono_residente' => $record['telefono_residente'],
                'fecha_nacimiento_residente' => $record['fecha_nacimiento_residente'],
                'tipo_residente' => $record['tipo_residente'],
                'nacionalidad_residente' => $record['nacionalidad_residente'],
                'email_residente' => $record['email_residente'],
                'genero_residente' => $record['genero_residente'],
                'estado_residente' => $record['estado_residente'],
                'imagen_residente' => $record['imagen_residente'],
                'contrato_id' => $record['contrato_id']
            ]);
            //guardar el residente
            $residente->save(); //guardar el residente
        }
        return response()->json([
            'status' => 200,
            'message' => 'Residentes importados exitosamente'
        ]);
    } */
    
    public function getResidentesByContrato($id)
    {
        $residentes = Residente::where('contrato_id', $id)->get();
        return $residentes;
    }

    public function getPropietariosByContrato($valorContrato)
    {
        try {
            $residente = Residente::where('contrato_id', $valorContrato)->where('tipo_residente', "Propietario")->first();
            if ($residente === null) {
                return response()->json([
                    'status' => 404,
                    'message' => 'No tiene propietario',
                    'residente' => []
                ]);
            }
            return response()->json([
                'status' => 200,
                'message' => 'Propietario encontrado',
                'residente' => $residente
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => 'Error al buscar los propietario'
            ], 500);
        }
    }

    public function getPropietByContratShort($valorContrato){
        try {
            $residente = Residente::select('nombre_residente', 'apellidos_residente')
                                    ->where('contrato_id', $valorContrato)
                                    ->where('tipo_residente', "Propietario")
                                    ->first();
            if ($residente === null) {
                return response()->json([
                    'status' => 404,
                    'message' => 'No tiene propietario',
                    'residente' => null
                ]);
            }
            return response()->json([
                'status' => 200,
                'message' => 'Propietario encontrado',
                'residente' => $residente
            ]);
        } catch (\Exception $e) {

        }
    }
    public function getTitularByContrato($valorContrato)
    {
        try {
            $residente = Residente::where('contrato_id', $valorContrato)->where('tipo_residente', "Titular")->first();
            if ($residente === null) {
                return response()->json([
                    'status' => 404,
                    'message' => 'No tiene titular',
                    'residente' => []
                ]);
            }
            return response()->json([
                'status' => 200,
                'message' => 'Titular encontrado',
                'residente' => $residente
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => 'Error al buscar los titulares'
            ], 500);
        }
    }
    public function getTituByContratShort($valorContrato){
        try {
            $residente = Residente::select('nombre_residente', 'apellidos_residente')
                                    ->where('contrato_id', $valorContrato)
                                    ->where('tipo_residente', "Titular")
                                    ->first();
            if ($residente === null) {
                return response()->json([
                    'status' => 404,
                    'message' => 'No tiene titular',
                    'residente' => null
                ]);
            }
            return response()->json([
                'status' => 200,
                'message' => 'Titular encontrado',
                'residente' => $residente
            ]);
        } catch (\Exception $e) {

        }
    }
    public function notificacionesGenerales()
    {
        try {
            $residentes = Residente::where('tipo_residente', 'Propietario')
                ->orWhere('tipo_residente', 'Titular')
                ->get();
    
            if ($residentes->isEmpty()) {
                return response()->json([
                    'status' => 404,
                    'message' => 'No se encontraron residentes con tipo "Propietario" o "Titular"',
                    'residente' => []
                ]);
            }
            return response()->json([
                'status' => 200,
                'message' => 'Residentes encontrados',
                'residentes' => $residentes
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => 'Error al buscar residentes'
            ], 500);
        }
    }
    public function getResidenteByDepartamento($id)
    {
        $residente = Residente::whereHas('contrato', function ($query) use ($id) {
            $query->where('id', $id);
        })->get()->first(); 
        
	return $residente;
    }

}
