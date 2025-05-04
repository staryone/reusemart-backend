const listDetailTransaksi = [
  {
    id_dtl_transaksi: 1,
    id_barang: 2,
    id_transaksi: 1,
    poin: 0,
  },
  {
    id_dtl_transaksi: 2,
    id_barang: 1,
    id_transaksi: 2,
    poin: 0,
  },
  {
    id_dtl_transaksi: 3,
    id_barang: 3,
    id_transaksi: 2,
    poin: 0,
  },
  {
    id_dtl_transaksi: 4,
    id_barang: 6,
    id_transaksi: 3,
    poin: 0,
  },
  {
    id_dtl_transaksi: 5,
    id_barang: 8,
    id_transaksi: 4,
    poin: 0,
    is_rating: true,
  },
  {
    id_dtl_transaksi: 6,
    id_barang: 4,
    id_transaksi: 5,
    poin: 0,
    is_rating: true,
  },
  {
    id_dtl_transaksi: 7,
    id_barang: 5,
    id_transaksi: 5,
    poin: 0,
    is_rating: true,
  },
  {
    id_dtl_transaksi: 8,
    id_barang: 10,
    poin: 0,
    id_transaksi: 6,
  },
  {
    id_dtl_transaksi: 9,
    id_barang: 15,
    poin: 0,
    id_transaksi: 7,
  },
  {
    id_dtl_transaksi: 10,
    id_barang: 12,
    poin: 0,
    id_transaksi: 8,
  },
  {
    id_dtl_transaksi: 11,
    id_barang: 7,
    poin: 0,
    id_transaksi: 9,
  },
  {
    id_dtl_transaksi: 12,
    id_barang: 9,
    poin: 0,
    id_transaksi: 9,
  },
  {
    id_dtl_transaksi: 13,
    id_barang: 13,
    poin: 0,
    id_transaksi: 10,
  },
  {
    id_dtl_transaksi: 14,
    id_barang: 14,
    poin: 0,
    id_transaksi: 11,
  },
  {
    id_dtl_transaksi: 15,
    id_barang: 11,
    poin: 0,
    id_transaksi: 12,
  },
  {
    id_dtl_transaksi: 16,
    id_barang: 16,
    poin: 0,
    id_transaksi: 12,
  },
  {
    id_dtl_transaksi: 17,
    id_barang: 17,
    poin: 0,
    id_transaksi: 13,
  },
  {
    id_dtl_transaksi: 18,
    id_barang: 18,
    poin: 0,
    id_transaksi: 13,
  },
  {
    id_dtl_transaksi: 19,
    id_barang: 19,
    poin: 0,
    id_transaksi: 14,
  },
  {
    id_dtl_transaksi: 20,
    id_barang: 20,
    poin: 0,
    id_transaksi: 14,
  },
  {
    id_dtl_transaksi: 21,
    id_barang: 33,
    poin: 0,
    id_transaksi: 15,
  },
  {
    id_dtl_transaksi: 22,
    id_barang: 34,
    id_transaksi: 16,
    poin: 0,
    is_rating: true,
  },
  {
    id_dtl_transaksi: 23,
    id_barang: 35,
    id_transaksi: 17,
    poin: 0,
  },
  {
    id_dtl_transaksi: 24,
    id_barang: 36,
    id_transaksi: 18,
    poin: 0,
  },
  {
    id_dtl_transaksi: 25,
    id_barang: 41,
    id_transaksi: 19,
    poin: 0,
  },
];

export async function detailTransaksiSeeding(prismaClient) {
  await prismaClient.detailTransaksi.createMany({
    data: listDetailTransaksi,
  });
}
