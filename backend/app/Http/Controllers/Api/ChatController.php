<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Chat;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ChatController extends Controller
{
    public function index(): JsonResponse
    {
        $chats = Chat::with('messages')->get();

        return response()->json($chats);
    }

    public function show(Chat $chat): JsonResponse
    {
        $chat->load('messages');

        return response()->json($chat);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'model_type' => 'sometimes|string|max:50',
            'message' => 'required|string',
        ]);

        $chat = Chat::create([
            'title' => $validated['title'],
            'model_type' => $validated['model_type'] ?? 'gpt-4',
        ]);

        // Create the first message
        $chat->messages()->create([
            'content' => $validated['message'],
            'role' => 'user',
        ]);

        // Here you would typically call an AI service to get a response
        // For demo purposes, we'll just create a simple assistant response
        $chat->messages()->create([
            'content' => 'Hello! How can I assist you today?',
            'role' => 'assistant',
        ]);

        return response()->json($chat->load('messages'), 201);
    }

    public function update(Request $request, Chat $chat): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'model_type' => 'sometimes|string|max:50',
        ]);

        $chat->update($validated);

        return response()->json($chat);
    }

    public function destroy(Chat $chat): JsonResponse
    {
        $chat->delete();

        return response()->json(null, 204);
    }

    public function sendMessage(Request $request, Chat $chat): JsonResponse
    {
        $validated = $request->validate([
            'message' => 'required|string',
        ]);

        // Save user message
        $message = $chat->messages()->create([
            'content' => $validated['message'],
            'role' => 'user',
        ]);

        // Here you would typically call an AI service to get a response
        // For demo purposes, we'll just create a simple response
        $response = $chat->messages()->create([
            'content' => 'Thank you for your message. This is a simulated response.',
            'role' => 'assistant',
        ]);

        return response()->json([
            'user_message' => $message,
            'assistant_response' => $response
        ]);
    }
}
