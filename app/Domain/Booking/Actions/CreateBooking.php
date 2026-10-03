<?php

namespace App\Domain\Booking\Actions;

use App\Domain\Booking\Models\Booking;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

final class CreateBooking
{
    public function execute(array $data, int $userId): Booking
    {
        // Availability Check
        $overlapping = Booking::query()
            ->where('room_id', $data['room_id'])
            ->where('date', $data['date'])
            ->where(function ($query) use ($data) {
                $query->whereBetween('start_time', [$data['start_time'], $data['end_time']])
                      ->orWhereBetween('end_time', [$data['start_time'], $data['end_time']])
                      ->orWhere(function ($q) use ($data) {
                          $q->where('start_time', '<=', $data['start_time'])
                            ->where('end_time', '>=', $data['end_time']);
                      });
            })
            ->whereNotIn('status', ['Cancelled', 'Rejected'])
            ->exists();

        if ($overlapping) {
            throw ValidationException::withMessages([
                'start_time' => 'The room is already booked for the selected time slot.',
            ]);
        }

        return DB::transaction(function () use ($data, $userId) {
            return Booking::create([
                'user_id'    => $userId,
                'room_id'    => $data['room_id'],
                'date'       => $data['date'],
                'start_time' => $data['start_time'],
                'end_time'   => $data['end_time'],
                'purpose'    => $data['purpose'],
                'status'     => 'Pending', // Requires approval according to business rules
            ]);
        });
    }
}
