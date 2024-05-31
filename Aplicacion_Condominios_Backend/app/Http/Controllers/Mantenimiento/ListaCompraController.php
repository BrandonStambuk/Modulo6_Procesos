<?php

namespace App\Http\Controllers\Mantenimiento;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Mantenimiento\ListaCompra;
use App\Models\Mantenimiento\Insumo;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ListaCompraController extends Controller
{
    public function getListaCompra() {
        //$listaCompra = ListaCompra::with('solicitud.categoria:id,catnombre')->get();
        $listaCompra = ListaCompra::with([
            'solicitud' => function ($query) {
                $query->select('idRegistroSolicitud', 'idCategoria'); 
            },
            'solicitud.categoria' => function ($query) {
                $query->select('id', 'catnombre');
            }
        ])->get();
        
        return response()->json($listaCompra, 200);
    }
    
    // actualiza la tabla insumo e inserta un registro a la tabla lista_compra
    public function insertRegistroCompra(Request $request) {
        DB::beginTransaction();
        try {
            $existeCompra = ListaCompra::where('idSolicitud', $request->input('idSolicitud'))->first();
            
            if ($existeCompra) {
                return response()->json(['message' => 'La compra ya fué registrada anteriormente'], 400);
            }
            
            $insumos = $request->input('insumos');
            foreach ($insumos as $insumoData) {
                $insumo = Insumo::find($insumoData['idInsumo']);
                if ($insumo) {
                    $insumo->precioInsumo = $insumoData['precioInsumo'];
                    $insumo->cantidadInsumo = $insumoData['cantidadInsumo'];
                    $insumo->save();
                }
            }
            
            $listaCompra = new ListaCompra();
            $listaCompra->idSolicitud = $request->input('idSolicitud');
            $listaCompra->totalCompra = $request->input('totalCompra');
            $listaCompra-> fechaCompra = Carbon::now();
            $listaCompra->save();
            
            DB::commit();
            
            return response()->json(['message' => 'Compra registrada exitosamente'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error al registrar la compra', 'error' => $e->getMessage()], 500);
        }
    }
    
    // actualiza la tabla insumo y la tabla la lista_compra
    public function updateRegistroCompra(Request $request, $idCompra) {
        DB::beginTransaction();
        try {
            $insumos = $request->input('insumos');
            foreach ($insumos as $insumoData) {
                $insumo = Insumo::find($insumoData['idInsumo']);
                if ($insumo) {
                    $insumo->precioInsumo = $insumoData['precioInsumo'];
                    $insumo->cantidadInsumo = $insumoData['cantidadInsumo'];
                    $insumo->save();
                }
            }
            
            $listaCompra = ListaCompra::find($idCompra);
            if ($listaCompra) {
                $listaCompra->totalCompra = $request->input('totalCompra');
                $listaCompra->save();
            }
            
            DB::commit();
            
            return response()->json(['message' => 'Compra editada exitosamente'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error al editar la compra', 'error' => $e->getMessage()], 500);
        }
    }
}
