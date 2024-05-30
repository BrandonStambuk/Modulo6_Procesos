<?php

namespace Database\Factories\GestDepartamento;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\GestDepartamento\edificio;
class DepartamentoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        // Define el nuevo camino donde se almacenarán las imágenes
        $directory = public_path('departamento/images/departamentos');
        $ruta = 'departamento/images/departamentos';
        // Asegurarse de que el directorio existe, si no, crearlo
        if (!\File::isDirectory($directory)) {
            \File::makeDirectory($directory, 0755, true, true);
        }
        // Generar la imagen y obtener el nombre del archivo
        $imageName = $this->faker->image($directory, 512, 512, null, false);
        
        // Concatenar el path al nombre del archivo para almacenar en la base de datos
        $imagePath = $imageName ? $ruta . '/' . $imageName : 'departamento/images/departamentos/departamento_pred.jpeg';
        $nombreDepa = $this->faker->word;
        //quiero agregar la palabra departamento al nombre del departamento
        $nombreDepa = 'Dep '.$nombreDepa;
        //quiero agregar un numero a en nombre del departamento
        $nombreDepa = $nombreDepa.' '.$this->faker->numberBetween(1,100);
        //quiero agregar una letra de la A a la Z al nombre del departamento en mayuscula
        $nombreDepa = $nombreDepa.$this->faker->randomElement(range('A', 'Z'));
        

        return [
            //
            'nombre_departamento' => $nombreDepa,
            'numero_habitaciones' => $this->faker->numberBetween(1,5),
            'numero_personas'  => $this->faker->numberBetween(1,7),
            'superficie' => $this->faker->numberBetween(100, 999),
            'disponibilidad' => true,
            'amoblado' => $this->faker->boolean(),
            'ofertado_venta' => $this->faker->boolean(),
            'ofertado_alquiler' => $this->faker->boolean(),
            'ofertado_anticretico' => $this->faker->boolean(),
            'descripcion_departamento' => $this->faker->sentence(),
            'piso' => $this->faker->numberBetween(1,10),
            'imagen_departamento' => $imagePath,
            'edificio_id' => edificio::factory()->create()->id
        ];
    }
    public function withoutTimestamps(){
        return $this->state(function (array $attributes){
            return [];
        });
    }
}
