<?php

namespace App\Models\Mantenimiento;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegistroSolicitud extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = "registro_solicitud";
    protected $primaryKey = "idRegistroSolicitud";
    protected $fillable = [
        'idCategoria', 
        'idEstado', 
        'idPersonalExterno',
        'descripcion', 
        'nombrePropietario', 
        'ubicacion', 
        'numerReferencia', 
        'encargado', 
        'fechaSolicitud', 
        'fechaFinalizado'
    ];
    
    public function categoria() {
        return $this -> belongsTo(CategoriaServicio::class, 'idCategoria');
    }
    
    public function estado() {
        return $this -> belongsTo(Estado::class, 'idEstado');
    }
}
