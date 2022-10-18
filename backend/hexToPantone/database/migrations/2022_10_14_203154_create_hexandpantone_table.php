<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hexandpantone', function (Blueprint $table) {
            $table->id();
            $table->string('color_name');
            $table->string('hex');
            $table->integer('red');
            $table->integer('green');
            $table->integer('blue');
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
        Schema::dropIfExists('hexandpantone');
    }
};
