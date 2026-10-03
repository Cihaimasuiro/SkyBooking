<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

use App\Domain\Room\Queries\RoomSearchQuery;

class HomeController extends Controller
{
    public function index(RoomSearchQuery $query): Response
    {
        $rooms = $query->build()->get();
        return Inertia::render('HomeView', [
            'rooms' => $rooms
        ]);
    }
}
