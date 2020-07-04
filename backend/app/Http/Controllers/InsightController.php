<?php

namespace App\Http\Controllers;

use \Carbon\Carbon;
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
        $currentDayIso = Carbon::now()->dayOfWeekIso;
        $firstDay = Carbon::now()->startOfDay()->subDays($currentDayIso - 1)->subWeeks(12);
        $lastDay = Carbon::now()->endOfDay()->addDays(7 - $currentDayIso);
        
        $transactions = Transaction::whereBetween('created_at', [$firstDay, $lastDay])->get();

        $dailyTransactions = [[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]]];
        foreach ($transactions as $transaction) {
            $transactionTime = Carbon::parse($transaction->timestamp);
            $morningPeriodEnd = Carbon::create($transactionTime->year, $transactionTime->month, $transactionTime->day, 11, 59, 59);
            $afternoonPeriodEnd = Carbon::create($transactionTime->year, $transactionTime->month, $transactionTime->day, 17, 59, 59);
            $dayIso = $transactionTime->dayOfWeekIso;

            // if ($transactionTime->lessThanOrEqualTo($morningPeriodEnd)) {
            //     $transaction['period'] = 'morning';
            // } elseif ($transactionTime->lessThanOrEqualTo($afternoonPeriodEnd)) {
            //     $transaction['period'] = 'afternoon';
            // } else {
            //     $transaction['period'] = 'night';
            // }

            if ($transactionTime->lessThanOrEqualTo($morningPeriodEnd)) {
                array_push($dailyTransactions[$dayIso - 1][0], $transaction);
            } elseif ($transactionTime->lessThanOrEqualTo($afternoonPeriodEnd)) {
                array_push($dailyTransactions[$dayIso - 1][1], $transaction);
            } else {
                array_push($dailyTransactions[$dayIso - 1][2], $transaction);
            }

            // array_push($dailyTransactions[$dayIso - 1], $transaction);
        }

        // TODO: Transform data into end data
        $payload = [];
        foreach ($dailyTransactions as $dailyTransaction) {
            $dailyPayload = [];
            $dailyPayload['day'] = Carbon::parse($dailyTransaction[0][0]->timestamp)->englishDayOfWeek;
            $dailyPayload['period'] = [];

            foreach ($dailyTransaction as $key => $periodTransaction) {
                $periodPayload = [];
                if($key == 0) {
                    $periodPayload['name'] = 'morning';
                }
                else if($key == 1) {
                    $periodPayload['name'] = 'afternoon';
                }
                else if($key == 2) {
                    $periodPayload['name'] = 'night';
                }

                $periodPayload['categories'] = [];

                usort($periodTransaction, function($a, $b) {
                    return strcmp($a['category'], $b['category']);
                });

                foreach($periodTransaction as $categoryTransaction) {
                    // $categoryPayload = [];
                    // TODO: Continue here
                    array_push($periodPayload['categories'], $categoryTransaction);
                }

                array_push($dailyPayload['period'], $periodPayload);
            }

            array_push($payload, $dailyPayload);
        }

        return response()->json($payload);

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
