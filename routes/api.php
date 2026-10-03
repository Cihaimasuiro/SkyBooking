<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return clone $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
    Route::apiResource('users', \App\Http\Controllers\API\V1\User\UserController::class)
        ->only(['index', 'store']);
});

