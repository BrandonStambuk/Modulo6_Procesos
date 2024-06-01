<?php

namespace App\Http\Resources\CommonArea;

use Illuminate\Http\Resources\Json\ResourceCollection;

class ReservationCollection extends ResourceCollection
{
    public function toArray($request)
    {
        return $this->collection->map(function($reservation){
            $startTime = date('H:i', strtotime($reservation->start_time));
            $endTime = date('H:i', strtotime($reservation->end_time));
            return [
                "idCommonArea" => $reservation->id_common_area,
                "idReservation" => $reservation->id,
                "title" => $reservation->title,
                "reservationDate" => $reservation->reserved_date,
                "startTime" => $startTime,
                "endTime" => $endTime,
                "reason" => $reservation->reason,
                "numberPeople" => $reservation->number_of_people,
                'reserva_pagada' => $reservation->reserva_pagada,
            ];
        });
    }
}
