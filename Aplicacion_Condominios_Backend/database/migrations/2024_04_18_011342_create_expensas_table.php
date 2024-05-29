<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExpensasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
{
    Schema::create('expensas', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('preaviso_id'); 
        $table->foreign('preaviso_id')->references('id')->on('preavisos')->onDelete('cascade');
        $table->text('propietario_pagar');
        $table->date('fecha'); 
        $table->text('descripcion_servicios'); 
        $table->text('servicio_pagar'); 
        $table->decimal('monto', 10, 2);
        $table->boolean('pagado')->nullable();
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
        Schema::dropIfExists('expensas');
    }
}
