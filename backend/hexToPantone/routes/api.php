<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::get('/colordata', [\App\Http\Controllers\api\admin\indexController::class, 'index']);
Route::get('/colordata/{hexCode}', [\App\Http\Controllers\api\admin\indexController::class, 'show']);
Route::post('/create_color/{hexCode}', [\App\Http\Controllers\api\admin\indexController::class, 'store']);
Route::post('/update_color/{id}', [\App\Http\Controllers\api\admin\indexController::class, 'edit']);