const listKategori = [
    { id_kategori: 1, nama_kategori: "Elektronik & Gadget" },
    { id_kategori: 2, nama_kategori: "Pakaian & Aksesori" },
    { id_kategori: 3, nama_kategori: "Perabotan Rumah Tangga" },
    { id_kategori: 4, nama_kategori: "Buku, Alat Tulis, & Peralatan Sekolah" },
    { id_kategori: 5, nama_kategori: "Hobi, Mainan, & Koleksi" },
    { id_kategori: 6, nama_kategori: "Perlengkapan Bayi & Anak" },
    { id_kategori: 7, nama_kategori: "Otomotif & Aksesori" },
    { id_kategori: 8, nama_kategori: "Perlengkapan Taman & Outdoor" },
    { id_kategori: 9, nama_kategori: "Peralatan Kantor & Industri" },
    { id_kategori: 10, nama_kategori: "Kosmetik & Perawatan Diri" },
];

export async function kategoriSeeding(prismaClient) {
    await prismaClient.kategori.createMany({
        data: listKategori,
    });
}
