<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDisableReasonCommonAreasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('disable_reason_common_areas', function (Blueprint $table) {
            $table->id();
            $table->string("reason");
            $table->boolean("active");
            $table->timestamps();
            $table->unsignedBigInteger("id_common_area");

            $table->foreign('id_common_area')
                ->references('id_common_area')
                ->on('common_areas')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('disable_reason_common_areas');
    }
}
