<?php

namespace Database\Factories\GestDepartamento;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\GestDepartamento\departamento;
class VisitaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nombre_visita' => $this->faker->name,
            'apellidos_visita' => $this->faker->lastName,
            'cedula_visita' => $this->faker->unique()->randomNumber(8),
            'telefono_visita' => $this->faker->phoneNumber,
            'activo_visita' => $this->faker->boolean,
            'departamento_id' => departamento::all()->random()->id
        ];
    }
}
