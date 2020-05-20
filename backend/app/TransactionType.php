<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TransactionType extends Model
{
    /**
     * transaction_type table -
     * 'id', 'transaction_type'
     * '1', 'expense'
     * '2', 'income'
     */
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'transaction_type',
    ];

    // Relationships
    public function categories()
    {
        return $this->hasMany('App\Category');
    }
}
