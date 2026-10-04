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
                'title',
                'description',
                'date',
                'start_time',
                'end_time',
                'pic',
                'division',
                'status',
                'color',
            ]);

        if ($keyword) {
            $query->where('title', 'like', "%{$keyword}%");
        }

        return $query;
    }
}
