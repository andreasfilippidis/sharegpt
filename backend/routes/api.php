<?php

use App\Http\Controllers\Api\ChatController;
use Illuminate\Support\Facades\Route;

Route::apiResource('chats', ChatController::class);
Route::post('chats/{chat}/messages', [ChatController::class, 'sendMessage']);

// Add a test route for debugging
Route::get('/test', function () {
    return response()->json(['message' => 'API is working!']);
});

Route::get('/chats', [ChatController::class, 'index']);


