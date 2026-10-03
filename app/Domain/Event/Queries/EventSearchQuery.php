<?php

namespace App\Domain\Event\Queries;

use App\Domain\Event\Models\Event;
use Illuminate\Database\Eloquent\Builder;

final class EventSearchQuery
{
    public function build(?string $keyword = null): Builder
    {
        $query = Event::query()
            ->with('room')
            ->select([
                'id',
                'room_id',
                'name',
                'description',
                'start_date',
                'end_date',
                'organizer',
            ]);

        if ($keyword) {
            $query->where('name', 'like', "%{$keyword}%");
        }

        return $query;
    }
}
