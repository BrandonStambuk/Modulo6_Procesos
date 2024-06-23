<?php

namespace Database\Factories\GestDepartamento;

use Illuminate\Database\Eloquent\Factories\Factory;

class BloqueFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    //protected $model = Bloque::class;
    public function definition()
    {
        $directory = public_path('departamento/images/bloques');
        $ruta = 'departamento/images/bloques';
        if (!\File::isDirectory($directory)) {
            \File::makeDirectory($directory, 0755, true, true);
        }
        $listaImagenes = ['departamento/images/bloques/bloque (1).jpg', 'departamento/images/bloques/bloque (2).jpg', 'departamento/images/bloques/bloque (3).jpg', 'departamento/images/bloques/bloque (4).jpg', 'departamento/images/bloques/bloque (5).jpg', 'departamento/images/bloques/bloque (6).jpg', 'departamento/images/bloques/bloque (7).jpg', 'departamento/images/bloques/bloque (8).jpg', 'departamento/images/bloques/bloque_defecto.jpg'];
        $imageName = null;
        $obtenerImagen = $this->faker->randomElement($listaImagenes);
        $imagePath = $imageName ? $ruta . '/' . $imageName : $obtenerImagen;
        $nombres = ['Bloque A', 'Bloque B', 'Bloque C', 'Bloque D', 'Bloque E', 'Bloque F', 'Bloque G', 'Bloque H', 'Bloque I', 'Bloque J', 'Bloque K', 'Bloque L', 'Bloque M', 'Bloque N', 'Bloque O', 'Bloque P', 'Bloque Q', 'Bloque R', 'Bloque S', 'Bloque T', 'Bloque U', 'Bloque V', 'Bloque W', 'Bloque X', 'Bloque Y', 'Bloque Z'];
        $nombre = $this->faker->randomElement($nombres).$this->faker->numberBetween(1, 100);
        return [
            //
            'nombre_bloque' => $nombre,
            'direccion_bloque' => $this->faker->address,
            'descripcion_bloque' => $this->faker->text(200),
            'imagen_bloque' => $imagePath,
        ];
    }

    public function withoutTimestamps()
    {
        return $this->state(function (array $attributes) {
            return [];
        });
    }
}
