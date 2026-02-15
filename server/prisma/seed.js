const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const travels = [
    {
        id: 1,
        name: "Shafira Tour & Travel",
        logo: "https://placehold.co/100x100?text=Shafira",
        rating: 4.8,
        totalPackages: 15,
        description: "Travel umroh terpercaya dengan pengalaman lebih dari 20 tahun.",
        location: "Jakarta Selatan",
        verified: true,
    },
    {
        id: 2,
        name: "Al-Hijaz Indowisata",
        logo: "https://placehold.co/100x100?text=Al-Hijaz",
        rating: 4.9,
        totalPackages: 22,
        description: "Resmi terdaftar di Kemenag, memberangkatkan ribuan jamaah setiap tahun.",
        location: "Jakarta Timur",
        verified: true,
    },
    {
        id: 3,
        name: "Maktour",
        logo: "https://placehold.co/100x100?text=Maktour",
        rating: 4.7,
        totalPackages: 10,
        description: "Spesialis paket Umroh VIP dan Haji Plus dengan fasilitas terbaik.",
        location: "Jakarta Pusat",
        verified: true,
    },
    {
        id: 4,
        name: "Patuna Travel",
        logo: "https://placehold.co/100x100?text=Patuna",
        rating: 4.6,
        totalPackages: 18,
        description: "Melayani perjalanan ibadah dengan hati sejak 1983.",
        location: "Jakarta Selatan",
        verified: true,
    },
    {
        id: 5,
        name: "Cahaya Kaabah",
        logo: "https://placehold.co/100x100?text=Cahaya",
        rating: 4.5,
        totalPackages: 8,
        description: "Pilihan hemat dan nyaman untuk ibadah ke Tanah Suci.",
        location: "Bandung",
        verified: false,
    }
];

const packages = [
    {
        id: 1,
        title: "Paket Umroh Hemat 9 Hari",
        travelId: 1, // Shafira
        price: 24500000,
        duration: 9,
        rating: 4.8,
        reviewCount: 45,
        departureDate: new Date("2024-03-15"),
        hotelMakkah: "Movenpick Hajar Tower (5*)",
        hotelMadinah: "Ruve Al Madinah (4*)",
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
        travelId: 2, // Al-Hijaz
        price: 32500000,
        duration: 12,
        rating: 4.9,
        reviewCount: 120,
        departureDate: new Date("2024-04-10"),
        hotelMakkah: "Swissotel Makkah (5*)",
        hotelMadinah: "Anwar Al Madinah (5*)",
        hotelTurki: "Hilton Istanbul (5*)",
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
        travelId: 3, // Maktour
        price: 45000000,
        duration: 30,
        rating: 5.0,
        reviewCount: 15,
        departureDate: new Date("2024-03-10"),
        hotelMakkah: "Fairmont Makkah (5*)",
        hotelMadinah: "Oberoi Madinah (5*)",
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
        travelId: 4, // Patuna
        price: 28000000,
        duration: 9,
        rating: 4.7,
        reviewCount: 88,
        departureDate: new Date("2024-05-05"),
        hotelMakkah: "Le Meridien (5*)",
        hotelMadinah: "Al Haram (4*)",
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
        travelId: 5, // Cahaya Kaabah
        price: 21500000,
        duration: 10,
        rating: 4.3,
        reviewCount: 20,
        departureDate: new Date("2024-06-12"),
        hotelMakkah: "Hotel Bintang 3 (Jarak 500m)",
        hotelMadinah: "Hotel Bintang 3 (Jarak 300m)",
        airlines: "Lion Air",
        image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=600&auto=format&fit=crop",
        highlights: ["Harga Sangat Terjangkau", "Cocok untuk Milenial", "Semi Mandiri"],
        itinerary: Array(10).fill({ day: 1, title: "Umroh Mandiri", desc: "Fokus ibadah dan eksplorasi mandiri." }),
        facilities: ["Tiket & Visa", "Hotel Quad", "Makan Box"],
        terms: ["Usia max 45 tahun"]
    }
];

