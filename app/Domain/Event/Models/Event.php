<?php

namespace App\Domain\Event\Models;

use App\Domain\Room\Models\Room;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_id',
        'title',
        'description',
        'date',
        'start_time',
        'end_time',
        'pic',
        'division',
        'status',
        'color',
    ];

    protected $casts = [
        'date' => 'date',
        'start_time' => 'string',
        'end_time' => 'string',
    ];

    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class);
    }
}
