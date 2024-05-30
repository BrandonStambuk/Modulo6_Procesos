<?php

namespace App\Models\GestDepartamento;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class departamento extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'nombre_departamento',
        'numero_habitaciones',
        'numero_personas',
        'superficie',
        'disponibilidad',
        'amoblado',
        'ofertado_venta',
        'ofertado_alquiler',
        'ofertado_anticretico',
        'descripcion_departamento',
        'piso',
        'imagen_departamento',
        'edificio_id'
    ];
    public function edificio()
    {
        return $this->belongsTo(edificio::class);
    }
    public function contratos()
    {
        return $this->hasMany(Contrato::class, 'id');
    }
    public function parqueos()
    {
        return $this->hasMany(Parqueo::class, 'id');
    }
}
