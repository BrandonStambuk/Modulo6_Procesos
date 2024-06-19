<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIdEstadoContratoToRegistroSolicitudTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('registro_solicitud', function (Blueprint $table) {
            $table->bigInteger('idEstadoContrato')->nullable()->after('idPersonalExterno');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('registro_solicitud', function (Blueprint $table) {
            $table->dropColumn('idEstadoContrato');
        });
    }
}
