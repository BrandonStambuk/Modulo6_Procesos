<?php

namespace App\Http\Controllers\Mantenimiento;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Mantenimiento\PersonalExterno;

class PersonalExternoController extends Controller
{
    public function getPersonalExterno() {
        $personalExterno = PersonalExterno::with('categoria:id,catnombre')->get();
        return response()->json($personalExterno, 200);
    }
    
    public function getPersonalExternoId($id) {
        $personalExterno = PersonalExterno::find($id);
        
        if(is_null($personalExterno)) {
            $response = ["message" => "Registro no encontrado"];
            $status = 404;
        } else {
            $response = $personalExterno;
            $status = 200;
        }
        
        return response()->json($response, $status);
    }
    
    public function insertPersonalExterno(Request $request) {
        $personalExterno = PersonalExterno::create($request->all());
        
        if(is_null($personalExterno)) {
            $response = ["message" => "Hubo problemas al registrar"];
            $status = 404;
        } else {
            $response = $personalExterno;
            $status = 200;
        }
        
        return response()->json($response, $status);
    }
    
    public function updatePersonalExterno(Request $request, $id) {
        $personalExterno = PersonalExterno::find($id); 
        
        if(is_null($personalExterno)) {
            $response = ["message" => "Registro no encontrado"];
            $status = 404;
        } else {
            $personalExterno->update($request->all());
            $response = $personalExterno;
            $status = 200;
        }
        
        return response()->json($response, $status);
    }
    
    public function deletePersonalExterno($id) {
        $personalExterno = PersonalExterno::find($id); 
        
        if(is_null($personalExterno)){
            $response = ["message" => "Registro no encontrado"];
            $status = 404;
        } else {
            $personalExterno->delete();
            $response = ["message"=>"Registro eliminado"];
            $status = 200;
        }
        
        return response()->json($response, $status);
    }
    
    public function getPersonalExternoByCategoria($id) 
    {
        $personalExterno = PersonalExterno::where('idCategoria', $id)->get();
        return $personalExterno;
    } 
}
