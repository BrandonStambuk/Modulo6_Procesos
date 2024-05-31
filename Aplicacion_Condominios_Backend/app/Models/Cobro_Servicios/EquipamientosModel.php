<?php

namespace App\Models\Cobro_Servicios;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\CommonArea\CommonArea; // Import the AreasComunes model
use App\Models\Mantenimiento\CategoriaServicio; // Import the CategoriaServicios model
use App\Models\GestDepartamento\Residente; // Import the Residente model

class EquipamientosModel extends Model
{
    use HasFactory;

    protected $table = 'equipamientos';

    protected $fillable = [
        'nombre',
        'categoria',
        'descripcion',
        'costo',
        'area_comun_id',
        'categoria_id',
        'residente_id',
        'area_comun_nombre'
    ];

    public function areaComun()
    {
        return $this->belongsTo(CommonArea::class, 'area_comun_id', 'id_common_area');
    }

    public function categoriaServicio()
    {
        return $this->belongsTo(CategoriaServicios::class, 'categoria_id');
    }

    public function residente()
    {
        return $this->belongsTo(Residente::class, 'residente_id');
    }
}
