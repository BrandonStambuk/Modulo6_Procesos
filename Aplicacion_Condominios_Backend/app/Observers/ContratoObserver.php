<?php

namespace App\Observers;

use App\Models\GestDepartamento\Contrato;
use App\Models\GestDepartamento\Residente;
use App\Models\GestDepartamento\Departamento;
use Carbon\Carbon;

class ContratoObserver
{
    /**
     * Handle the Contrato "created" event.
     *
     * @param  \App\Models\GestDepartamento\Contrato  $contrato
     * @return void
     */
    public function created(Contrato $contrato)
    {
        //$id_departamento = $contrato->departamento_id;
        
        //verificar si la fecha fin es anterior a la fecha actual
        $fechaActual = Carbon::now();
        if($contrato->fecha_fin_contrato && $contrato->fecha_fin_contrato->lessThan($fechaActual)){
            $contrato->vigente_contrato = false;
            if($contrato->departamento_id <> null){
                $departamento = Departamento::find($contrato->departamento_id);
                $departamento->disponibilidad = true;
                $departamento->save();
                $contrato->departamento_id = null;
            }
            $contrato->save();
        }
        if($contrato->departamento_id === null){
            $contrato->vigente_contrato = false;
            $contrato->save();
        }

    }

    /**
     * Handle the Contrato "updated" event.
     *
     * @param  \App\Models\GestDepartamento\Contrato  $contrato
     * @return void
     */
    public function updated(Contrato $contrato)
    {
        /* $residentes=Residente::where('contrato_id',$contrato->id)->get();
        
        //verificar si la fecha fin es anterior a la fecha actual
        $fechaActual = Carbon::now();
        if($contrato->fecha_fin_contrato->lessThan($fechaActual)){
            $contrato->vigente_contrato = 0;
            $contrato->departamento_id = null;
            foreach($residentes as $residente){
                $residente->id_contrato = null;
                $residente->save();
            }
            $contrato->save();
        } */
    }

    /**
     * Handle the Contrato "deleted" event.
     *
     * @param  \App\Models\GestDepartamento\Contrato  $contrato
     * @return void
     */
    public function deleted(Contrato $contrato)
    {
        //
    }

    /**
     * Handle the Contrato "restored" event.
     *
     * @param  \App\Models\GestDepartamento\Contrato  $contrato
     * @return void
     */
    public function restored(Contrato $contrato)
    {
        //
    }

    /**
     * Handle the Contrato "force deleted" event.
     *
     * @param  \App\Models\GestDepartamento\Contrato  $contrato
     * @return void
     */
    public function forceDeleted(Contrato $contrato)
    {
        //
    }
}
