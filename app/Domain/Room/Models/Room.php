<?php

namespace App\Domain\Room\Models;

use App\Domain\Booking\Models\Booking;
use App\Domain\Event\Models\Event;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'capacity',
        'location',
        'status',
        'image',
        'description',
        'gradient',
    ];

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    public function events(): HasMany
    {
        return $this->hasMany(Event::class);
    }
}
