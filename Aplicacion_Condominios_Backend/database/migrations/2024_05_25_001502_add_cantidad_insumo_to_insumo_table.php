<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCantidadInsumoToInsumoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('insumo', function (Blueprint $table) {
            $table->smallInteger('cantidadInsumo')->nullable()->after('precioInsumo');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('insumo', function (Blueprint $table) {
            $table->dropColumn('cantidadInsumo');
        });
    }
}
