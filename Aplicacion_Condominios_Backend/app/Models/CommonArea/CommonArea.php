<?php

namespace App\Models\CommonArea;

use App\Models\Cobro_Servicios\EquipamientosModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommonArea extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_common_area';

    protected $fillable = [
        'common_area_name',
        'description',
        'capacity',
        'url_image',
        'available',
    ];

    public function equipments()
    {
        return $this->hasMany(EquipamientosModel::class, 'id_common_area');
    }

    public function schedules()
    {
        return $this->hasMany(Schedule::class, 'id_common_area');
    }

    public function policies()
    {
        return $this->hasMany(Policy::class, 'id_common_area');
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'id_common_area');
    }
}
