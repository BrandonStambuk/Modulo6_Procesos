<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVisitasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('visitas', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_visita');
            $table->string('apellidos_visita');
            $table->string('cedula_visita');
            $table->string('telefono_visita');
            $table->boolean('activo_visita');
            $table->unsignedBigInteger('departamento_id')->nullable(); //todavia no se si va a ser nullable
            $table->foreign('departamento_id')->references('id')->on('departamentos')->onDelete('set null');
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
        Schema::dropIfExists('visitas');
    }
}
