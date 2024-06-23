<?php

namespace App\Models\Mantenimiento;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContratoPersonal extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = "contrato_personal";
    protected $primaryKey = "idContratoPersonal";
    protected $fillable = [
        'idSolicitud',
        'fechaInicio', 
        'salario'
    ];
    
    public function solicitud() {
        return $this -> belongsTo(RegistroSolicitud::class, 'idSolicitud');
    }
    
    public function categoria() {
        return $this -> belongsTo(CategoriaServicio::class, 'idCategoria');
    }
}
