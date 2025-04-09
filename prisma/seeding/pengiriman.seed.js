const listPengiriman = [
  {
    id_pengiriman: 1,
    tanggal: new Date("2025-04-12T15:45:00"),
    status_pengiriman: "SEDANG_DIKIRIM",
    id_kurir: 8,
    id_alamat: 9,
    id_transaksi: 3,
  },
  {
    id_pengiriman: 2,
    tanggal: new Date("2025-04-13T13:00:00"),
    status_pengiriman: "SUDAH_DITERIMA",
    id_kurir: null,
    id_alamat: null,
    id_transaksi: 4,
  },
  {
    id_pengiriman: 3,
    tanggal: new Date("2025-04-14T15:15:00"),
    status_pengiriman: "SUDAH_DITERIMA",
    id_kurir: 9,
    id_alamat: 8,
    id_transaksi: 5,
  },
  {
    id_pengiriman: 4,
    tanggal: new Date("2025-04-20T10:10:00"),
    status_pengiriman: "SIAP_DIAMBIL",
    id_kurir: null,
    id_alamat: null,
    id_transaksi: 11,
  },
  {
    id_pengiriman: 5,
    tanggal: null,
    status_pengiriman: "DIPROSES",
    id_kurir: null,
    id_alamat: null,
    id_transaksi: 1,
  },
  {
    id_pengiriman: 6,
    tanggal: new Date("2025-04-11T11:15:00"),
    status_pengiriman: "SIAP_DIAMBIL",
    id_kurir: null,
    id_alamat: null,
    id_transaksi: 2,
  },
  {
    id_pengiriman: 7,
    tanggal: new Date("2025-04-16T12:30:00"),
    status_pengiriman: "SEDANG_DIKIRIM",
    id_kurir: 9,
    id_alamat: 10,
    id_transaksi: 7,
  },
  {
    id_pengiriman: 8,
    tanggal: new Date("2025-04-18T16:00:00"),
    status_pengiriman: "SEDANG_DIKIRIM",
    id_kurir: 8,
    id_alamat: 16,
    id_transaksi: 9,
  },
  {
    id_pengiriman: 9,
    tanggal: null,
    status_pengiriman: "DIPROSES",
    id_kurir: null,
    id_alamat: 18,
    id_transaksi: 10,
  },
  {
    id_pengiriman: 10,
    tanggal: new Date("2025-04-23T10:00:00"),
    status_pengiriman: "SIAP_DIAMBIL",
    id_kurir: null,
    id_alamat: null,
    id_transaksi: 12,
  },
];

export async function pengirimanSeeding(prismaClient) {
  await prismaClient.pengiriman.createMany({
    data: listPengiriman,
  });
}
