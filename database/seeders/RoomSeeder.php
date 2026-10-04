<?php

namespace Database\Seeders;

use App\Domain\Room\Models\Room;
use Illuminate\Database\Seeder;

class RoomSeeder extends Seeder
{
    public function run(): void
    {
        $rooms = [
            [
                'name' => 'R001: Ruang Rapat',
                'capacity' => 20,
                'location' => 'Lantai 1',
                'status' => 'Available',
                'description' => 'Fasilitas: Proyektor, AC, Whiteboard, Video Conference',
                'image' => '/images/kawasan-maliboro.webp',
                'gradient' => 'R001',
            ],
            [
                'name' => 'R002: Ruang Konferensi',
                'capacity' => 100,
                'location' => 'Lantai 2',
                'status' => 'Available',
                'description' => 'Fasilitas: Sound System, Proyektor, AC Sentral, Panggung',
                'image' => '/images/gedung-penghubung.webp',
                'gradient' => 'R002',
            ],
            [
                'name' => 'R003: Ruang Interview 1',
                'capacity' => 5,
                'location' => 'Lantai 1',
                'status' => 'Available',
                'description' => 'Fasilitas: AC, Meja Bundar, Sofa',
                'image' => '/images/area-partywisata.webp',
                'gradient' => 'R003',
            ],
            [
                'name' => 'R004: Ruang Server',
                'capacity' => 2,
                'location' => 'Lantai Dasar',
                'status' => 'Maintenance',
                'description' => 'Akses Terbatas. Fasilitas: Rack Server, Cooling System',
                'image' => '/images/copernico-yfmU1uL_mp8-unsplash.webp',
                'gradient' => 'R004',
            ],
            [
                'name' => 'R005: Ruang Audit',
                'capacity' => 10,
                'location' => 'Lantai 3',
                'status' => 'Available',
                'description' => 'Fasilitas: AC, Whiteboard, Lemari Arsip',
                'image' => '/images/blank-living-room-interior-with-copy-space.webp',
                'gradient' => 'R005',
            ],
            [
                'name' => 'R006: Ruang Lounge',
                'capacity' => 50,
                'location' => 'Lantai 2',
                'status' => 'Booked',
                'description' => 'Fasilitas: Sofa, TV, Coffee Maker',
                'image' => '/images/sofa-living-room-with-copy-space.webp',
                'gradient' => 'R006',
            ],
            [
                'name' => 'R007: Ruang Training',
                'capacity' => 30,
                'location' => 'Lantai 4',
                'status' => 'Available',
                'description' => 'Fasilitas: PC per meja, Proyektor, AC',
                'gradient' => 'R007',
            ],
        ];

        foreach ($rooms as $room) {
            Room::create($room);
        }
    }
}
