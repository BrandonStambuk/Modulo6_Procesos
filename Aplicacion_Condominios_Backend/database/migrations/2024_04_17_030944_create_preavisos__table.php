<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePreavisosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('preavisos', function (Blueprint $table) {
            $table->id();
        $table->unsignedBigInteger('departamento_id'); 
        $table->foreign('departamento_id')->references('id')->on('departamentos')->onDelete('cascade');
        $table->text('propietario_pagar');
        $table->date('fecha'); 
        $table->text('descripcion_servicios'); 
        $table->text('servicio_pagar'); 
        $table->decimal('monto', 10, 2);
        $table->unsignedBigInteger('id_propietarioPagar'); // Cambiado a unsignedBigInteger
        $table->foreign('id_propietarioPagar')->references('id')->on('residentes')->onDelete('cascade'); // Definición de clave foránea
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('preavisos');
    }
}
