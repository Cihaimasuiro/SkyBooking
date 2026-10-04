<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Web\HomeController;
use App\Http\Controllers\Web\RoomController;
use App\Http\Controllers\Web\BookingController;
use App\Http\Controllers\Web\EventController;
use App\Http\Controllers\Web\LoginController;
use Inertia\Inertia;

// SkyBooking Web Routes

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/login', [LoginController::class, 'show'])->name('login');
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

Route::get('/ruang', [RoomController::class, 'index'])->name('rooms.index');
Route::get('/ruang/{id}', [RoomController::class, 'show'])->name('rooms.show');

Route::get('/booking', [BookingController::class, 'create'])->name('bookings.create');
Route::post('/booking', [BookingController::class, 'store'])->name('bookings.store');
Route::get('/booking-success', [BookingController::class, 'success'])->name('bookings.success');
Route::get('/my-booking', [BookingController::class, 'myBookings'])->name('bookings.mine');

use App\Http\Controllers\Web\AdminController;
Route::get('/admin', [AdminController::class, 'dashboard'])->name('admin.dashboard');
Route::get('/admin/bookings', [AdminController::class, 'index'])->name('admin.bookings');

Route::get('/event', [EventController::class, 'index'])->name('events.index');

Route::get('/map', function () {
    return Inertia::render('MapView');
})->name('map');
Route::get('/register', function () {
    return Inertia::render('RegisterView');
})->name('register');
