const listJabatan = [
  {
    id_jabatan: 1,
    nama_jabatan: "OWNER",
  },
  {
    id_jabatan: 2,
    nama_jabatan: "ADMIN",
  },
  {
    id_jabatan: 3,
    nama_jabatan: "GUDANG",
  },
  {
    id_jabatan: 4,
    nama_jabatan: "CS",
  },
  {
    id_jabatan: 5,
    nama_jabatan: "KURIR",
  },
  {
    id_jabatan: 6,
    nama_jabatan: "HUNTER",
  },
];

export async function jabatanSeeding(prismaClient) {
  await prismaClient.jabatan.createMany({
    data: listJabatan,
  });
}
