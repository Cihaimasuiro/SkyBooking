<?php

namespace App\Domain\Room\Queries;

use App\Domain\Room\Models\Room;
use Illuminate\Database\Eloquent\Builder;

final class RoomSearchQuery
{
    public function build(?string $keyword = null): Builder
    {
        $query = Room::query()
            ->select([
                'id',
                'name',
                'capacity',
                'location',
                'status',
                'image',
                'description',
                'gradient',
            ]);

        if ($keyword) {
            $query->where('name', 'like', "%{$keyword}%");
        }

        return $query;
    }
}
