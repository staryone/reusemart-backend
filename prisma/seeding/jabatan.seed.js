const listJabatan = [
    {
        id_jabatan: 1,
        nama_jabatan: "Owner",
    },
    {
        id_jabatan: 2,
        nama_jabatan: "Admin",
    },
    {
        id_jabatan: 3,
        nama_jabatan: "Gudang",
    },
    {
        id_jabatan: 4,
        nama_jabatan: "CS",
    },
    {
        id_jabatan: 5,
        nama_jabatan: "Kurir",
    },
    {
        id_jabatan: 6,
        nama_jabatan: "Hunter",
    },
];

export async function jabatanSeeding(prismaClient) {
    await prismaClient.jabatan.createMany({
        data: listJabatan,
    });
}
