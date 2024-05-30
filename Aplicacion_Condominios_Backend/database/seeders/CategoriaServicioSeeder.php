<?php

namespace Database\Seeders;

use App\Models\Mantenimiento\CategoriaServicio;
use Illuminate\Database\Seeder;

class CategoriaServicioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        CategoriaServicio::create([
            'catnombre' => 'Electricidad',
            'catdescripcion' => 'Mantenimiento relacionado con instalaciones eléctricas, como reparaciones de cables, cambios de interruptores, y revisión de sistemas de iluminación.' 
        ]);
        CategoriaServicio::create([
            'catnombre' => 'Fontanería',
            'catdescripcion' => 'Incluye reparaciones y mantenimiento de tuberías, grifos, drenajes, y sistemas de agua caliente.' 
        ]);
        CategoriaServicio::create([
            'catnombre' => 'Climatización',
            'catdescripcion' => 'Mantenimiento de sistemas de calefacción, ventilación, aire acondicionado, y control de temperatura.' 
        ]);
        CategoriaServicio::create([
            'catnombre' => 'Carpintería',
            'catdescripcion' => 'Reparación y mantenimiento de puertas, ventanas, muebles de madera, y estructuras interiores.' 
        ]);
        CategoriaServicio::create([
            'catnombre' => 'Pintura',
            'catdescripcion' => 'Tareas de mantenimiento relacionadas con la pintura de paredes, techos, y exteriores de edificios.' 
        ]);
        CategoriaServicio::create([
            'catnombre' => 'Telecomunicaciones',
            'catdescripcion' => 'Incluye mantenimiento de sistemas de telefonía, redes de datos, internet, y dispositivos de comunicación.' 
        ]);
        CategoriaServicio::create([
            'catnombre' => 'Jardineria',
            'catdescripcion' => 'Mantenimiento'
        ]);
    }
}
