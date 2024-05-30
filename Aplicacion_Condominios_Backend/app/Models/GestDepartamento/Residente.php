<?php

namespace App\Models\GestDepartamento;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Residente extends Model
{
    use HasFactory;
    protected $fillable = [
        'nombre_residente',
        'apellidos_residente',
        'cedula_residente',
        'telefono_residente',
        'fecha_nacimiento_residente',
        'tipo_residente',
        'nacionalidad_residente',
        'email_residente',
        'genero_residente',
        'estado_residente',
        'imagen_residente',
        'contrato_id',
        'monto_pagar'
    ];
    public function contrato(){
        return $this->belongsTo(Contrato::class);
    }
}
