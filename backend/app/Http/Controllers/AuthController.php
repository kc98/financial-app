<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;

use App\User;

class AuthController extends Controller
{
    // login and logout -> POST
    // me -> GET
    public function login()
    {
        $credentials = request(['email', 'password']);
        if (!$token = auth()->attempt($credentials)) {
            return response()->json([
                'error' => 'Email/password is invalid.'
            ], 401);
        }

        return response()->json([
            'token' => $token
        ]);
    }

    public function signup()
    {
        $validator = Validator::make(request(['name', 'email', 'password']), [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6',
        ]);
        
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = new User();
        $user->name = request()->name;
        $user->email = request()->email;
        $user->password = bcrypt(request()->password);
        $user->save();

        $credentials = request(['email', 'password']);
        $token = auth()->attempt($credentials);

        return response()->json([
            'token' => $token
        ], 201);
    }

    public function me()
    {
        return response()->json(auth()->user());
    }
}
