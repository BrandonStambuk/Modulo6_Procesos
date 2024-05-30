<?php

namespace App\Models\Notificaciones;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aviso extends Model
{
    use HasFactory;
    protected $table = 'avisos';
    protected $fillable = [ 
        'titulo',
        'descripcion'
    ];
}
