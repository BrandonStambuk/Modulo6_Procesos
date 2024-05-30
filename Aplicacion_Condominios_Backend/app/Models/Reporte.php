<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Cobro_Servicios\EquipamientosModel;
use App\Models\CommonArea;

class Reporte extends Model
{
    use HasFactory;

    // Definir los atributos que son asignables en masa
    protected $fillable = [
        'id_residente',
        'id_common_area',
        'id_equipment',
        'costo_reponer',
        'cantidad_reponer',
        'situacion',
        'info'
    ];

    // Definir las relaciones

    // Relación con el modelo User
    public function residente()
    {
        return $this->belongsTo(User::class, 'id_residente');
    }

    // Relación con el modelo CommonArea
    public function areaComun()
    {
        return $this->belongsTo(CommonArea::class, 'id_common_area');
    }

    // Relación con el modelo EquipamientosModel
    public function equipment()
    {
        return $this->belongsTo(EquipamientosModel::class, 'id_equipment');
    }
}
