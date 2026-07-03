<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table): void {
            $table->boolean('is_admin')->default(false)->after('password');
            $table->string('api_token_hash', 64)->nullable()->after('is_admin');
            $table->timestamp('api_token_expires_at')->nullable()->after('api_token_hash');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table): void {
            $table->dropColumn(['is_admin', 'api_token_hash', 'api_token_expires_at']);
        });
    }
};

