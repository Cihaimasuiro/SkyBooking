<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

use App\Domain\Room\Queries\RoomSearchQuery;
use App\Domain\Room\Models\Room;

class RoomController extends Controller
{
    public function index(RoomSearchQuery $query): Response
    {
        $rooms = $query->build()->get();
        return Inertia::render('RoomView', [
            'rooms' => $rooms
        ]);
    }

    public function show(string $id, RoomSearchQuery $query): Response
    {
        // Actually, for show, we should just fetch the specific room.
        $room = Room::findOrFail($id);
        
        // Pass events later when we have events for this room
        return Inertia::render('RoomDetailView', [
            'room' => $room,
            'id' => $id, // Some components might still expect 'id' prop
        ]);
    }
}
