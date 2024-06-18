<?php

namespace Database\Seeders;

use App\Models\GestDepartamento\Parqueo;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        //no es necesario crear un bloques se crean al crear departamentos
        //$this->call(BloqueSeeder::class);
        $this->call(BloqueSeeder::class);
        $this->call(EdificioSeeder::class);
        $this->call(DepartamentoSeeder::class);
        $this->call(ContratoSeeder::class);
        $this->call(ResidenteSeeder::class);
        $this->call(CommonAreaSeeder::class);
        $this->call(ParqueoSeeder::class);
        $this->call(VisitaSeeder::class);
    }
}
