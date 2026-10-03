<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

use App\Domain\Event\Queries\EventSearchQuery;

class EventController extends Controller
{
    public function index(EventSearchQuery $query): Response
    {
        $events = $query->build()->get();
        return Inertia::render('EventView', [
            'events' => $events
        ]);
    }
}
