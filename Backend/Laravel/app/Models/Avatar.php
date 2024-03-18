<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User;

class Avatar extends Model
{
    use HasFactory;
    protected $fillable = ['avatarImage', 'price', 'purchase'];

}
