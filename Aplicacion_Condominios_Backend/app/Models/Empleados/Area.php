<?php

namespace App\Models\Empleados;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Empleados\Position;
use App\Models\Empleados\Contract;

class Area extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'descripcion',
    ];

    protected $with = ['positions'];

    public function positions(){

        return $this->hasMany(Position::class, 'area', 'id');

    }

}
