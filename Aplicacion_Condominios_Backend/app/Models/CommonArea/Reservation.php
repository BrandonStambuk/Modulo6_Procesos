<?php

namespace App\Models\CommonArea;

use App\Models\GestDepartamento\Residente;
use App\Models\Reporte;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';

    protected $fillable = [
        'reserved_date',
        'start_time',
        'end_time',
        'reason',
        'number_of_people',
        'title',
        'reserva_pagada',
        'id_common_area',
        'id_resident',
        'id_reservation'
    ];

    public function commonArea()
    {
        return $this->belongsTo(CommonArea::class, 'id_common_area');
    }

    public function resident()
    {
        return $this->belongsTo(Residente::class, 'id_resident', 'id');
    }

    public function report()
    {
        return $this->hasMany(Reporte::class, 'id_reservation');
    }
}
