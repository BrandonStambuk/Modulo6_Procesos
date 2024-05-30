<?php

namespace App\Models\GestDepartamento;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Parqueo extends Model
{
    use HasFactory;
    //public $timestamps = false;
    protected $fillable = [
        'nombre_parqueo',
        'direccion_parqueo',
        'departamento_id'
    ];
    public function departamento()
    {
        return $this->belongsTo(departamento::class);
    }
}
