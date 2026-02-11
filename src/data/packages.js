import { travels } from './travels';

export const packages = [
    {
        id: 1,
        title: "Paket Umroh Hemat 9 Hari",
        travel: travels[0], // Shafira
        price: 24500000,
        duration: 9,
        rating: 4.8,
        reviewCount: 45,
        departureDate: "2024-03-15",
        hotel: {
            makkah: "Movenpick Hajar Tower (5*)",
            madinah: "Ruve Al Madinah (4*)"
        },
        airlines: "Lion Air",
        image: "https://images.unsplash.com/photo-1564769662533-4f00a87b4056?q=80&w=600&auto=format&fit=crop",
        highlights: ["Hotel Dekat Masjidil Haram", "Direct Flight", "Handling Profesional"],
        itinerary: [
            { day: 1, title: "Jakarta - Jeddah - Madinah", desc: "Berangkat dari Soekarno-Hatta menuju Jeddah, lanjut perjalanan bus ke Madinah." },
            { day: 2, title: "Ziarah Madinah", desc: "Mengunjungi Masjid Nabawi, Raudhah, dan Makam Rasulullah SAW." },
            { day: 3, title: "City Tour Madinah", desc: "Mengunjungi Masjid Quba, Kebun Kurma, dan Masjid Qiblatain." },
            { day: 4, title: "Madinah - Makkah", desc: "Miqat di Bir Ali, perjalanan ke Makkah, dan melaksanakan Umroh pertama." },
            { day: 5, title: "Ibadah Makkah", desc: "Memperbanyak ibadah di Masjidil Haram." },
            { day: 6, title: "City Tour Makkah", desc: "Mengunjungi Jabal Tsur, Jabal Rahmah, Mina, dan Muzdalifah." },
            { day: 7, title: "Ibadah & Tawaf Wada", desc: "Ibadah bebas dan persiapan kepulangan." },
            { day: 8, title: "Makkah - Jeddah - Jakarta", desc: "Perjalanan ke Jeddah, City Tour Jeddah (Corniche), penerbangan ke Jakarta." },
            { day: 9, title: "Tiba di Jakarta", desc: "Alhamdulillah tiba di Jakarta dengan selamat." }
        ],
        facilities: ["Tiket Pesawat PP", "Visa Umroh", "Hotel", "Makan 3x Sehari", "Transportasi Bus AC", "Muthawif", "Air Zamzam 5L"],
        terms: ["Paspor berlaku min 7 bulan", "Suntik Meningitis", "DP 5 Juta"]
    },
    {
        id: 2,
        title: "Paket Umroh Plus Turki 12 Hari",
        travel: travels[1], // Al-Hijaz
        price: 32500000,
        duration: 12,
        rating: 4.9,
        reviewCount: 120,
        departureDate: "2024-04-10",
        hotel: {
            makkah: "Swissotel Makkah (5*)",
            madinah: "Anwar Al Madinah (5*)",
            turki: "Hilton Istanbul (5*)"
        },
        airlines: "Turkish Airlines",
        image: "https://images.unsplash.com/photo-1596706059960-7a544f808f97?q=80&w=600&auto=format&fit=crop",
        highlights: ["Umroh + Wisata Istanbul", "Sholat Jumat di Masjidil Haram", "Hotel Bintang 5"],
        itinerary: Array(12).fill({ day: 1, title: "Contoh Itinerary", desc: "Deskripsi kegiatan harian..." }),
        facilities: ["Tiket Pesawat PP", "Visa Umroh & Turki", "Hotel *5", "Makan Fullboard", "Guide Lokal Turki"],
        terms: ["Paspor min 8 bulan", "Vaksin Covid Lengkap"]
    },
    {
        id: 3,
        title: "Umroh Ramadhan Full 30 Hari",
        travel: travels[2], // Maktour
        price: 45000000,
        duration: 30,
        rating: 5.0,
        reviewCount: 15,
        departureDate: "2024-03-10",
        hotel: {
            makkah: "Fairmont Makkah (5*)",
            madinah: "Oberoi Madinah (5*)"
        },
        airlines: "Saudia Airlines",
        image: "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?q=80&w=600&auto=format&fit=crop",
        highlights: ["Ramadhan di Tanah Suci", "I'tikaf 10 Hari Terakhir", "Sahur & Iftar Bersama"],
        itinerary: Array(30).fill({ day: 1, title: "Ibadah Ramadhan", desc: "Memperbanyak amal ibadah di bulan suci." }),
        facilities: ["Fasilitas VIP", "Tenda VIP I'tikaf", "Laundry Gratis"],
        terms: ["Jamaah Pria/Wanita"]
    },
    {
        id: 4,
        title: "Paket Umroh Reguler 9 Hari",
        travel: travels[3], // Patuna
        price: 28000000,
        duration: 9,
        rating: 4.7,
        reviewCount: 88,
        departureDate: "2024-05-05",
        hotel: {
            makkah: "Le Meridien (5*)",
            madinah: "Al Haram (4*)"
        },
        airlines: "Garuda Indonesia",
        image: "https://images.unsplash.com/photo-1542385906-6df599026337?q=80&w=600&auto=format&fit=crop",
        highlights: ["Direct Madinah", "Maskapai Kebanggaan", "Pembimbing Senior"],
        itinerary: Array(9).fill({ day: 1, title: "Kegiatan Rutin", desc: "Manasik & Ziarah" }),
        facilities: ["Perlengkapan Umroh Premium", "Lounge Bandara"],
        terms: ["Sehat Jasmani Rohani"]
    },
    {
        id: 5,
        title: "Paket Hemat Backpacker 10 Hari",
        travel: travels[4], // Cahaya Kaabah
        price: 21500000,
        duration: 10,
        rating: 4.3,
        reviewCount: 20,
        departureDate: "2024-06-12",
        hotel: {
            makkah: "Hotel Bintang 3 (Jarak 500m)",
            madinah: "Hotel Bintang 3 (Jarak 300m)"
        },
        airlines: "Lion Air",
        image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=600&auto=format&fit=crop",
        highlights: ["Harga Sangat Terjangkau", "Cocok untuk Milenial", "Semi Mandiri"],
        itinerary: Array(10).fill({ day: 1, title: "Umroh Mandiri", desc: "Fokus ibadah dan eksplorasi mandiri." }),
        facilities: ["Tiket & Visa", "Hotel Quad", "Makan Box"],
        terms: ["Usia max 45 tahun"]
    }
];
