<?php

namespace App\Models\Mantenimiento;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Insumo extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = "insumo";
    protected $primaryKey = "idInsumo";
    protected $fillable = [
        'idSolicitud', 
        'nombreInsumo', 
        'precioInsumo'
    ];
    
    public function solicitud() {
        return $this -> belongsTo(RegistroSolicitud::class, 'idSolicitud');
    }
    
    public function categoria() {
        return $this -> belongsTo(CategoriaServicio::class, 'idCategoria');
    }
}
