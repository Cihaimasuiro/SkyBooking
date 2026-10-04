<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

use App\Domain\Room\Queries\RoomSearchQuery;

use App\Domain\Event\Models\Event;

class HomeController extends Controller
{
    public function index(RoomSearchQuery $query): Response
    {
        $rooms = $query->build()->get();
        $events = Event::with('room')->get()->map(function ($event) {
            return [
                'id' => 'E' . str_pad($event->id, 3, '0', STR_PAD_LEFT),
                'title' => $event->title,
                'roomId' => $event->room->gradient ?? 'R001',
                'roomName' => $event->room->name ?? '',
                'terminal' => $event->room->location ?? 'Terminal 1',
                'date' => $event->date ? $event->date->format('Y-m-d') : '',
                'startTime' => $event->start_time ? substr($event->start_time, 0, 5) : '',
                'endTime' => $event->end_time ? substr($event->end_time, 0, 5) : '',
                'pic' => $event->pic,
                'division' => $event->division,
                'status' => $event->status,
                'color' => $event->color,
            ];
        });

        return Inertia::render('HomeView', [
            'rooms' => $rooms,
            'events' => $events
        ]);
    }
}
