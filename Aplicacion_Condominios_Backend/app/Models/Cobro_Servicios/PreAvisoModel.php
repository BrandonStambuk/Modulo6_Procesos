<?php

namespace App\Models\Cobro_Servicios;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\GestDepartamento\departamento;

class PreAvisoModel extends Model
{
    use HasFactory;
    protected $table = 'preavisos';

    protected $fillable = [
        'departamento_id',
        'propietario_pagar',
        'fecha',
        'descripcion_servicios',
        'servicio_pagar',
        'monto',
        'id_propietarioPagar'
    ];
    public function departamento()
    {
        return $this->belongsTo(departamento::class, 'departamento_id');
    }
    public function residentePagar()
    {
        return $this->belongsTo(Residente::class, 'id_propietarioPagar');
    }
    public function multas()
    {
        return $this->hasMany(MultasModel::class, 'preaviso_id', 'id');
    }
    
}
