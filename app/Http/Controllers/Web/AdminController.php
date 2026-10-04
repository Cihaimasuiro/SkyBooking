<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Domain\Booking\Models\Booking;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    private function formatBookings($bookings)
    {
        return $bookings->map(function ($booking) {
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
    }

    public function dashboard(): Response
    {
        $bookings = Booking::with('room')->orderBy('created_at', 'desc')->get();
        return Inertia::render('admin/AdminDashboardView', [
            'bookings' => $this->formatBookings($bookings)
        ]);
    }

    public function index(): Response
    {
        $bookings = Booking::with('room')->orderBy('created_at', 'desc')->get();
        return Inertia::render('admin/AdminBookingView', [
            'bookings' => $this->formatBookings($bookings)
        ]);
    }
}
