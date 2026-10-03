<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Domain\Booking\Models\Booking;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function dashboard(): Response
    {
        $bookings = Booking::with('room')->orderBy('created_at', 'desc')->get();
        return Inertia::render('admin/AdminDashboardView', [
            'bookings' => $bookings
        ]);
    }

    public function index(): Response
    {
        $bookings = Booking::with('room')->orderBy('created_at', 'desc')->get();
        return Inertia::render('admin/AdminBookingView', [
            'bookings' => $bookings
        ]);
    }
}
