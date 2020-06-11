<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

use Validator;
use Hash;

class UserController extends Controller
{
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     *
     */
    public function update(Request $request)
    {
        // Permission
        $user = auth()->userOrFail();

        // Input validation
        $validator = Validator::make(request(['name', 'email']), [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users,email,'.$user->id,
        ]);
        
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Update the data
        $user->name = $request->name;
        $user->email = $request->email;

        // Special handle password
        if ($request->has('password') && $request->has('old_password')) {
            // Make sure old password correct
            if (!(Hash::check($request->old_password, auth()->user()->password))) {
                return response()->json([
                    'error' => 'Unauthorized.'
                ], 401);
            }

            $validator = Validator::make(request(['password']), [
                'password' => 'required|min:6',
            ]);
            
            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }

            $user->password = bcrypt($request->password);
        }

        $user->save();

        return response()->json([
            'message' => 'Updated sucessfully.'
        ]);
    }
}
