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

        $bookings = $query->build($userId)->get()->map(function ($booking) {
            return [
                'id' => 'BK-' . str_pad($booking->id, 5, '0', STR_PAD_LEFT),
                'eventName' => $booking->event_name,
                'eventType' => $booking->event_type,
                'roomId' => $booking->room->gradient ?? 'R001',
                'roomName' => $booking->room->name ?? '',
                'terminal' => $booking->room->location ?? 'Terminal 1',
                'date' => $booking->date ? $booking->date->format('Y-m-d') : '',
                'startTime' => $booking->start_time ? substr($booking->start_time, 0, 5) : '',
                'endTime' => $booking->end_time ? substr($booking->end_time, 0, 5) : '',
                'participants' => $booking->participants,
                'pic' => $booking->pic,
                'email' => $booking->email,
                'phone' => $booking->phone,
                'division' => $booking->division,
                'notes' => $booking->notes,
                'adminNote' => $booking->admin_note,
                'rejectReason' => $booking->reject_reason,
                'status' => $booking->status,
                'createdAt' => $booking->created_at ? $booking->created_at->format('Y-m-d') : '',
            ];
        });

        return Inertia::render('MyBookingView', [
            'bookings' => $bookings
        ]);
    }
}
