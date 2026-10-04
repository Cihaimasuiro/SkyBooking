<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Domain\Room\Models\Room;
use App\Domain\User\Models\User;
use Carbon\Carbon;

class BookingSeeder extends Seeder
{
    public function run(): void
    {
        $rooms = Room::all()->keyBy('gradient');
        $user = User::first();
        if (!$user) {
            $user = User::create([
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'password' => bcrypt('password'),
            ]);
        }
        
        $bookings = [
            [
                'user_id' => $user->id,
                'room_id' => $rooms['R001']->id ?? 1,
                'event_name' => 'Pameran Produk Lokal',
                'event_type' => 'Pameran',
                'date' => '2026-09-22',
                'start_time' => '08:00',
                'end_time' => '17:00',
                'participants' => 150,
                'pic' => 'Budi Santoso',
                'email' => 'budi@example.com',
                'phone' => '08123456789',
                'division' => '',
                'status' => 'approved',
                'created_at' => Carbon::parse('2026-09-18'),
                'updated_at' => Carbon::parse('2026-09-18'),
            ],
            [
                'user_id' => $user->id,
                'room_id' => $rooms['R003']->id ?? 3,
                'event_name' => 'Lomba Tari Daerah',
                'event_type' => 'Lomba',
                'date' => '2026-09-24',
                'start_time' => '09:00',
                'end_time' => '17:00',
                'participants' => 100,
                'pic' => 'Dewi Kusuma',
                'email' => 'dewi@example.com',
                'phone' => '08987654321',
                'division' => '',
                'status' => 'pending',
                'created_at' => Carbon::parse('2026-09-19'),
                'updated_at' => Carbon::parse('2026-09-19'),
            ],
            [
                'user_id' => $user->id,
                'room_id' => $rooms['R001']->id ?? 1,
                'event_name' => 'Pertunjukan Seni Budaya',
                'event_type' => 'Pertunjukan',
                'date' => '2026-09-27',
                'start_time' => '18:00',
                'end_time' => '21:00',
                'participants' => 180,
                'pic' => 'Rizki Pratama',
                'email' => 'rizki@example.com',
                'phone' => '08111222333',
                'division' => '',
                'status' => 'rejected',
                'created_at' => Carbon::parse('2026-09-20'),
                'updated_at' => Carbon::parse('2026-09-20'),
            ],
            [
                'user_id' => $user->id,
                'room_id' => $rooms['R002']->id ?? 2,
                'event_name' => 'Pameran UMKM',
                'event_type' => 'Pameran',
                'date' => '2026-09-30',
                'start_time' => '10:00',
                'end_time' => '16:00',
                'participants' => 60,
                'pic' => 'Ahmad Fauzi',
                'email' => 'ahmad@example.com',
                'phone' => '08222333444',
                'division' => '',
                'status' => 'approved',
                'created_at' => Carbon::parse('2026-09-22'),
                'updated_at' => Carbon::parse('2026-09-22'),
            ],
        ];

        DB::table('bookings')->insert($bookings);
    }
}
