<?php

namespace App\Models\Mantenimiento;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EstadoContrato extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = "estado_contrato";
    protected $primaryKey = "idEstadoContrato";
    protected $fillable = ['nombreEstadoContrato'];
}
