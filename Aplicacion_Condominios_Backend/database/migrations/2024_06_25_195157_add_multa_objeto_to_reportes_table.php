<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class AddMultaObjetoToReportesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('reportes', function (Blueprint $table) {
            $table->integer('multaObjeto')->nullable();
        });
        DB::unprepared('
            CREATE TRIGGER update_multaObjeto_before_insert BEFORE INSERT ON reportes
            FOR EACH ROW
            BEGIN
                SET NEW.multaObjeto = NEW.costo_reponer * NEW.cantidad_reponer;
            END
        ');

        DB::unprepared('
            CREATE TRIGGER update_multaObjeto_before_update BEFORE UPDATE ON reportes
            FOR EACH ROW
            BEGIN
                SET NEW.multaObjeto = NEW.costo_reponer * NEW.cantidad_reponer;
            END
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Eliminar el disparador antes de eliminar la columna
        DB::unprepared('DROP TRIGGER IF EXISTS update_multaObjeto_before_insert');
        DB::unprepared('DROP TRIGGER IF EXISTS update_multaObjeto_before_update');

        Schema::table('reportes', function (Blueprint $table) {
            $table->dropColumn('multaObjeto');
        });
    }
}