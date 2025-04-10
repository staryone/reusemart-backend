const listDonasi = [
    {
        id_donasi: 1,
        tanggal_donasi: new Date("2025-4-10"),
        nama_penerima: "Bu Narti",
        id_barang: 21,
        id_request: 2,
    },
    {
        id_donasi: 2,
        tanggal_donasi: new Date("2025-3-5"),
        nama_penerima: "Pak Suman",
        id_barang: 22,
        id_request: 6,
    },
    {
        id_donasi: 3,
        tanggal_donasi: new Date("2025-2-20"),
        nama_penerima: "Abhinaya",
        id_barang: 23,
        id_request: 8,
    },
    {
        id_donasi: 4,
        tanggal_donasi: new Date("2025-4-3"),
        nama_penerima: "Suki",
        id_barang: 24,
        id_request: 10,
    },
    {
        id_donasi: 5,
        tanggal_donasi: new Date("2025-4-10"),
        nama_penerima: "Bu Ningsih",
        id_barang: 25,
        id_request: 11,
    },
    {
        id_donasi: 6,
        tanggal_donasi: new Date("2025-3-5"),
        nama_penerima: "Pak Yan",
        id_barang: 26,
        id_request: 12,
    },
    {
        id_donasi: 7,
        tanggal_donasi: new Date("2025-2-20"),
        nama_penerima: "Kevin",
        id_barang: 27,
        id_request: 14,
    },
    {
        id_donasi: 8,
        tanggal_donasi: new Date("2025-4-3"),
        nama_penerima: "Niji",
        id_barang: 28,
        id_request: 15,
    },
    {
        id_donasi: 9,
        tanggal_donasi: new Date("2025-2-20"),
        nama_penerima: "Luki",
        id_barang: 29,
        id_request: 17,
    },
    {
        id_donasi: 10,
        tanggal_donasi: new Date("2025-4-3"),
        nama_penerima: "Sumira",
        id_barang: 30,
        id_request: 19,
    },
    {
        id_donasi: 11,
        tanggal_donasi: new Date("2025-04-26 09:15:30.000"),
        nama_penerima: "Pak Budi",
        id_barang: 43,
        id_request: 21,
    },
    {
        id_donasi: 12,
        tanggal_donasi: new Date("2025-04-27 13:45:00.000"),
        nama_penerima: "Ibu Sari",
        id_barang: 44,
        id_request: 22,
    },
    {
        id_donasi: 13,
        tanggal_donasi: new Date("2025-04-28 10:30:45.000"),
        nama_penerima: "Mas Joko",
        id_barang: 45,
        id_request: 23,
    },
    {
        id_donasi: 14,
        tanggal_donasi: new Date("2025-04-29 15:20:15.000"),
        nama_penerima: "Mbak Rina",
        id_barang: 46,
        id_request: 24,
    },
    {
        id_donasi: 15,
        tanggal_donasi: new Date("2025-04-30 11:50:25.000"),
        nama_penerima: "Adi",
        id_barang: 47,
        id_request: 25,
    },
];

export async function donasiSeeding(prismaClient) {
    await prismaClient.donasi.createMany({
        data: listDonasi,
    });
}
