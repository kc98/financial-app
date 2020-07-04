<?php

namespace App\Http\Controllers;

use App\Transaction;
use Illuminate\Http\Request;

use \Carbon\Carbon;
use Validator;
use App\Category;
use App\TransactionType;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $selectedMonth = $request->get('month') ?? Carbon::now()->month;
        $selectedYear = $request->get('year') ?? Carbon::now()->year;

        $user = auth()->userOrFail();

        $startOfMonth = Carbon::parse("first day of $selectedYear-$selectedMonth");
        // $endOfMonth = Carbon::parse("first day of $selectedYear-$selectedMonth")->addMonth();
        $endOfMonth = Carbon::parse("last day of $selectedYear-$selectedMonth")->endOfDay();

        $transactions = $user->transactions()->whereBetween('created_at', [$startOfMonth, $endOfMonth])->get();

        // Get previous amount
        $previousTransactions = $user->transactions()->where('created_at', '<', $startOfMonth)->get();
        $openingBalance = 0;

        foreach ($previousTransactions as $previousTransaction) {
            if ($previousTransaction->category()->first()
                ->transactionType()->first()->transaction_type == 'income') {
                $openingBalance += $previousTransaction->amount;
            } else {
                $openingBalance -= $previousTransaction->amount;
            }
        }

        $payload = [
            'transactions' => $transactions,
            'opening_balance' => $openingBalance,
        ];

        return response()->json($payload);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $date = request('date');
        request()->offsetSet('date', Carbon::parse($date));

        $validator = Validator::make(request(['description', 'amount', 'category', 'date']), [
            'description' => 'required|max:300',
            'amount' => 'required|regex:/^\d+(\.\d{1,2})?$/',
            'category' => 'required',
            'date' => 'date',
        ]);
        
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = auth()->userOrFail();
        $transaction = new Transaction();
        $transaction->description = $request->description;
        $transaction->amount = $request->amount;
        $transaction->created_at = $request->date;
        $transaction->updated_at = $request->date;
        $transaction->category()->associate(Category::find($request->category));

        $user->transactions()->save($transaction);
        
        return response()->json([
            'message' => 'Transaction recorded.',
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $transaction
     * @return \Illuminate\Http\Response
     */
    public function show(int $transaction)
    {
        $user = auth()->userOrFail();

        if (!$result = $user->transactions()->find($transaction)) {
            return response()->json([
                'error' => 'Transaction not found.'
            ], 404);
        }

        return response()->json($result);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $transaction
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, int $transaction)
    {
        $date = request('date');
        request()->offsetSet('date', Carbon::parse($date));
        
        $validator = Validator::make(request(['description', 'amount', 'category', 'date']), [
            'description' => 'required|max:300',
            'amount' => 'required|regex:/^\d+(\.\d{1,2})?$/',
            'category' => 'required',
            'date' => 'required',
        ]);
        
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = auth()->userOrFail();

        if (!$transaction = $user->transactions()->find($transaction)) {
            return response()->json([
                'error' => 'Transaction not found.'
            ], 404);
        }
        
        $transaction->description = $request->description;
        $transaction->amount = $request->amount;
        $transaction->created_at = $request->date;
        $transaction->updated_at = now();
        $transaction->category()->associate(Category::find($request->category));

        $transaction->save();
        
        return response()->json([
            'message' => 'Transaction updated.',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $transaction
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $transaction)
    {
        $user = auth()->userOrFail();

        if (!$user->transactions()->find($transaction)) {
            return response()->json([
                'error' => 'Transaction not found.'
            ], 404);
        }

        Transaction::find($transaction)->delete();

        return response()->json([
            'message' => 'Transaction is deleted',
        ]);
    }
}
