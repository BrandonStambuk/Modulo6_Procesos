<?php

namespace App\Http\Controllers\CommonArea;

use App\Models\Cobro_Servicios\EquipamientosModel;
use App\Models\CommonArea\CommonArea;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class EquipmentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string',
            'descripcion' => 'required|string',
            'costo' => 'required|numeric',
            'cantidad' => 'required|integer',
            'area_comun_nombre' => 'required|string',
        ]);

        // Buscar el ID del área común por su nombre
        $area_comun_nombre = $request->area_comun_nombre;
        $area_comun_id = CommonArea::where('common_area_name', $area_comun_nombre)->value('id_common_area');

        if (!$area_comun_id) {
            return response()->json([
                'status' => 404,
                'message' => 'El área común especificada no existe.',
            ], 404);
        }

        // Crea un nuevo equipo
        $equipamiento = new EquipamientosModel();
        $equipamiento->nombre = $request->nombre;
        $equipamiento->descripcion = $request->descripcion;
        $equipamiento->costo = $request->costo;
        $equipamiento->cantidad = $request->cantidad;
        $equipamiento->area_comun_id = $area_comun_id; // Asigna el ID del área común encontrado
        $equipamiento->area_comun_nombre = $area_comun_nombre; // Guarda el nombre del área común
        $equipamiento->save();

        return response()->json([
            'status' => 200,
            'message' => 'Equipo dañado añadido exitosamente',
        ]);
    }

    public function getAllCommonAreas()
{
    $common_areas = CommonArea::pluck('common_area_name');
    return response()->json([
        $common_areas
    ]);
}


public function getAllCommonAreasID()
{
    $common_areas = CommonArea::pluck('common_area_name', 'id_common_area');
    return response()->json($common_areas);
}

public function edit(Request $request, $id)
{
    $request->validate([
        'nombre' => 'required|string',
        'descripcion' => 'required|string',
        'costo' => 'required|numeric',
        'area_comun_nombre' => 'required|string',
    ]);

    try {
        // Buscar el equipo por su ID
        $equipo = EquipamientosModel::findOrFail($id);

        // Buscar el ID del área común por su nombre
        $area_comun_nombre = $request->area_comun_nombre;
        $area_comun_id = CommonArea::where('common_area_name', $area_comun_nombre)->value('id_common_area');

        if (!$area_comun_id) {
            return response()->json([
                'status' => 404,
                'message' => 'El área común especificada no existe.',
            ], 404);
        }

        // Actualizar los datos del equipo
        $equipo->nombre = $request->nombre;
        $equipo->descripcion = $request->descripcion;
        $equipo->costo = $request->costo;
        $equipo->area_comun_id = $area_comun_id; // Asigna el ID del área común encontrado
        $equipo->area_comun_nombre = $area_comun_nombre; // Guarda el nombre del área común
        $equipo->save();

        return response()->json([
            'status' => 200,
            'message' => 'Equipo editado exitosamente',
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 500,
            'message' => 'Error al editar el equipo: ' . $e->getMessage(),
        ], 500);
    }
}

public function getEquipoById($id)
{
    try {
        $equipo = EquipamientosModel::select('id','nombre', 'descripcion', 'costo', 'area_comun_nombre')
                                    ->findOrFail($id);

        return response()->json([
            'status' => 200,
            'equipo' => $equipo,
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 500,
            'message' => 'Error al obtener los detalles del equipo: ' . $e->getMessage(),
        ], 500);
    }
}

public function index()
{
    $equipamientos = EquipamientosModel::select('id','nombre', 'descripcion', 'cantidad', 'costo', 'area_comun_nombre')->get();
    return response()->json([
        'equipamientos' => $equipamientos,
    ]);
}

public function delete($id)
    {
        try {
            // Buscar el equipo por su ID
            $equipo = EquipamientosModel::findOrFail($id);
            $equipo->delete();
            
            return response()->json([
                'status' => 200,
                'message' => 'Equipo eliminado exitosamente',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => 'Error al eliminar el equipo: ' . $e->getMessage(),
            ], 500);
        }
    }


}