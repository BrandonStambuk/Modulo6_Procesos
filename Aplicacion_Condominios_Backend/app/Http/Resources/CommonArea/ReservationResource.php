<?php

namespace App\Http\Resources\CommonArea;

use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource
{
    public function toArray($request)
    {
        $startTime = date('H:i', strtotime($this->start_time));
        $endTime = date('H:i', strtotime($this->end_time));

        return [
            "idCommonArea" => $this->id_common_area,
            "idReservation" => $this->id,
            "title" => $this->title,
            "reservationDate" => $this->reserved_date,
            "startTime" => $startTime,
            "endTime" => $endTime,
            "reason" => $this->reason,
            "numberPeople" => $this->number_of_people,
            'reserva_pagada' => $this->reserva_pagada,
        ];
    }
}
