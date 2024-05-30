<?php

namespace Database\Seeders;

use App\Models\Mantenimiento\Estado;
use Illuminate\Database\Seeder;

class EstadoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Estado::create([
            'nombreEstado' => 'Pendiente',
        ]);
        Estado::create([
            'nombreEstado' => 'Proceso',
        ]);
        Estado::create([
            'nombreEstado' => 'Completado',
        ]);
    }
}
