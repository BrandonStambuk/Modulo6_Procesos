<?php

namespace Database\Seeders;

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

        //No borrar el orden de los seeders, Areas Comunes lo necesita.🤬
        $this->call(BloqueSeeder::class);
        $this->call(EdificioSeeder::class);
        $this->call(DepartamentoSeeder::class);
        $this->call(ContratoSeeder::class);
        $this->call(ResidenteSeeder::class);
        $this->call(CommonAreaSeeder::class);
    }
}