<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id('user_id');
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('dob_day')->nullable();
            $table->string('dob_month')->nullable();
            $table->string('dob_year')->nullable();
            $table->string('gender')->nullable();
            $table->boolean('show_gender')->nullable();
            $table->string('gender_interest')->nullable();
            $table->string('url')->nullable();
            $table->string('about')->nullable();
            $table->json('matches')->nullable();
            $table->string('email')->unique();
            $table->string('password');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};