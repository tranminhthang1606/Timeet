<?php

use App\Http\Controllers\MessageController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});




Route::middleware(['cors'])->group(function () {
    Route::get('user/{id}', [UserController::class, 'show']);
    Route::post('user/get-messages', [MessageController::class, 'getMessages']);
    Route::post('user/get-matched-list', [UserController::class, 'getMatchedList']);
    Route::post('user/addMessages', [MessageController::class, 'addMessages']);
    Route::post('signup', [UserController::class, 'create']);
    Route::post('login', [UserController::class, 'store']);
    Route::post('update/{id}', [UserController::class, 'update']);
    Route::get('interest-users/{gender}', [UserController::class, 'getGender']);
    Route::post('user/{id}/matches', [UserController::class, 'addMatchList']);

});