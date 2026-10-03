<?php

namespace App\Http\Controllers\Web;

use App\Domain\User\Actions\AuthenticateUser;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('LoginView');
    }

    public function login(Request $request, AuthenticateUser $action): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        $action->execute($credentials);

        return redirect()->intended('/dashboard');
    }

    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
