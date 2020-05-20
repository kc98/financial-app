<?php

use Illuminate\Database\Seeder;

use App\TransactionType;

class TransactionTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $transactionType = new TransactionType;
        $transactionType->transaction_type = 'income';
        $transactionType->save();

        $transactionType = new TransactionType;
        $transactionType->transaction_type = 'expense';
        $transactionType->save();
    }
}
