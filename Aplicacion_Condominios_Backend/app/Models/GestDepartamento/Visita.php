<?php

namespace App\Models\GestDepartamento;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visita extends Model
{
    use HasFactory;
    protected $fillable = [
        'nombre_visita',
        'apellidos_visita',
        'cedula_visita',
        'telefono_visita',
        'activo_visita',
        'departamento_id'
    ];
    public function departamento(){
        return $this->belongsTo(departamento::class);
    }
}
