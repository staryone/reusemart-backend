const listDiskusi = [
    {
        id_diskusi: 1,
        tanggal_diskusi: new Date("2025-04-09T09:00:00"),
        pesan: "Kaosnya ini shrink kalau dicuci gak, kak?",
        id_barang: 2,
        id_user: 20, // pembeli
    },
    {
        id_diskusi: 2,
        tanggal_diskusi: new Date("2025-04-09T09:02:00"),
        pesan: "Nggak kak, ini cotton combed jadi tetap stabil bentuknya.",
        id_barang: 2,
        id_user: 6, // penjual
    },
    {
        id_diskusi: 3,
        tanggal_diskusi: new Date("2025-04-09T09:10:00"),
        pesan: "Lampu Hello Kitty-nya masih nyala semua ya?",
        id_barang: 20,
        id_user: 17,
    },
    {
        id_diskusi: 4,
        tanggal_diskusi: new Date("2025-04-09T09:12:00"),
        pesan: "Iya kak, nyala normal. Cuma bekas aja, tapi lucu banget kok!",
        id_barang: 20,
        id_user: 14,
    },
    {
        id_diskusi: 5,
        tanggal_diskusi: new Date("2025-04-09T09:20:00"),
        pesan: "Velg mobil ini cocok untuk mobil Jazz atau nggak ya?",
        id_barang: 7,
        id_user: 22,
    },
    {
        id_diskusi: 6,
        tanggal_diskusi: new Date("2025-04-09T09:22:00"),
        pesan: "Cocok kak, Ring 15 biasa dipakai di mobil Jazz juga.",
        id_barang: 7,
        id_user: 7,
    },
    {
        id_diskusi: 7,
        tanggal_diskusi: new Date("2025-04-09T09:25:00"),
        pesan: "Gitar Yamaha ini bisa dipasang senar nylon gak?",
        id_barang: 17,
        id_user: 23,
    },
    {
        id_diskusi: 8,
        tanggal_diskusi: new Date("2025-04-09T09:28:00"),
        pesan: "Bisa kak, tapi sebaiknya pakai string steel untuk suara optimal.",
        id_barang: 17,
        id_user: 15,
    },
    {
        id_diskusi: 9,
        tanggal_diskusi: new Date("2025-04-09T09:30:00"),
        pesan: "Tas ranselnya tahan air nggak ya kak?",
        id_barang: 14,
        id_user: 19,
    },
    {
        id_diskusi: 10,
        tanggal_diskusi: new Date("2025-04-09T09:32:00"),
        pesan: "Lumayan tahan cipratan kak, tapi nggak waterproof 100%.",
        id_barang: 14,
        id_user: 6,
    },
    {
        id_diskusi: 11,
        tanggal_diskusi: new Date("2025-04-09T09:35:00"),
        pesan: "Jaket Uniqlo ini ukurannya berapa kak?",
        id_barang: 18,
        id_user: 25,
    },
    {
        id_diskusi: 12,
        tanggal_diskusi: new Date("2025-04-09T09:37:00"),
        pesan: "Ukuran L kak, fit untuk badan tinggi 170-180cm.",
        id_barang: 18,
        id_user: 7,
    },
    {
        id_diskusi: 13,
        tanggal_diskusi: new Date("2025-04-09T09:40:00"),
        pesan: "Komik One Piece ini edisi cetakan tahun berapa ya?",
        id_barang: 19,
        id_user: 21,
    },
    {
        id_diskusi: 14,
        tanggal_diskusi: new Date("2025-04-09T09:42:00"),
        pesan: "Cetakan 2012 kak, masih utuh dan bersih halamannya.",
        id_barang: 19,
        id_user: 14,
    },
    {
        id_diskusi: 15,
        tanggal_diskusi: new Date("2025-04-09T09:45:00"),
        pesan: "Meja belajar kayunya lapis HPL atau full solid kak?",
        id_barang: 16,
        id_user: 18,
    },
    {
        id_diskusi: 16,
        tanggal_diskusi: new Date("2025-04-09T09:47:00"),
        pesan: "Full solid kak, ringan tapi kuat. Cocok buat anak-anak.",
        id_barang: 16,
        id_user: 15,
    },
    {
        id_diskusi: 17,
        tanggal_diskusi: new Date("2025-04-09T09:50:00"),
        pesan: "Panci stainless-nya aman buat kompor induksi gak?",
        id_barang: 15,
        id_user: 24,
    },
    {
        id_diskusi: 18,
        tanggal_diskusi: new Date("2025-04-09T09:51:00"),
        pesan: "Aman kak, sudah saya pakai di induksi juga.",
        id_barang: 15,
        id_user: 6,
    },
    {
        id_diskusi: 19,
        tanggal_diskusi: new Date("2025-04-09T09:55:00"),
        pesan: "Buku Laskar Pelangi-nya masih segel ya?",
        id_barang: 4,
        id_user: 16,
    },
    {
        id_diskusi: 20,
        tanggal_diskusi: new Date("2025-04-09T09:56:00"),
        pesan: "Iya kak, masih segel plastik dari toko.",
        id_barang: 4,
        id_user: 7,
    },
];

export async function diskusiSeeding(prismaClient) {
    await prismaClient.diskusi.createMany({
        data: listDiskusi,
    });
}
