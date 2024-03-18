<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Diamond extends Model
{
    use HasFactory, Notifiable, HasUuids;
    protected $fillable = [
        'amount',
        'image',
        'price',
    ];

    public function getIncrementing ()
    {
        return false;
    }
}
