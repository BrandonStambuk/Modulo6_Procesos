<?php

namespace App\Models\Empleados;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Empleados\Contract;
use App\Models\Empleados\WorkingHour;
use App\Models\Empleados\Atraso;
use App\Models\Empleados\Ausencia;
use App\Models\Empleados\ContractAlt;

class Employee extends Model
{
    use HasFactory;
    protected $fillable = [
        'nombre',
        'apellido',
        'correo',
        'celular',
        'genero',
        'estado_contrato',
        'ci'
    ];

    protected $with = ['contracts', 'working_hours','atrasos', 'ausencias', 'contracts_alt'];

    public function contracts(){

        return $this->hasMany(Contract::class, 'empleado', 'id');

    }

    public function contracts_alt(){

        return $this->hasMany(ContractAlt::class, 'empleado', 'id');

    }

    public function working_hours(){

        return $this->hasMany(WorkingHour::class, 'empleado', 'id');

    }

    public function asistencias(){
        return $this->hasMany(Asistencia::class, 'id_empleado', 'id');
    }

    public function atrasos(){
        return $this->hasMany(Atraso::class, 'id_empleado', 'id');
    }

    public function ausencias(){
        return $this->hasMany(Ausencia::class, 'id_empleado','id');
    }
}
