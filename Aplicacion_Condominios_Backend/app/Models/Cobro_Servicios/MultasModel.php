<?php

namespace App\Models\Cobro_Servicios;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Cobro_Servicios\ExpensaModel;

class MultasModel extends Model
{
    use HasFactory;
    protected $table = 'multas';

    protected $fillable = ['expensa_id', 'descripcion', 'monto', 'fecha'];

    public function expensa()
    {
        return $this->belongsTo(ExpensaModel::class, 'expensa_id');
    }
}
