<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReportesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('reportes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_residente'); // Cambiamos a unsignedBigInteger para que coincida con el tipo de dato de id en users
            $table->foreign('id_residente')->references('id')->on('residentes');
            $table->unsignedBigInteger('id_common_area');
            $table->foreign('id_common_area')->references('id_common_area')->on('common_areas');
            $table->unsignedBigInteger('id_equipment');
            $table->foreign('id_equipment')->references('id')->on('equipamientos');
            $table->integer('costo_reponer');
            $table->integer('cantidad_reponer');
            $table->string('situacion');
            $table->string('info');
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
        Schema::dropIfExists('reportes');
    }
}
