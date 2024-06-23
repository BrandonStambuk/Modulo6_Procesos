<?php

namespace App\Models\Empleados;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Empleados\Area;

class Contract extends Model
{
    use HasFactory;
    protected $fillable = [
        'tipo_contrato',
        'fecha_inicio',
        'fecha_final',
        'area',
        'cargo',
        'beneficios',
        'salario',
        'empleado'
    ];
}
