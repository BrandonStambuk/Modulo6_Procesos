<?php

namespace App\Http\Controllers\Mantenimiento;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Mantenimiento\ContratoPersonal;
use App\Models\Mantenimiento\RegistroSolicitud;

class ContratoPersonalController extends Controller
{
    public function getContratoPersonalController() {
        $contratoPersonal = ContratoPersonal::with(['solicitud' => function ($query) {
            $query->select('idRegistroSolicitud', 'idCategoria', 'ubicacion', 'encargado')
                ->with(['categoria' => function ($query) {
                    $query->select('id', 'catnombre');
                }]);
        }])->get();
        return response()->json($contratoPersonal, 200);
    }

    public function getContratoPersonalIdSolicitud($id) {
        $contratoPersonal = ContratoPersonal::with(['solicitud' => function ($query) {
            $query->select('idRegistroSolicitud', 'idCategoria', 'ubicacion', 'encargado')
                ->with(['categoria' => function ($query) {
                    $query->select('id', 'catnombre');
                }]);
        }])->where('idSolicitud', $id)->first();
        
        if(is_null($contratoPersonal)) {
            $response = ["message" => "Registro no encontrado"];
            $status = 404;
        } else {
            $response = $contratoPersonal;
            $status = 200;
        }
        
        return response()->json($response, $status);
    }
    
    public function insertContratoPersonal(Request $request) {
        $contratoPersonal = new ContratoPersonal();
        $contratoPersonal-> idSolicitud = $request -> idSolicitud;
        $contratoPersonal-> fechaInicio = $request -> fechaInicio;
        $contratoPersonal-> salario = $request -> salario;
        $contratoPersonal-> save();
        
        $registroSolicitud = RegistroSolicitud::find($request -> idSolicitud); 
        $registroSolicitud-> idEstadoContrato = 3;
        $registroSolicitud-> save();
    }
}
