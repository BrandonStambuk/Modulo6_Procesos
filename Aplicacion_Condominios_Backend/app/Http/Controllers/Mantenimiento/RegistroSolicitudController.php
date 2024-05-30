<?php

namespace App\Http\Controllers\Mantenimiento;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Mantenimiento\RegistroSolicitud;
use Carbon\Carbon;

class RegistroSolicitudController extends Controller
{
    public function getRegistroSolicitud() {
        $personalExterno = RegistroSolicitud::with('categoria:id,catnombre', 'estado:idEstado,nombreEstado')->get();
        return response()->json($personalExterno, 200);
    }
    
    public function getRegistroSolicitudId($id) {
        $registroSolicitud = RegistroSolicitud::find($id);
        
        if(is_null($registroSolicitud)) {
            $response = ["message" => "Registro no encontrado"];
            $status = 404;
        } else {
            $response = $registroSolicitud;
            $status = 200;
        }
        
        return response()->json($response, $status);
    }
    
    public function insertRegistroSolicitud(Request $request) {
        $registroSolicitud = new RegistroSolicitud();
        $registroSolicitud-> idCategoria = $request -> idCategoria;
        $registroSolicitud-> descripcion = $request -> descripcion;
        $registroSolicitud-> nombrePropietario = $request -> nombrePropietario;
        $registroSolicitud-> ubicacion = $request -> ubicacion;
        $registroSolicitud-> numerReferencia = $request -> numerReferencia;
        $registroSolicitud-> idEstado = 1;
        $registroSolicitud-> fechaSolicitud = Carbon::now();
        $registroSolicitud -> save();
    }
    
    public function updateRegistroSolicitud(Request $request, $id) {
        $registroSolicitud = RegistroSolicitud::find($id); 
        
        if(is_null($registroSolicitud)) {
            $response = ["message" => "Registro no encontrado"];
            $status = 404;
        } else {
            $registroSolicitud->update($request->all());
            $response = $registroSolicitud;
            $status = 200;
        }
        
        return response()->json($response, $status);
    }
    
    public function deleteRegistroSolicitud($id) {
        $registroSolicitud = RegistroSolicitud::find($id); 
        
        if(is_null($registroSolicitud)){
            $response = ["message" => "Registro no encontrado"];
            $status = 404;
        } else {
            $registroSolicitud->delete();
            $response = ["message"=>"Registro eliminado"];
            $status = 200;
        }
        
        return response()->json($response, $status);
    }
    
    public function getSolicitudByPersonalExterno($id) 
    {
        $solicitud = RegistroSolicitud::where('idPersonalExterno', $id)->get();
        return $solicitud;
    } 
}
