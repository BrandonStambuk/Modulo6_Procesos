<?php

namespace Database\Factories\GestDepartamento;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\GestDepartamento\Bloque;
class EdificioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    //protected $model = edificio::class;
    public function definition()
    {
        $directory = public_path('departamento/images/edificios');
        $ruta = 'departamento/images/edificios';
        // Define el nuevo camino donde se almacenarán las imágenes
        if (!\File::isDirectory($directory)) {
            \File::makeDirectory($directory, 0755, true, true);
        }
        $imageName = null; //$this->faker->image($directory, 500, 512, null, false);
        $listaImagenes = ['departamento/images/edificios/edificio_default.jpg', 'departamento/images/edificios/edificio (1).jpg', 'departamento/images/edificios/edificio (2).jpg', 'departamento/images/edificios/edificio (3).jpg', 'departamento/images/edificios/edificio (4).jpg', 'departamento/images/edificios/edificio (5).jpg', 'departamento/images/edificios/edificio (6).jpg'];
        $obtenerImagen = $this->faker->randomElement($listaImagenes);
        $imagePath = $imageName ? $ruta . '/' . $imageName : $obtenerImagen;
        return [
            //
            'nombre_edificio' => $this->faker->name,
            'descripcion_edificio' => $this->faker->text(200),
            'imagen_edificio' => $imagePath,
            'cantidad_pisos' => $this->faker->numberBetween(1, 10),
            'bloque_id' => Bloque::factory()->create()->id
        ];
    }
    public function withoutTimestamps()
    {
        return $this->state(function (array $attributes) {
            return [];
        });
    }
}
