<?php

namespace App\Models\Empleados;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Empleados\Employee;

class Ausencia extends Model{

    use HasFactory;

    protected $fillable = [
        'id_empleado',
        'fecha',
        'motivo'
    ];

    public function empleado(){
        return $this->belongsTo(Employee::class,'id_empleado');
    }
}