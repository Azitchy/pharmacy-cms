<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AdminAuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = $request->user() ?: \App\Models\User::query()
            ->where('email', $credentials['email'])
            ->where('is_admin', true)
            ->first();

        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            return response()->json([
                'message' => 'Invalid admin credentials.',
            ], 422);
        }

        $plainToken = Str::random(64);
        $user->forceFill([
            'api_token_hash' => hash('sha256', $plainToken),
            'api_token_expires_at' => now()->addDays(7),
        ])->save();

        return response()->json([
            'token_type' => 'Bearer',
            'token' => $plainToken,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'is_admin' => true,
            ],
            'expires_at' => $user->api_token_expires_at?->toIso8601String(),
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        $user = $request->user();

        return response()->json([
            'user' => [
                'id' => $user?->id,
                'name' => $user?->name,
                'email' => $user?->email,
                'is_admin' => (bool) ($user?->is_admin ?? false),
            ],
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user) {
            $user->forceFill([
                'api_token_hash' => null,
                'api_token_expires_at' => null,
            ])->save();
        }

        return response()->json([
            'message' => 'Logged out successfully.',
        ]);
    }
}

