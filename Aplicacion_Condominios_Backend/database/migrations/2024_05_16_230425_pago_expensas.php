<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PagoExpensas extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Pago_Expensas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('residente_id'); 
            $table->unsignedBigInteger('montoPagar');
            $table->foreign('residente_id')->references('id')->on('residentes')->onDelete('cascade');
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
        //
    }
}
