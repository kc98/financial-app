<?php

namespace App\Http\Controllers;

use App\Transaction;
use Illuminate\Http\Request;

use \Carbon\Carbon;
use Validator;
use App\Category;

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
        $endOfMonth = Carbon::parse("last day of $selectedYear-$selectedMonth");

        $transactions = $user->transactions()->whereBetween('created_at', [$startOfMonth, $endOfMonth])->get();

        return response()->json($transactions);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
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
     * @param  \App\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function show(Transaction $transaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Transaction $transaction)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function destroy(Transaction $transaction)
    {
        //
    }
}
