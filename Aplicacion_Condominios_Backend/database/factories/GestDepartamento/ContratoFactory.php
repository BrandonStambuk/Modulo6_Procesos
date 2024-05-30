<?php

namespace Database\Factories\GestDepartamento;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\GestDepartamento\Departamento;
class ContratoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        //si quiero que la fecha fin sea mayor a la fecha inicio
        $fechaInicio = $this->faker->dateTimeBetween('-1 year', 'now');
        $fechaFin = $this->faker->dateTimeBetween($fechaInicio, '+1 year');
        $esVigente = true;
        return [
            //generar datos aleatorios
            'fecha_inicio_contrato' => $fechaInicio,
            'fecha_fin_contrato' => $fechaFin,
            'precio_contrato' => $this->faker->randomFloat(2, 1000, 10000),
            'tipo_contrato' => $this->faker->randomElement(['Alquiler', 'Anticretico','Venta']),
            'departamento_id' => function() use (&$esVigente){
                $departamento= Departamento::where('disponibilidad',true)->get()->first();
                $res = null;
                if($departamento){
                    $esVigente = false;
                    $departamento->disponibilidad = false;
                    $res=$departamento->id;
                    $departamento->save();
                }
                return $res;

            },
            'vigente_contrato' => $esVigente,
            
        ];
    }
}
