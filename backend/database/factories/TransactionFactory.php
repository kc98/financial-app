<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Transaction;
use Faker\Generator as Faker;

use App\Category;
use App\User;

$factory->define(Transaction::class, function (Faker $faker) {
    $categoryCount = Category::all()->count();
    $userCount = User::all()->count();

    return [
        'description' => $faker->sentence($nbWords = 4, $variableNbWords = true),
        'amount' => $faker->randomFloat($nbMaxDecimals = 2, $min = 1, $max = 100),
        'category_id' => $faker->numberBetween($min = 1, $max = 5),
        'user_id'=> $faker->numberBetween($min = 1, $max = $userCount),
        'created_at' => $createTime = $faker->dateTimeBetween($startDate = '-1 years', $endDate = 'now', $timezone = null),
        'updated_at' => $createTime,
    ];
});
