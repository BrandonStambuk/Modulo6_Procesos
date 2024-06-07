<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateParqueosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('parqueos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_parqueo');
            $table->string('direccion_parqueo');
            $table->foreignId('departamento_id')->constrained('departamentos');
            $table->timestamps(); // No se necesita
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('parqueos');
    }
}
