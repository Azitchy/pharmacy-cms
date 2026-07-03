<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateAdminToken
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        if (! $token) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $user = User::query()
            ->where('is_admin', true)
            ->where('api_token_hash', hash('sha256', $token))
            ->where(function ($query): void {
                $query->whereNull('api_token_expires_at')
                    ->orWhere('api_token_expires_at', '>', now());
            })
            ->first();

        if (! $user) {
            return response()->json(['message' => 'Invalid or expired admin token.'], 401);
        }

        Auth::setUser($user);
        $request->setUserResolver(fn (): User => $user);

        return $next($request);
    }
}

