<?php

use App\Http\Controllers\Api\AdminAuthController;
use App\Http\Controllers\Api\SectionController;
use Illuminate\Support\Facades\Route;

Route::get('/site-content', [SectionController::class, 'publicIndex']);
Route::get('/site-content/{siteSection:key}', [SectionController::class, 'publicShow']);

Route::prefix('admin')->group(function (): void {
    Route::post('/login', [AdminAuthController::class, 'login']);
    Route::middleware('admin.token')->group(function (): void {
        Route::get('/me', [AdminAuthController::class, 'me']);
        Route::post('/logout', [AdminAuthController::class, 'logout']);

        Route::get('/sections', [SectionController::class, 'index']);
        Route::post('/sections', [SectionController::class, 'store']);
        Route::get('/sections/{siteSection}', [SectionController::class, 'show']);
        Route::put('/sections/{siteSection}', [SectionController::class, 'update']);
        Route::delete('/sections/{siteSection}', [SectionController::class, 'destroy']);
    });
});

