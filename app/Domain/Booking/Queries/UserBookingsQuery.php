<?php

namespace App\Domain\Booking\Queries;

use App\Domain\Booking\Models\Booking;
use Illuminate\Database\Eloquent\Builder;

final class UserBookingsQuery
{
    public function build(int $userId): Builder
    {
        return Booking::query()
            ->with('room')
            ->where('user_id', $userId)
            ->orderBy('date', 'desc')
            ->orderBy('start_time', 'desc');
    }
}
