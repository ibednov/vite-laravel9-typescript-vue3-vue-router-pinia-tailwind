<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categories extends Model
{
    use HasFactory;

    protected $fillable = [
        'stringId',
        'name',
        'desc',
        'isEnabled',
        'likes',
        'countIdeas',
        'image',
    ];

    public function ideas()
    {
        return $this->hasMany(Ideas::class);
    }
}
