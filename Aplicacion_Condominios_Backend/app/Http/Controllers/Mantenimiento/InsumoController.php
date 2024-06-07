<?php

namespace App\Http\Controllers\Mantenimiento;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Mantenimiento\Insumo;

class InsumoController extends Controller
{
    // de la tabla INSUMO agrupa las solicitudes por idSolicitud (devuelve una sola vez por solicitud)
    public function getInsumoBySolicitud() {
        $insumo = Insumo::with('solicitud.categoria')->get();
        $groupedInsumos = $insumo->groupBy('idSolicitud');
        $uniqueInsumos = $groupedInsumos->map(function ($group) {
            $firstItem = $group->first(); 
            return [
                'idSolicitud' => $firstItem->idSolicitud,
                'catnombre' => $firstItem->solicitud->categoria->catnombre,
                'encargado' => $firstItem->solicitud->encargado,
            ];
        })->values();
        
        return response()->json($uniqueInsumos, 200);
    }
    
    // devuelve TODOS los registros de una solicitud dada + los precios
    public function getInsumosBySolicitudAll($idSolicitud) {
        $insumos = Insumo::where('idSolicitud', $idSolicitud)->get();
        $totalCompra = 0;
        $insumos = $insumos->map(function ($insumo) use (&$totalCompra) {
            $insumo->totalInsumo = $insumo->precioInsumo * $insumo->cantidadInsumo;
            $totalCompra += $insumo->totalInsumo;
            return $insumo;
        });
        
        $response = [
            'insumos' => $insumos,
            'totalCompra' => $totalCompra
        ];
        
        return response()->json($response, 200);
    }
    
    // agrupa las solicitudes por categoria (devolviendo UNA sola vez por solicitud)
    public function getInsumosByCategoria($idCategoria) {
        $insumos = Insumo::whereHas('solicitud', function ($query) use ($idCategoria) {
            $query->where('idCategoria', $idCategoria);
        })->with('solicitud:idRegistroSolicitud,idCategoria')
        ->get()
        ->unique('idSolicitud');
        
        return response()->json($insumos, 200);
    }
    
    // muestra todo el contenido de la tabla INSUMO 
    public function getInsumo() {
        $insumo = Insumo::with('solicitud.categoria')->get();
        return response()->json($insumo, 200);
    }
    
    
    public function getInsumoId($id) {
        $insumo = Insumo::find($id);
        
        if(is_null($insumo)) {
            $response = ["message" => "Registro no encontrado"];
            $status = 404;
        } else {
            $response = $insumo;
            $status = 200;
        }
        
        return response()->json($response, $status);
    }
    
    public function insertInsumo(Request $request) {
        $insumo = Insumo::create($request->all());
        
        if(is_null($insumo)) {
            $response = ["message" => "Hubo problemas al registrar"];
            $status = 404;
        } else {
            $response = $insumo;
            $status = 200;
        }
        
        return response()->json($response, $status);
    }
    
    public function updateInsumo(Request $request, $id) {
        $insumo = Insumo::find($id); 
        
        if(is_null($insumo)) {
            $response = ["message" => "Registro no encontrado"];
            $status = 404;
        } else {
            $insumo->update($request->all());
            $response = $insumo;
            $status = 200;
        }
        
        return response()->json($response, $status);
    }
    
    // Elimina por idInsumo
    public function deleteInsumo($id) {
        $insumo = Insumo::find($id); 
        
        if(is_null($insumo)){
            $response = ["message" => "Registro no encontrado"];
            $status = 404;
        } else {
            $insumo->delete();
            $response = ["message"=>"Registro eliminado"];
            $status = 200;
        }
        
        return response()->json($response, $status);
    }
    
    // Elimina por idSolicitud de la tabla insumo
    public function deleteInsumobySolicitud($id) {
        $deletedRows = Insumo::where('idSolicitud', $id);
        
        if ($deletedRows === 0) {
            $response = ["message" => "Registro(s) no encontrado(s)"];
            $status = 404;
        } else {
            $deletedRows->delete();
            $response = ["message" => "Registro(s) eliminado(s)"];
            $status = 200;
        }
        
        return response()->json($response, $status);
    }
}
