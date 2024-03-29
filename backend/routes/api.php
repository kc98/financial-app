<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/**
 * Request types -> GET, POST, PUT, DELETE
 * Browse -> GET /items
 * Read -> GET /items/{id}
 * Edit -> PUT /items/{id}
 * Add -> POST /items
 * Delete -> DELETE /items/{id}
 * Route::METHOD('ROUTE', 'CONTROLLERNAME@FUNCTION')
 */
/**
 * Scenarios
 * Phase 1: Basic budget app
 * 1. [X] User can login
 * 2. [X] New user can sign up
 * 3. [X] User can check transaction list
 * 4. [X] User can check old transaction list
 * 5. [X] User can manage (create, read, update, delete) their own transaction
 * 6. [X] User can logout
 * 7. [X] User can edit their profile (name, email and password)
 */
Route::post('/login', 'AuthController@login');
Route::post('/signup', 'AuthController@signup');

Route::middleware(['auth:api'])->group(function () {
    Route::get('/me', 'AuthController@me');
    Route::post('/logout', 'AuthController@logout');

    Route::put('/profile', 'UserController@updateProfile');
    Route::put('/profile/password', 'UserController@updatePassword');

    Route::get('/transactions', 'TransactionController@index'); // Browse
    Route::get('/transactions/{transaction}', 'TransactionController@show'); // Read http://localhost:8000/api/transactions/123
    Route::put('/transactions/{transaction}', 'TransactionController@update'); // Edit
    Route::post('/transactions', 'TransactionController@store'); // Add
    Route::delete('/transactions/{transaction}', 'TransactionController@destroy'); // Delete
});

Route::get('/categories', 'CategoryController@index'); // Browse

/**
 * Phase 2: Insight
 * 1. [ ] User can generate their monthly insight
 * 2. [X] User can set their own insight weekly budget (and regenerate the insight)
 */
Route::middleware(['auth:api'])->group(function () {
    Route::get('/insights', 'InsightController@show'); // Get insight (Read)
    Route::get('/insights/budget', 'InsightController@showBudget'); // Get insight budget (Read)
    Route::put('/insights/budget', 'InsightController@updateBudget'); // Update insight budget (Edit)
});

/**
 * Phase 3: Chat bot commands
 * 1. User can manage (create, edit, update, delete) their transactions
 * 2. User can change insight monthly budget
 * 3. User can add transaction with specific details (category, time)
 * 4. User can see their chat history with the bot
 */

/**
 * Phase 4: Advanced chat bot
 * 1. Bot can ask overspent users if their current money usage is okay (DialogFlow decision tree)
 */

/**
 * Extra feature - if have time:
 * 1. User can put different currency to auto convert (example: can convert 1SGD to 3.04MYR)
 * 2. User account verification
 * 3. User password change notification email
 * 4. Different insight saving plans (different algorithms/methods)
 * 5. Insights can show exceeded amount for each category
 * 6. User can use custom categories
 */
