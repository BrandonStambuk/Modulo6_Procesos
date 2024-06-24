<?php

namespace App\Http\Resources\CommonArea;

use Illuminate\Http\Resources\Json\JsonResource;

class CommonAreaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id_common_area,
            'name' => $this->common_area_name,
            'description' => $this->description,
            'capacity' => $this->capacity,
            'urlImage' => $this->url_image,
            'schedule' => $this->schedules->map(function ($schedule) {
                return [
                    'day' => $schedule->schedule_day,
                    'startHour' => $schedule->start_hour,
                    'endHour' => $schedule->end_hour,
                ];
            }),
            'policies' => $this->policies->map(function ($policy) {
                return $policy->description;
            }),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'available' => !($this->available === 0)
        ];
    }
}
