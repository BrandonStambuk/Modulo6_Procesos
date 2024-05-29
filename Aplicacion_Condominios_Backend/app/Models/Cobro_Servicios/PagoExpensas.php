<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PagoExpensas extends Model
{
    use HasFactory;
    protected $table = 'equipamientos';
    protected $fillable = ['residente_id'];
    public function pagosExpensas()
    {
        return $this->hasMany(PagoExpensas::class, 'residente_id', 'id');
    }
}
