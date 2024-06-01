<?php

namespace App\Models\Empleados;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Empleados\Employee;

class Atraso extends Model{

    use HasFactory;
    
    protected $fillable = [
        'id_empleado',
        'hora_entrada',
        'tiempo_demora'
    ];

    public function empleado(){
        return $this->belongsTo(Employee::class,'id_empleado');
    }
}
