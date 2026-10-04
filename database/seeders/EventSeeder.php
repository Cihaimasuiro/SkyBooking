<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Domain\Room\Models\Room;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        $today = Carbon::today()->format('Y-m-d');
        
        $rooms = Room::all()->keyBy('gradient');
        
        $events = [
            [
                'room_id' => $rooms['R001']->id ?? 1,
                'title' => 'Pertunjukan Wayang Kulit',
                'date' => $today,
                'start_time' => '19:00',
                'end_time' => '22:00',
                'pic' => 'Budi Santoso',
                'division' => '',
                'status' => 'scheduled',
                'color' => 'purple',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'room_id' => $rooms['R002']->id ?? 2,
                'title' => 'Pameran Batik Nusantara',
                'date' => $today,
                'start_time' => '09:00',
                'end_time' => '17:00',
                'pic' => 'Siti Rahayu',
                'division' => '',
                'status' => 'ongoing',
                'color' => 'orange',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'room_id' => $rooms['R003']->id ?? 3,
                'title' => 'Festival Tari Tradisional',
                'date' => $today,
                'start_time' => '14:00',
                'end_time' => '18:00',
                'pic' => 'Dewi Kusuma',
                'division' => '',
                'status' => 'scheduled',
                'color' => 'teal',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'room_id' => $rooms['R001']->id ?? 1,
                'title' => 'Lomba Fotografi Budaya',
                'date' => $today,
                'start_time' => '10:00',
                'end_time' => '13:00',
                'pic' => 'Rizki Pratama',
                'division' => '',
                'status' => 'ongoing',
                'color' => 'blue',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'room_id' => $rooms['R003']->id ?? 3,
                'title' => 'Pertunjukan Musik Gamelan',
                'date' => $today,
                'start_time' => '20:00',
                'end_time' => '22:00',
                'pic' => 'Ahmad Fauzi',
                'division' => '',
                'status' => 'scheduled',
                'color' => 'green',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('events')->insert($events);
    }
}
