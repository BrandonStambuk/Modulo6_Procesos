<?php

namespace App\Http\Controllers\CommonArea;

use App\Http\Controllers\Controller;
use App\Http\Requests\CommonArea\CommonAreaRequest;
use App\Http\Requests\CommonArea\ReservationRequest;
use App\Http\Requests\CommonArea\UpdateCommonAreaRequest;
use App\Http\Resources\CommonArea\CommonAreaCollection;
use App\Http\Resources\CommonArea\CommonAreaResource;
use App\Http\Resources\CommonArea\ReservationCollection;
use App\Models\CommonArea\CommonArea;
use App\Models\CommonArea\Policy;
use App\Models\CommonArea\Reservation;
use App\Models\CommonArea\Schedule;
use Illuminate\Support\Facades\DB;
use App\Models\Cobro_Servicios\EquipamientosModel;
use App\Models\Reporte;

use Illuminate\Http\Request;

class CommonAreaController extends Controller
{
    public function index()
    {
        $commonAreas = CommonArea::all();
        $commonAreas = new CommonAreaCollection($commonAreas);
        return response()->json(['data' => [
           'commonAreas' => $commonAreas]
        ], 200);
    }

    public function store(CommonAreaRequest $request)
    {
        $policies = $request->get('policies');
        $schedule = $request->get('schedule');
        $dataCommonArea = [
            'common_area_name' => $request->get('name'),
            'description' => $request->get('description'),
            'capacity' => $request->get('capacity')
        ];

        $file = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $request->get('file')));
        $name = time() . '.jpg';
        $path = public_path('CommonAreas/images/' . $name);
        file_put_contents($path, $file);

        $dataCommonArea['url_image'] = 'CommonAreas/images/' . $name;



        try{
            $commonArea = null;
        DB::transaction(function () use ($policies, $schedule, &$commonArea, $dataCommonArea) {
                $commonArea = CommonArea::create($dataCommonArea);
                $schedule = collect($schedule)->map(function ($item) use ($commonArea) {
                    return [
                        'schedule_day' => $item['day'],
                        'start_hour' => $item['startHour'],
                        'end_hour' => $item['endHour'],
                        'id_common_area' => $commonArea->id_common_area
                    ];
                });

                $policies = collect($policies)->map(function ($item) use ($commonArea) {
                    return [
                        'description' => $item,
                        'id_common_area' => $commonArea->id_common_area
                    ];
                });

                Schedule::insert($schedule->toArray());
                Policy::insert($policies->toArray());
            });

            return response()->json(['data' => [
                'message' => 'Area comun creada correctamente',
                'common_area' => $commonArea
            ]], 201);
        }catch(\Exception $e){
            return response()->json(['message' => 'Error al crear el area comun',
            'errors' => [$e->getMessage()]
        ], 500);
        }
    }

    public function show($idCommonArea)
    {
        $commonArea = CommonArea::find($idCommonArea);
        if(!$commonArea){
            return response()->json(['message' => 'Area comun no encontrada'], 404);
        }
        return response()->json(['data' => [
            'commonArea' => new CommonAreaResource($commonArea)
        ]], 200);
    }

    public function update(UpdateCommonAreaRequest $request, $idCommonArea)
    {
        $policies = $request->get('policies');
        $schedule = $request->get('schedule');
        $name = $request->get('name');
        $description = $request->get('description');
        $capacity = $request->get('capacity');

        $commonArea = CommonArea::find($idCommonArea);

        $oldName = $commonArea->common_area_name;
        $oldDescription = $commonArea->description;
        $oldCapacity = $commonArea->capacity;

        $commonArea->common_area_name = isset($name) ? $name : $oldName;
        $commonArea->description = isset($description) ? $description : $oldDescription;
        $commonArea->capacity = isset($capacity) ? $capacity : $oldCapacity;

        if($schedule) {
            $commonArea->schedules()->delete();
            $values = collect($schedule)->map(function ($item) use ($commonArea) {
                return [
                    "schedule_day" => $item['day'],
                    "start_hour" => $item['startHour'],
                    "end_hour" => $item['endHour'],
                    "id_common_area" => $commonArea->id_common_area
                ];
            })->toArray();
            Schedule::insert($values);
        }

        if($policies) {
            $commonArea->policies()->delete();
            $values = collect($policies)->map(function ($item) use ($commonArea) {
                return [
                    "description" => $item,
                    "id_common_area" => $commonArea->id_common_area
                ];
            })->toArray();
            Policy::insert($values);
        }

        $commonArea->save();
        return response()->json(['data' => [
            'message' => 'Area comun actualizada correctamente',
            'commonArea' => new CommonAreaResource($commonArea)
        ]], 200);
    }

    public function destroy($idCommonArea)
    {
        $commonArea = CommonArea::find($idCommonArea);
        if(!$commonArea){
            return response()->json(['message' => 'Area comun no encontrada'], 404);
        }
        // delete file image
        $path = public_path($commonArea->url_image);
        if(file_exists($path)){
            unlink($path);
        }

        $commonArea->delete();
        return response()->json(['message' => 'Area comun eliminada correctamente'], 200);
    }

    public function reservations($idCommonArea) {
        $commonArea = CommonArea::find($idCommonArea);
        if(!$commonArea){
            return response()->json(['message' => 'Area comun no encontrada'], 404);
        }
        $reservations = $commonArea->reservations;
        return response()->json(['data' => [
            'reservations' => new ReservationCollection($reservations)
        ]], 200);
    }


    public function reservaPagada($idCommonArea) {
        $commonArea = CommonArea::find($idCommonArea);
        if(!$commonArea){
            return response()->json(['message' => 'Area comun no encontrada'], 404);
        }
        $reservations = $commonArea->reservations->map(function ($reservation) {
            return [
                'id' => $reservation->id,
                'reserved_date' => $reservation->reserved_date,
                'start_time' => $reservation->start_time,
                'end_time' => $reservation->end_time,
                'reason' => $reservation->reason,
                'number_of_people' => $reservation->number_of_people,
                'reserva_pagada' => $reservation->reserva_pagada
            ];
        });
        return response()->json(['data' => [
            'reservations' => $reservations
        ]], 200);
    }



    public function pagarReserva($idReserva) {
        $reservation = Reservation::find($idReserva);

        if(!$reservation){
            return response()->json(['message' => 'Reserva no encontrada'], 404);
        }

        $reservation->reserva_pagada = 1;
        $reservation->save();

        return response()->json(['message' => 'Reserva pagada exitosamente'], 200);
    }

    public function dummyMessage() {
        return response()->json(['message' => 'Hola mundo'], 200);
    }

    public function indexEquipment()
    {
        $equipments = EquipamientosModel::all();
        return response()->json(['data' => $equipments]);
    }


    public function storeEquipment(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'commonAreaId' => 'required|integer',
            'commonAreaName' => 'required|string',
        ]);

        $equipment = EquipamientosModel::create([
            'nombre' => $request->name,
            'descripcion' => $request->description,
            'costo' => $request->price,
            'area_comun_id' => $request->commonAreaId,
            'area_comun_nombre' => $request->commonAreaName,
        ]);

        return response()->json(['message' => 'Equipo registrado con éxito.'], 200);
    }


    public function updateEquipment(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'commonAreaId' => 'required|integer',
            'commonAreaName' => 'required|string',
        ]);

        $equipment = EquipamientosModel::findOrFail($id);
        $equipment->update([
            'nombre' => $request->name,
            'descripcion' => $request->description,
            'costo' => $request->price,
            'area_comun_id' => $request->commonAreaId,
            'area_comun_nombre' => $request->commonAreaName,
        ]);

        return response()->json(['message' => 'Equipo actualizado con éxito.'], 200);
    }

    public function destroyEquipment($id)
    {
        $equipment = EquipamientosModel::findOrFail($id);
        $equipment->delete();
        return response()->json(['message' => 'Equipo eliminado con éxito.'], 200);
    }

    public function showEquipment($id)
    {
        $equipment = EquipamientosModel::findOrFail($id);
        // return new EquipamientoResource($equipment);
        return response()->json(['data' => $equipment], 200);
    }

    public function createReport(Request $request)
    {
        $request->validate([
            'Id_residente' => 'required|integer',
            'Id_areaComun' => 'required|integer',
            'Id_equipment' => 'required|integer',
            'Costo_reponer' => 'required|numeric',
            'Cantidad_reponer' => 'required|integer',
            'Situacion' => 'required|string',
            'Info' => 'required|string',
        ]);

        $reporte = Reporte::create([
            'id_residente' => $request->Id_residente,
            'id_common_area' => $request->Id_areaComun,
            'id_equipment' => $request->Id_equipment,
            'costo_reponer' => $request->Costo_reponer,
            'cantidad_reponer' => $request->Cantidad_reponer,
            'situacion' => $request->Situacion,
            'info' => $request->Info,
        ]);

        return response()->json($reporte, 201);
    }

    public function getReports() {
        $reports = collect(Reporte::all())->map(function ($report) {
            $nameResidente = DB::table('residentes')->where('id', $report->id_residente)->value('nombre_residente');
            $nameCommonArea = DB::table('common_areas')->where('id_common_area', $report->id_common_area)->value('common_area_name');
            $nameEquipment = DB::table('equipamientos')->where('id', $report->id_equipment)->value('nombre');
            return [
                'id' => $report->id,
                'residentName' => $nameResidente,
                'commonAreaName' => $nameCommonArea,
                'equipmentName' => $nameEquipment,
                'cosToReplace' => $report->costo_reponer,
                'countToReplace' => $report->cantidad_reponer,
                'situation' => $report->situacion,
                'information' => $report->info,
            ];
        });
        return response()->json(['data' => $reports], 200);
    }
}
