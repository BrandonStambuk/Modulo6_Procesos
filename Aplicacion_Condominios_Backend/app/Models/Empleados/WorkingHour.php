<?php

namespace App\Models\Empleados;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Empleados\Employee;

class WorkingHour extends Model
{
    use HasFactory;
    protected $fillable = [
        'dia',
        'hora_entrada',
        'hora_salida',
        'empleado'
    ];

    public function empleado()
    {
        return $this->belongsTo(Employee::class, 'empleado');
    }
}
