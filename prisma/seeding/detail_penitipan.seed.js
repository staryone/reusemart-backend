const listDetailPenitipan = [
  {
    id_dtl_penitipan: 1,
    id_penitipan: 1,
    id_barang: 1,
  },
  {
    id_dtl_penitipan: 2,
    id_penitipan: 2,
    id_barang: 2,
  },
  {
    id_dtl_penitipan: 3,
    id_penitipan: 3,
    id_barang: 3,
  },
  {
    id_dtl_penitipan: 4,
    id_penitipan: 4,
    id_barang: 4,
  },
  {
    id_dtl_penitipan: 5,
    id_penitipan: 5,
    id_barang: 5,
  },
  {
    id_dtl_penitipan: 6,
    id_penitipan: 6,
    id_barang: 6,
  },
  {
    id_dtl_penitipan: 7,
    id_penitipan: 7,
    id_barang: 7,
  },
  {
    id_dtl_penitipan: 8,
    id_penitipan: 8,
    id_barang: 8,
  },
  {
    id_dtl_penitipan: 9,
    id_penitipan: 9,
    id_barang: 9,
  },
  {
    id_dtl_penitipan: 10,
    id_penitipan: 10,
    id_barang: 10,
  },
  {
    id_dtl_penitipan: 11,
    id_penitipan: 1,
    id_barang: 11,
  },
  {
    id_dtl_penitipan: 12,
    id_penitipan: 2,
    id_barang: 12,
  },
  {
    id_dtl_penitipan: 13,
    id_penitipan: 3,
    id_barang: 13,
  },
  {
    id_dtl_penitipan: 14,
    id_penitipan: 3,
    id_barang: 14,
  },
  {
    id_dtl_penitipan: 15,
    id_penitipan: 5,
    id_barang: 15,
  },
  {
    id_dtl_penitipan: 16,
    id_penitipan: 7,
    id_barang: 16,
  },
  {
    id_dtl_penitipan: 17,
    id_penitipan: 8,
    id_barang: 17,
  },
  {
    id_dtl_penitipan: 18,
    id_penitipan: 9,
    id_barang: 18,
  },
  {
    id_dtl_penitipan: 19,
    id_penitipan: 10,
    id_barang: 19,
  },
  {
    id_dtl_penitipan: 20,
    id_penitipan: 10,
    id_barang: 20,
  },
  {
    id_dtl_penitipan: 21,
    id_penitipan: 9,
    id_barang: 31,
  },
  {
    id_dtl_penitipan: 22,
    id_penitipan: 8,
    id_barang: 32,
  },
];

export async function detailPenitipanSeeding() {
  await prismaClient.detailPenitipan.createMany({
    data: listDetailPenitipan,
  });
}

detailPenitipanSeeding()
  .then(() => {
    logger.info("Berhasil menambahkan seluruh seeding detail penitipan");
  })
  .catch((e) => {
    logger.info(e);
    process.exit(1);
  })
  .finally(() => {
    prismaClient.$disconnect();
  });
