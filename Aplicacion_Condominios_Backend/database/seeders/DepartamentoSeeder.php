<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\GestDepartamento\departamento;
class DepartamentoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Departamento::factory()->withoutTimestamps()->count(5)->create();
    }
}
