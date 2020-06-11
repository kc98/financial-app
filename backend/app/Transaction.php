<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Category;

class Transaction extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'description', 'amount', 'timestamp'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'user_id', 'updated_at', 'category_id', 'created_at'
    ];

    /**
     * Normal data:
     * 'id', 'description', 'amount', 'timestamp', 'transaction_type', 'category'
     * '1', 'buy grocery', '1.25', '12345', 'expense', 'food'
     * '2', 'salary', '1000', '23456', 'income', 'general income'
     * '3', 'movies', '20', '12345', 'expense', 'entertainment'
     * '4', 'arcade', '15.5', '12345', 'expense', 'entertainment'
     * '5', 'lunch', '12', '12345', 'expense', 'food'
     *
     * normalized:
     * transaction table -
     * 'id', 'description', 'amount', 'timestamp', 'category_id'
     * '1', 'buy grocery', '1.25', '12345', '1'
     * '2', 'salary', '1000', '23456', '2'
     * '3', 'movies', '20', '12345', '3'
     * '4', 'arcade', '15.5', '12345', '3'
     * '5', 'lunch', '12', '12345', '1'
     *
     * transaction_type table -
     * 'id', 'transaction_type'
     * '1', 'expense'
     * '2', 'income'
     *
     * category table -
     * 'id', 'category', 'transaction_type_id'
     * '1', 'food', '1'
     * '2', 'general income', '2'
     * '3', 'entertainment', '1'
     * '4', 'deposit', '2'
     */

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $appends = [
        'category', 'timestamp'
    ];
    

    // Relationships
    /**
     * One-to-One (hasOne(), inverse: belongsTo())
     * One-to-Many (hasMany(), inverse: belongsTo())
     * Many-to-Many (belongsToMany(), inverse: belongsToMany())
     */
    public function category()
    {
        return $this->belongsTo('App\Category');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    // Accessor/Mutators
    /**
     * Can change how the data show up in the output
     *
     * Function name format getNAMEAttribute
     * e.g. getColumnNameAttribute, getTimeAttribute
     */
    public function getCategoryAttribute()
    {
        return Category::find($this->category_id)->category;
    }

    public function getTimestampAttribute()
    {
        return $this->created_at;
    }
}
