<?php

namespace Database\Seeders;

use App\Models\Mantenimiento\Insumo;
use Illuminate\Database\Seeder;

class InsumoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Insumo::create([
            'idSolicitud' => '2', 
            'nombreInsumo' => 'Brochas', 
            'precioInsumo' => '15.00'  
        ]);
        Insumo::create([
            'idSolicitud' => '2', 
            'nombreInsumo' => 'Pintura Negra', 
            'precioInsumo' => '65.20'  
        ]);
        Insumo::create([
            'idSolicitud' => '2', 
            'nombreInsumo' => 'Lija', 
            'precioInsumo' => '5.50'  
        ]);
        Insumo::create([
            'idSolicitud' => '3', 
            'nombreInsumo' => 'Aceite Podadora', 
            // 'precioInsumo' => '20.00'  
        ]);
        Insumo::create([
            'idSolicitud' => '3', 
            'nombreInsumo' => 'Cuchillas', 
            // 'precioInsumo' => '70.20'  
        ]);
        Insumo::create([
            'idSolicitud' => '1', 
            'nombreInsumo' => 'Focos', 
            // 'precioInsumo' => '45.20'  
        ]);
        Insumo::create([
            'idSolicitud' => '1', 
            'nombreInsumo' => 'Cinta Aislante', 
            // 'precioInsumo' => '5.00'  
        ]);
    }
}
