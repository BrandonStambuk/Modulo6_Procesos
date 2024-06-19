<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\GestDepartamento\edificio;
use App\Models\GestDepartamento\departamento;
use Faker\Factory;
class EdificioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        edificio::factory()->withoutTimestamps()->count(2)->create();
        //crear departamentos para estos edificios
        $factoria = new Factory();
        $faker = $factoria::create();
        $listaImagenes = ['departamento/images/departamentos/departamento_pred.jpeg','departamento/images/departamentos/departamento (1).jpg','departamento/images/departamentos/departamento (2).jpg','departamento/images/departamentos/departamento (3).jpg','departamento/images/departamentos/departamento (4).jpg','departamento/images/departamentos/departamento (5).jpg','departamento/images/departamentos/departamento (6).jpg','departamento/images/departamentos/departamento (7).jpg','departamento/images/departamentos/departamento (8).jpg'];
        // crear 3 departamentos para cada edificio
        $edif = new edificio();
        $edificios = $edif::all();
        foreach($edificios as $edificio){
            for($i=0; $i<3; $i++){
                $obtenerImagen = $faker->randomElement($listaImagenes);
                $imagePath = $obtenerImagen;
                $nombreDepa = $faker->word;
                $nombreDepa = 'Dep '.$nombreDepa.' '.$faker->numberBetween(1,100);
                $nombreDepa = $nombreDepa.$faker->randomElement(range('A', 'Z'));
                $departamento = [
                    'nombre_departamento' => $nombreDepa,
                    'numero_habitaciones' => $faker->numberBetween(1,5),
                    'numero_personas'  => $faker->numberBetween(1,7),
                    'superficie' => $faker->numberBetween(100, 999),
                    'disponibilidad' => true,
                    'amoblado' => $faker->boolean(),
                    'ofertado_venta' => $faker->boolean(),
                    'ofertado_alquiler' => $faker->boolean(),
                    'ofertado_anticretico' => $faker->boolean(),
                    'descripcion_departamento' => $faker->sentence(),
                    'piso' => $faker->numberBetween(1,10),
                    'imagen_departamento' => $imagePath,
                    'edificio_id' => $edificio->id
                ];
                departamento::create($departamento);
            }
        }
    }
}
