<?php

namespace Database\Seeders;

use App\Models\Chat;
use App\Models\Message;
use Illuminate\Database\Seeder;

class ChatSeeder extends Seeder
{
    public function run(): void
    {
        // Create a few sample chats
        $chat1 = Chat::create([
            'title' => 'My first conversation',
            'model_type' => 'gpt-4',
        ]);

        $chat1->messages()->createMany([
            [
                'content' => 'Hello, how does this work?',
                'role' => 'user',
            ],
            [
                'content' => 'Hi there! I\'m an AI assistant. You can ask me questions and I\'ll do my best to help.',
                'role' => 'assistant',
            ],
            [
                'content' => 'That sounds great! Can you tell me about Laravel?',
                'role' => 'user',
            ],
            [
                'content' => 'Laravel is a PHP web application framework with expressive, elegant syntax...',
                'role' => 'assistant',
            ],
        ]);

        $chat2 = Chat::create([
            'title' => 'Learning about React',
            'model_type' => 'gpt-3.5-turbo',
        ]);

        $chat2->messages()->createMany([
            [
                'content' => 'What is React?',
                'role' => 'user',
            ],
            [
                'content' => 'React is a JavaScript library for building user interfaces, particularly single-page applications...',
                'role' => 'assistant',
            ],
        ]);
    }
}
