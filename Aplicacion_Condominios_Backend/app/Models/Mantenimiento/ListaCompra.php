<?php

namespace App\Models\Mantenimiento;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ListaCompra extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = "lista_compra";
    protected $primaryKey = "idListaCompra";
    protected $fillable = [
        'idSolicitud', 
        'totalCompra', 
        'fechaCompra'
    ];
    
    public function solicitud() {
        return $this -> belongsTo(RegistroSolicitud::class, 'idSolicitud');
    }
    
    public function categoria() {
        return $this -> belongsTo(CategoriaServicio::class, 'idCategoria');
    }
}
