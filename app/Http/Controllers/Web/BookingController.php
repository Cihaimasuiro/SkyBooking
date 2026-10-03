<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Domain\Booking\Actions\CreateBooking;
use App\Http\Requests\Web\StoreBookingRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BookingController extends Controller
{
    public function create(Request $request): Response
    {
        $rooms = \App\Domain\Room\Models\Room::where('status', 'Available')->get();
        return Inertia::render('BookingView', [
            'rooms' => $rooms
        ]);
    }

    public function store(StoreBookingRequest $request, CreateBooking $action): RedirectResponse
    {
        // For now, assume a dummy user if not authenticated, to keep it working during dev.
        // In reality, this route will be protected by auth middleware.
        $userId = auth()->id() ?? \App\Domain\User\Models\User::firstOrCreate(
            ['email' => 'test@example.com'],
            ['name' => 'Test User', 'password' => bcrypt('password')]
        )->id;

        $action->execute($request->validated(), $userId);

        return redirect()->route('bookings.success');
    }

    public function success(): Response
    {
        return Inertia::render('BookingSuccessView');
    }

    public function myBookings(\App\Domain\Booking\Queries\UserBookingsQuery $query): Response
    {
        $userId = auth()->id() ?? \App\Domain\User\Models\User::firstOrCreate(
            ['email' => 'test@example.com'],
            ['name' => 'Test User', 'password' => bcrypt('password')]
        )->id;

        $bookings = $query->build($userId)->get();

        return Inertia::render('MyBookingView', [
            'bookings' => $bookings
        ]);
    }
}