const promos = [
    {
        id: 1,
        title: "Flash Sale Umroh Akhir Tahun",
        discount: "Diskon 2 Juta",
        code: "FLASHDEC",
        endDate: new Date("2024-12-31T23:59:59"),
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=600&auto=format&fit=crop",
        description: "Hemat hingga 2 juta rupiah khusus pendaftaran bulan ini."
    },
    {
        id: 2,
        title: "Early Bird Ramadhan 2025",
        discount: "Cashback 1.5 Juta",
        code: "RAMADHAN25",
        endDate: new Date("2024-11-30T23:59:59"),
        image: "https://images.unsplash.com/photo-1551041777-ed02bed788a6?q=80&w=600&auto=format&fit=crop",
        description: "Booking lebih awal, harga lebih hemat untuk Umroh Ramadhan."
    },
    {
        id: 3,
        title: "Paket Keluarga (4 Pax)",
        discount: "Gratis Visa 1 Pax",
        code: "FAMILY4",
        endDate: new Date("2024-10-15T23:59:59"),
        image: "https://images.unsplash.com/photo-1519817650390-64a938bcd11e?q=80&w=600&auto=format&fit=crop",
        description: "Berangkat sekeluarga lebih untung dengan promo ini."
    },
    {
        id: 4,
        title: "Umroh Plus Dubai",
        discount: "Free City Tour Dubai",
        code: "DUBAIPLUS",
        endDate: new Date("2024-09-30T23:59:59"),
        image: "https://images.unsplash.com/photo-1512453979798-5ea904ac6605?q=80&w=600&auto=format&fit=crop",
        description: "Nikmati keindahan Dubai sebelum menuju Tanah Suci."
    }
];

const articles = [
    {
        id: 1,
        title: "Panduan Lengkap Tata Cara Umroh Sesuai Sunnah",
        category: "Panduan",
        date: "2024-02-10",
        image: "https://images.unsplash.com/photo-1596706059960-7a544f808f97?q=80&w=600&auto=format&fit=crop",
        excerpt: "Pelajari rukun, wajib, dan sunnah umroh agar ibadah Anda mabrur.",
        content: "Isi artikel lengkap di sini..."
    },
    {
        id: 2,
        title: "5 Tips Memilih Travel Umroh Terpercaya",
        category: "Tips",
        date: "2024-02-05",
        image: "https://images.unsplash.com/photo-1542385906-6df599026337?q=80&w=600&auto=format&fit=crop",
        excerpt: "Jangan salah pilih, pastikan travel Anda memiliki izin resmi Kemenag.",
        content: "Isi artikel lengkap di sini..."
    },
    {
        id: 3,
        title: "Persiapan Fisik Sebelum Berangkat ke Tanah Suci",
        category: "Kesehatan",
        date: "2024-01-28",
        image: "https://images.unsplash.com/photo-1571216528760-496660b370e5?q=80&w=600&auto=format&fit=crop",
        excerpt: "Jaga stamina agar ibadah lancar. Simak tips olahraga ringan sebelum berangkat.",
        content: "Isi artikel lengkap di sini..."
    }
];

const faqData = [
    {
        id: 1,
        question: "Apa saja syarat pendaftaran Umroh?",
        answer: "Syarat umum meliputi paspor yang masih berlaku minimal 7 bulan, suntik vaksin meningitis, pas foto berwarna 4x6, dan buku nikah bagi suami istri."
    },
    {
        id: 2,
        question: "Berapa lama proses pembuatan Visa Umroh?",
        answer: "Proses visa umroh biasanya memakan waktu 3-5 hari kerja setelah dokumen lengkap diterima oleh pihak travel."
    },
    {
        id: 3,
        question: "Apakah bisa request hotel atau maskapai tertentu?",
        answer: "Bisa, namun akan disesuaikan dengan ketersediaan dan mungkin ada penyesuaian harga paket (upgrade)."
    }
];

const reviews = [
    {
        id: 1,
        name: "H. Ahmad Junaedi",
        role: "Jamaah Umroh",
        rating: 5,
        comment: "Alhamdulillah sangat puas dengan pelayanan Shafira Travel. Hotelnya dekat sekali dengan Masjidil Haram.",
        date: "2024-01-20",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        id: 2,
        name: "Hj. Siti Aminah",
        role: "Jamaah Umroh Plus Turki",
        rating: 5,
        comment: "Perjalanan yang luar biasa! Tour leadernya sangat membantu dan ramah. Makanan juga enak-enak.",
        date: "2024-02-05",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    }
];

async function main() {
    console.log('Start seeding ...');

    // Seed Travels
    for (const travel of travels) {
        await prisma.travelAgent.upsert({
            where: { id: travel.id },
            update: {},
            create: travel,
        });
    }

    // Seed Packages
    for (const pkg of packages) {
        await prisma.package.upsert({
            where: { id: pkg.id },
            update: {},
            create: pkg,
        });
    }

    // Seed Promos
    for (const promo of promos) {
        await prisma.promo.upsert({
            where: { id: promo.id },
            update: {},
            create: promo,
        });
    }

    // Seed Articles
    for (const article of articles) {
        await prisma.article.upsert({
            where: { id: article.id },
            update: {},
            create: article,
        });
    }

    // Seed FAQs
    for (const faq of faqData) {
        await prisma.faq.upsert({
            where: { id: faq.id },
            update: {},
            create: faq,
        });
    }

    // Seed Reviews
    for (const review of reviews) {
        await prisma.review.upsert({
            where: { id: review.id },
            update: {},
            create: review,
        });
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
