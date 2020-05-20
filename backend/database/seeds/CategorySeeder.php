<?php

use Illuminate\Database\Seeder;

use App\Category;
use App\TransactionType;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $expenseType = TransactionType::where('transaction_type', 'expense')->first();
        $incomeType = TransactionType::where('transaction_type', 'income')->first();
        $categories = [['Music', $expenseType],
                        ['Movies & DVDs', $expenseType],
                        ['Newspaper & Magazines', $expenseType],
                        ['Tuition', $expenseType],
                        ['Student Loan', $expenseType],
                        ['Books & Supplies', $expenseType],
                        ['Clothing (was Clothes & Accessories)', $expenseType],
                        ['Books', $expenseType],
                        ['Electronics & Software', $expenseType],
                        ['Hobbies', $expenseType],
                        ['Sporting Goods', $expenseType],
                        ['Laundry', $expenseType],
                        ['Remove: Gym', $expenseType],
                        ['Hair', $expenseType],
                        ['Spa & Massage', $expenseType],
                        ['Remove: Sports', $expenseType],
                        ['Dentist', $expenseType],
                        ['Doctor', $expenseType],
                        ['Eye care', $expenseType],
                        ['Pharmacy', $expenseType],
                        ['Health Insurance', $expenseType],
                        ['Gym', $expenseType],
                        ['Sports', $expenseType],
                        ['Activities', $expenseType],
                        ['Allowance', $expenseType],
                        ['Baby Supplies', $expenseType],
                        ['Babysitter & Daycare', $expenseType],
                        ['Child Support', $expenseType],
                        ['Toys', $expenseType],
                        ['Remove: education', $expenseType],
                        ['Remove: student loan', $expenseType],
                        ['Groceries', $expenseType],
                        ['Coffee shops', $expenseType],
                        ['Fast Food', $expenseType],
                        ['Restaurants', $expenseType],
                        ['Alcohol', $expenseType],
                        ['Charity', $expenseType],
                        ['Remove: Church', $expenseType],
                        ['Deposit', $expenseType],
                        ['Withdrawal', $expenseType],
                        ['Dividends & Cap Gains', $expenseType],
                        ['Buy', $expenseType],
                        ['Sell', $expenseType],
                        ['Television (was Cable/Satellite TV)', $expenseType],
                        ['Home Phone (was Phone)', $expenseType],
                        ['Internet', $expenseType],
                        ['Mobile Phone (was Wireless/Cellular)', $expenseType],
                        ['Utilities', $expenseType],
                        ['Gas & Fuel (was Gas / Fuel)', $expenseType],
                        ['Parking', $expenseType],
                        ['Service & Auto Parts', $expenseType],
                        ['Auto Payment', $expenseType],
                        ['Auto Insurance', $expenseType],
                        ['Air Travel', $expenseType],
                        ['Hotel', $expenseType],
                        ['Rental Car & Taxi', $expenseType],
                        ['Vacation', $expenseType],
                        ['Service Fee', $expenseType],
                        ['Late Fee', $expenseType],
                        ['Finance Charge', $expenseType],
                        ['ATM Fee', $expenseType],
                        ['Bank Fee', $expenseType],
                        ['Commissions', $expenseType],
                        ['Advertising', $expenseType],
                        ['Office Supplies', $expenseType],
                        ['Printing', $expenseType],
                        ['Shipping', $expenseType],
                        ['Legal', $expenseType],
                        ['Federal Tax', $expenseType],
                        ['State Tax', $expenseType],
                        ['Local Tax', $expenseType],
                        ['Sales Tax', $expenseType],
                        ['Property Tax', $expenseType],
                        ['Investment', $incomeType],
                        ['Returned Purchase', $incomeType],
                        ['Bonus', $incomeType],
                        ['Interest Income', $incomeType],
                        ['Reimbursement', $incomeType],
                        ['Rental Income', $incomeType],
                        ['Cash & ATM', $incomeType],
                        ['Check', $incomeType]];

        foreach ($categories as $item) {
            $category = new Category;
            $category->category = $item[0];
            $category->transactionType()->associate($item[1]);
            $category->save();
        }
    }
}
