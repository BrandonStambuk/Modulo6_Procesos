<?php

namespace App\Models\Cobro_Servicios;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Cobro_Servicios\PreAvisoModel;

use App\Models\GestDepartamento\Residente;

class ExpensaModel extends Model
{
    use HasFactory;
    protected $table = 'expensas';

    protected $fillable = [
        'preaviso_id',
        'propietario_pagar',
        'fecha',
        'descripcion_servicios',
        'servicio_pagar',
        'monto',
        'pagado',
        'id_propietarioPagar'
    ];

    public function departamento()
    {
        return $this->belongsTo(PreAvisoModel::class, 'preaviso_id');
    }

    // Define la relación con el modelo Residente
    public function residentePagar()
    {
        return $this->belongsTo(Residente::class, 'id_propietarioPagar');
    }
}