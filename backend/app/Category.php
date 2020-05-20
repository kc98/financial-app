<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    /**
     * category table -
     * 'id', 'category', 'transaction_type_id'
     * '1', 'food', '1'
     * '2', 'general income', '2'
     * '3', 'entertainment', '1'
     * '4', 'deposit', '2'
     */
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'category',
    ];

    // Relationships
    public function transactions()
    {
        return $this->hasMany('App\Transaction');
    }

    public function transactionType()
    {
        return $this->belongsTo('App\TransactionType');
    }
}
