<?php

namespace App\Models\Cobro_Servicios;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Cobro_Servicios\PreAvisoModel;

class MultasModel extends Model
{
    use HasFactory;
    protected $table = 'multas';

    protected $fillable = ['preaviso_id', 'descripcion', 'monto', 'fecha'];

    public function preaviso()
    {
        return $this->belongsTo(PreAvisoModel::class, 'preaviso_id');
    }
}
