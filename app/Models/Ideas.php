<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ideas extends Model
{
    use HasFactory;

    protected $fillable = [
        'stringId',
        'theme',
        'desc',
        'status',
        'author',
        'category',
        'likes',
        'image',
    ];

    // protected $appends = [
    //     'category',
    // ];

    public function category()
    {
        return $this->hasOne(Categories::class);
    }

    // public function category()
    // {
    //     return $this->belongsTo(Categories::class);
    // }

}
