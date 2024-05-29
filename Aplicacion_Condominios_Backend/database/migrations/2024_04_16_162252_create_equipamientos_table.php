<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEquipamientosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('equipamientos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('categoria');
            $table->text('descripcion')->nullable();
            $table->decimal('costo', 10, 2); // Cambiado a decimal para manejar decimales
            $table->unsignedBigInteger('area_comun_id'); // Agregado campo para la relación con áreas comunes
            $table->unsignedBigInteger('categoria_id')->nullable(); // Agregado campo para la relación con categorías de servicios
            $table->unsignedBigInteger('residente_id')->nullable(); // Agregado campo para la relación con residentes
            $table->string('area_comun_nombre'); // Agregado campo para el nombre del área común
            $table->foreign('area_comun_id')->references('id_common_area')->on('common_areas')->onDelete('cascade'); // Definición de la clave foránea
            $table->foreign('categoria_id')->references('id')->on('categoria_servicios')->onDelete('cascade'); // Definición de la clave foránea
            $table->foreign('residente_id')->references('id')->on('residentes')->onDelete('cascade'); // Definición de la clave foránea
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
        Schema::dropIfExists('equipamientos');
    }
}