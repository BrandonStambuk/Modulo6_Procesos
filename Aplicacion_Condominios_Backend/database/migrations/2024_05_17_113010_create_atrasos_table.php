<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateAtrasosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('atrasos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_empleado');
            $table->date('fecha');
            $table->time('hora_entrada');
            $table->time('tiempo_demora');
            $table->text('motivo')->nullable();
            $table->timestamps();

            $table->foreign('id_empleado')->references('id')->on('employees')->onDelete('cascade');

        });

        DB::unprepared('
            CREATE TRIGGER set_fecha_default_atrasos
            BEFORE INSERT ON atrasos
            FOR EACH ROW
            BEGIN
                IF NEW.fecha IS NULL THEN
                    SET NEW.fecha = CURDATE();
                END IF;
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
        Schema::dropIfExists('atrasos');
    }
}