<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SensorDataController;

Route::post('/sensor', [SensorDataController::class, 'store']);
Route::get('/sensor', [SensorDataController::class, 'index']);