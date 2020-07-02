<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;

use App\User;
use App\Transaction;

class InsightController extends Controller
{
    public function show(Request $request)
    {
        return response()->json([
            'message' => 'To be implemented'
        ], 404);
    }

    public function showBudget(Request $request)
    {
        $user = auth()->userOrFail();

        return response()->json([
            'budget' => $user->budget,
        ]);
    }

    public function updateBudget(Request $request)
    {
        $validator = Validator::make(request(['budget']), [
            'budget' => 'required|regex:/^\d+(\.\d{1,2})?$/',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = auth()->userOrFail();

        $user->budget = $request->budget;
        $user->save();

        return response()->json([
            'message' => 'Updated successfully.',
        ]);
    }
}
