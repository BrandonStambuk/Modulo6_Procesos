<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateListaCompraTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lista_compra', function (Blueprint $table) {
            $table->id('idListaCompra');
            $table->bigInteger('idSolicitud');
            $table->double('totalCompra', 8, 2)->nullable();
            $table->date('fechaCompra')->nullable();
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
        Schema::dropIfExists('lista_compra');
    }
}
