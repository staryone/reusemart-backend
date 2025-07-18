const listPembeli = [
    {
        id_pembeli: 1,
        id_user: 16,
        nama: "Alya Putri",
        nomor_telepon: "081234567890",
        poin_loyalitas: 470,
    },
    {
        id_pembeli: 2,
        id_user: 17,
        nama: "Andi Nugroho",
        nomor_telepon: "081234567891",
        poin_loyalitas: 500,
    },
    {
        id_pembeli: 3,
        id_user: 18,
        nama: "Siti",
        nomor_telepon: "081234567892",
        poin_loyalitas: 465,
    },
    {
        id_pembeli: 4,
        id_user: 19,
        nama: "Budi Santoso",
        nomor_telepon: "081234567893",
        poin_loyalitas: 120,
    },
    {
        id_pembeli: 5,
        id_user: 20,
        nama: "Dina Aulia Rahma",
        nomor_telepon: "081234567894",
        poin_loyalitas: 1200,
    },
    {
        id_pembeli: 6,
        id_user: 21,
        nama: "Rudi",
        nomor_telepon: "081234567895",
        poin_loyalitas: 450,
    },
    {
        id_pembeli: 7,
        id_user: 22,
        nama: "Lia Kartika",
        nomor_telepon: "081234567896",
        poin_loyalitas: 650,
    },
    {
        id_pembeli: 8,
        id_user: 23,
        nama: "Ahmad Zaki",
        nomor_telepon: "081234567897",
        poin_loyalitas: 775,
    },
    {
        id_pembeli: 9,
        id_user: 24,
        nama: "Melati Nur Hasanah",
        nomor_telepon: "081234567898",
        poin_loyalitas: 410,
    },
    {
        id_pembeli: 10,
        id_user: 25,
        nama: "Joko",
        nomor_telepon: "081234567899",
        poin_loyalitas: 1140,
    },
    {
        id_pembeli: 11,
        nama: "Sarah Wijaya",
        nomor_telepon: "081234567900",
        poin_loyalitas: 300,
        id_user: 46,
    },
    {
        id_pembeli: 12,
        nama: "Hendri Pratama",
        nomor_telepon: "081234567901",
        poin_loyalitas: 250,
        id_user: 47,
    },
    {
        id_pembeli: 13,
        nama: "Nur Halimah",
        nomor_telepon: "081234567902",
        poin_loyalitas: 400,
        id_user: 48,
    },
    {
        id_pembeli: 14,
        nama: "Lestari Indah",
        nomor_telepon: "081234567903",
        poin_loyalitas: 150,
        id_user: 57,
    },
    {
        id_pembeli: 15,
        nama: "Rina Permata",
        nomor_telepon: "081234567904",
        poin_loyalitas: 200,
        id_user: 58,
    },
];

export async function pembeliSeeding(prismaClient) {
    await prismaClient.pembeli.createMany({
        data: listPembeli,
    });
}
