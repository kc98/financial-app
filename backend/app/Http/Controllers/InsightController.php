<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Validator;

use App\User;
use App\Transaction;

class InsightController extends Controller
{
    public function show(Request $request)
    {
        /**
         * One week saving plan to suggest (Only expenses)
         * from database de timestamp -> past 12 weeks
         * - separete days of week (Mon to Sun) -> 12 days de monday, 12 days transaction tuesday, ..., 12 days transactions sunday
         * - separate to morning (12:00am - 11:59am), afternoon(12pm to 5:59pm), night (6pm - 11.59pm)
         * take all transaction from the past 12 weeks  (around 3 months) following time (morning, afternoon and night)
         *  -> Output: Monday (morning, afternoon and night), tues (morning, afternoon, night), ..., sunday
         *
         * Data: Monday (morning, afternoon and night), tues (morning, afternoon, night), ..., sunday
         * monday (morning)
         */
        $user = auth()->user();

        $currentDayIso = Carbon::now()->addHours(8)->dayOfWeekIso;

        $firstDay = Carbon::now()->addHours(8)->startOfDay()->subWeeks(12);
        $lastDay = Carbon::now()->addHours(8)->endOfDay()->subDays(8);
        
        $transactions = $user->transactions()->whereBetween('created_at', [$firstDay, $lastDay])->get()->filter(function ($model) {
            return $model->type == 'expense';
        });

        // Process data into format
        $dailyTransactions = [[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]]];
        $totalAmount = 0;
        foreach ($transactions as $transaction) {
            // Account all expense into total
            $totalAmount += $transaction['amount'];

            // Separate data into time periods
            $transactionTime = Carbon::parse($transaction->timestamp);
            $morningPeriodEnd = Carbon::create($transactionTime->year, $transactionTime->month, $transactionTime->day, 11, 59, 59);
            $afternoonPeriodEnd = Carbon::create($transactionTime->year, $transactionTime->month, $transactionTime->day, 17, 59, 59);
            $dayIso = $transactionTime->dayOfWeekIso;

            if ($transactionTime->lessThanOrEqualTo($morningPeriodEnd)) {
                array_push($dailyTransactions[$dayIso - 1][0], $transaction);
            } elseif ($transactionTime->lessThanOrEqualTo($afternoonPeriodEnd)) {
                array_push($dailyTransactions[$dayIso - 1][1], $transaction);
            } else {
                array_push($dailyTransactions[$dayIso - 1][2], $transaction);
            }
        }

        $payload = [];
        $days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        foreach ($dailyTransactions as $key => $dailyTransaction) {
            $dailyPayload = [];
            $dailyPayload['day'] = $days[$key];
            $dailyPayload['period'] = [];

            foreach ($dailyTransaction as $key => $periodTransaction) {
                $periodPayload = [];
                if ($key == 0) {
                    $periodPayload['name'] = 'morning';
                } elseif ($key == 1) {
                    $periodPayload['name'] = 'afternoon';
                } elseif ($key == 2) {
                    $periodPayload['name'] = 'night';
                }

                $periodPayload['categories'] = [];

                usort($periodTransaction, function ($a, $b) {
                    return strcmp($a['category'], $b['category']);
                });


                $currentCategory = null;
                $categoryPayload = [];
                foreach ($periodTransaction as $transaction) {
                    if ($transaction['category'] != $currentCategory) {
                        // Finalize and push previous category data into array if not null
                        if ($currentCategory != null) {
                            $categoryPayload['average'] = $categoryPayload['amount'] / 12;
                            $categoryPayload['budget'] = ($categoryPayload['amount'] / $totalAmount) * ($user->budget / 4);
                            array_push($periodPayload['categories'], $categoryPayload);
                        }
                        
                        // Reset and reinitialize the payload with new category
                        $categoryPayload = [];
                        $categoryPayload['name'] = $transaction['category'];
                        $categoryPayload['amount'] = $transaction['amount'];
                        $currentCategory = $transaction['category'];
                    } else {
                        $categoryPayload['amount'] += $transaction['amount'];
                    }
                }

                if ($currentCategory != null) {
                    $categoryPayload['average'] = $categoryPayload['amount'] / 12;
                    $categoryPayload['budget'] = ($categoryPayload['amount'] / $totalAmount) * ($user->budget / 4);

                    array_push($periodPayload['categories'], $categoryPayload);
                }
                

                array_push($dailyPayload['period'], $periodPayload);
            }

            array_push($payload, $dailyPayload);
        }

        // Rotate payload based on current day
        for ($i = 0; $i < $currentDayIso - 1; $i++) {
            $keys = array_keys($payload);
            $val = $payload[$keys[0]];
            unset($payload[$keys[0]]);
            $payload[$keys[0]] = $val;
        }

        // Flatten the payload again
        $finalPayload = [];
        foreach ($payload as $item) {
            array_push($finalPayload, $item);
        }

        return response()->json($finalPayload);
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
