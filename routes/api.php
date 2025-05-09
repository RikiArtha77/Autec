<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SensorDataController;
use App\Http\Controllers\ControlController;

Route::post('/sensor', [SensorDataController::class, 'store']);
Route::get('/sensor', [SensorDataController::class, 'index']);

Route::post('/control', [ControlController::class, 'sendCommand']);
