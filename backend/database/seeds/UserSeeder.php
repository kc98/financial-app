<?php

use Illuminate\Database\Seeder;

use App\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds. Can run migration and seeder together with
    * `php artisan migrate:fresh --seed`
     *
     * @return void
     */
    public function run()
    {
        $user = new User();
        $user->name = 'user';
        $user->email = 'user@localhost.dev';
        $user->email_verified_at = now();
        $user->password = bcrypt('123456');
        $user->remember_token = 'HhmX9hw0hPOp';
        $user->save();

        // Generate 20 accounts
        factory(User::class, 20)->create();
    }
}
