<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('index');
});

Route::get('/{pathMatch}', function(){
    return view('welcome');
})->where('pathMatch',".*");
