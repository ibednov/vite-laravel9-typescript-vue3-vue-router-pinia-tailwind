<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategoriesController;
use App\Http\Controllers\API\IdeasController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(AuthController::class)->group(
    function () {
        Route::post('login', 'login');
        Route::post('register', 'register');
        Route::post('update', 'update');
        // Route::put('/user/{id}', 'updateUser');

        Route::get('logout', 'logout')->middleware('auth:sanctum');
    }
);

Route::group(['prefix' => 'ideas', 'middleware' => 'auth:sanctum'], function () {
    Route::get('/', [IdeasController::class, 'index']);
    Route::post('add', [IdeasController::class, 'add']);
    Route::get('edit/{id}', [IdeasController::class, 'edit']);
    Route::post('update/{id}', [IdeasController::class, 'update']);
    Route::delete('delete/{id}', [IdeasController::class, 'delete']);
});

Route::group(['prefix' => 'categories', 'middleware' => 'auth:sanctum'], function () {
    Route::get('/', [CategoriesController::class, 'index']);
    Route::post('add', [CategoriesController::class, 'add']);
    Route::get('edit/{id}', [CategoriesController::class, 'edit']);
    Route::post('update/{id}', [CategoriesController::class, 'update']);
    Route::delete('delete/{id}', [CategoriesController::class, 'delete']);
});
