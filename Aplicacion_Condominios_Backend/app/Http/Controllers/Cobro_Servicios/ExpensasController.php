<?php


namespace App\Http\Controllers\Cobro_Servicios;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Cobro_Servicios\ExpensaModel;
use App\Models\Cobro_Servicios\PreAvisoModel;
class ExpensasController extends Controller
{
    public function index()
    {
        $expensas = ExpensaModel::all();
        
        return response()->json([
            'status' => 200,
            'data' => $expensas,
        ]);
    }
    public function store(Request $request)
    {
    
        $request->validate([
            'preaviso_id' => 'required|exists:App\Models\Cobro_Servicios\PreAvisoModel,id',
        ]);
        $preaviso = PreAvisoModel::findOrFail($request->preaviso_id); // Aquí deberías usar $request->preaviso_id

        $expensa = new ExpensaModel();

        //$expensa->departamento_id = $preaviso->departamento_id;
        $expensa->preaviso_id = $preaviso->id;

        $expensa->fecha = $preaviso->fecha;
        $expensa->propietario_pagar = $preaviso->propietario_pagar;
        $expensa->descripcion_servicios = $preaviso->descripcion_servicios;
        $expensa->servicio_pagar = $preaviso->servicio_pagar;
        $expensa->monto = $preaviso->monto;
        $expensa->id_propietarioPagar = $preaviso ->id_propietarioPagar;
        $expensa->pagado = false;

        $expensa->save();

        return response()->json([
            'status' => 200,
            'message' => 'Expensa generada exitosamente',
        ]);
    }
    public function show($id)
    {
        $expensa = ExpensaModel::findOrFail($id);
        
        return response()->json([
            'status' => 200,
            'data' => $expensa,
        ]);
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'fecha' => 'required|date',
            'propietario_pagar' => 'required|string',
            'descripcion_servicios' => 'required|string',
            'servicio_pagar' => 'required|string',
            'monto' => 'required|numeric',
        ]);

        $expensa = ExpensaModel::findOrFail($id);

        $expensa->fecha = $request->fecha;
        $expensa->propietario_pagar = $request->propietario_pagar;
        $expensa->descripcion_servicios = $request->descripcion_servicios;
        $expensa->servicio_pagar = $request->servicio_pagar;
        $expensa->monto = $request->monto;
        $expensa->pagado = $preaviso->pagado;

        // Guardar los cambios en la base de datos
        $expensa->save();

        return response()->json([
            'status' => 200,
            'message' => 'Expensa actualizada exitosamente',
        ]);
    }

    public function destroy($id)
    {
        $expensa = ExpensaModel::findOrFail($id);
        $expensa->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Expensa eliminada exitosamente',
        ]);


    }


    public function pagar($id)
{
    $expensa = ExpensaModel::findOrFail($id);
    
    if(!$expensa){
        return response()->json(['message' => 'Expensa no encontrada'], 404);
    }    
    
    if ($expensa->pagado) {
        return response()->json([
            'status' => 400,
            'message' => 'La expensa ya ha sido pagada anteriormente',
        ]);
    }

    // Cambiar el valor de la propiedad 'pagado' a true
    $expensa->pagado = true;
    $expensa->save();

    return response()->json([
        'status' => 200,
        'message' => 'Expensa marcada como pagada exitosamente',
    ]);
}

}
