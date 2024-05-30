<?php

namespace Database\Seeders;

use App\Models\Mantenimiento\RegistroSolicitud;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class RegistroSolicitudSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        RegistroSolicitud::create([//para Area comun - pendiente 
            'idCategoria'=> '1', 
            'idEstado'=> '1', 
            // 'idPersonalExterno'=> '',
            'descripcion'=> 'No hay electricidad en la cancha de futbol', 
            'nombrePropietario'=>'Arturo Diaz', 
            // 'ubicacion'=>'', 
            'numerReferencia'=>'77776644', 
            //'encargado'=>'', 
            'fechaSolicitud'=>Carbon::now()->toDateString(), 
            // 'fechaFinalizado'=>''    
        ]);
        RegistroSolicitud::create([//para Infraestructura - completo
            'idCategoria'=> '5', 
            'idEstado'=> '3', 
            // 'idPersonalExterno'=> '',
            'descripcion'=> 'Pintar el garaje de la entrada principal', 
            'nombrePropietario'=>'Ramiro Ortiz', 
            // 'ubicacion'=>'', 
            'numerReferencia'=>'77778888', 
            'encargado'=>'Luis López', 
            'fechaSolicitud'=>Carbon::now()->subDays(2)->toDateString(),
            'fechaFinalizado'=>Carbon::now()->subDay()->toDateString(),   
        ]);
        RegistroSolicitud::create([//para Otro - pendiente
            'idCategoria'=> '7', 
            'idEstado'=> '1', 
            // 'idPersonalExterno'=> '',
            'descripcion'=> 'Quitar yerva de las entradas', 
            'nombrePropietario'=>'Tomas Figueroa', 
            // 'ubicacion'=>'', 
            'numerReferencia'=>'78787878', 
            //'encargado'=>'', 
            'fechaSolicitud'=>Carbon::now()->toDateString(), 
            // 'fechaFinalizado'=>''    
        ]);
        RegistroSolicitud::create([//para Otro - proceso
            'idCategoria'=> '3', 
            'idEstado'=> '2', 
            // 'idPersonalExterno'=> '',
            'descripcion'=> 'Instalar Calefaccion en area de Seguridad', 
            'nombrePropietario'=>'Ruben Almaraz', 
            // 'ubicacion'=>'', 
            'numerReferencia'=>'78454478', 
            'encargado'=>'Ana Martínez', 
            'fechaSolicitud'=>Carbon::now()->subDay()->toDateString(),
            // 'fechaFinalizado'=>''    
        ]);
    }
}
