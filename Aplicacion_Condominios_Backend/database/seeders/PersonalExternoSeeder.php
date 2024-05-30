<?php

namespace Database\Seeders;

use App\Models\Mantenimiento\PersonalExterno;
use Illuminate\Database\Seeder;

class PersonalExternoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        PersonalExterno::create([
            'nombre'=>'Mario García',
            'telefono' =>'74522367',
            'direccion' =>'Av. Pando',
            'idCategoria' =>'1'    
        ]);
        PersonalExterno::create([
            'nombre'=>'Juan Rodríguez',
            'telefono' =>'71234567',
            'direccion' =>'Av. Simon Lopez',
            'idCategoria' =>'2'    
        ]);
        PersonalExterno::create([
            'nombre'=>'Ana Martínez',
            'telefono' =>'78901234',
            'direccion' =>'Av. Circunvalacion',
            'idCategoria' =>'3'    
        ]);
        PersonalExterno::create([
            'nombre'=>'Fernando F.S.',
            'telefono' =>'76541111',
            'direccion' =>'Av. Ramon Rivero',
            'idCategoria' =>'4'    
        ]);
        PersonalExterno::create([
            'nombre'=>'Luis López',
            'telefono' =>'76543210',
            'direccion' =>'Av. España',
            'idCategoria' =>'5'    
        ]);
        PersonalExterno::create([
            'nombre'=>'Marcelo Llanos',
            'telefono' =>'77334578',
            'direccion' =>'Av. Illinois',
            'idCategoria' =>'6'    
        ]);
        PersonalExterno::create([
            'nombre'=>'Adrian Fuentes',
            'telefono' =>'76546616',
            'direccion' =>'Av. Imnominada',
            'idCategoria' =>'7'    
        ]);
    }
}
