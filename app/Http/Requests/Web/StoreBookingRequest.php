<?php

namespace App\Http\Requests\Web;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // We'll add auth middleware to route instead
    }

    public function rules(): array
    {
        return [
            'room_id'    => ['required', 'integer', 'exists:rooms,id'],
            'date'       => ['required', 'date', 'after_or_equal:today'],
            'start_time' => ['required', 'date_format:H:i'],
            'end_time'   => ['required', 'date_format:H:i', 'after:start_time'],
            'purpose'    => ['required', 'string', 'max:1000'],
        ];
    }
}
