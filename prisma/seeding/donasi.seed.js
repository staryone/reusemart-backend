import { prismaClient } from "../../src/application/database.js";
import { logger } from "../../src/application/logging.js";

const listDonasi = [
  {
    id_donasi: 1,
    tanggal_donasi: new Date("2025-4-10"),
    nama_penerima: "Bu Narti",
    id_barang: 21,
    id_request: 2
  },
  {
    id_donasi: 2,
    tanggal_donasi: new Date("2025-3-5"),
    nama_penerima: "Pak Suman",
    id_barang: 22,
    id_request: 6
  },
  {
    id_donasi: 3,
    tanggal_donasi: new Date("2025-2-20"),
    nama_penerima: "Abhinaya",
    id_barang: 23,
    id_request: 8
  },
  {
    id_donasi: 4,
    tanggal_donasi: new Date("2025-4-3"),
    nama_penerima: "Suki",
    id_barang: 24,
    id_request: 10
  },
  {
    id_donasi: 5,
    tanggal_donasi: new Date("2025-4-10"),
    nama_penerima: "Bu Ningsih",
    id_barang: 25,
    id_request: 11
  },
  {
    id_donasi: 6,
    tanggal_donasi: new Date("2025-3-5"),
    nama_penerima: "Pak Yan",
    id_barang: 26,
    id_request: 12
  },
  {
    id_donasi: 7,
    tanggal_donasi: new Date("2025-2-20"),
    nama_penerima: "Kevin",
    id_barang: 27,
    id_request: 14
  },
  {
    id_donasi: 8,
    tanggal_donasi: new Date("2025-4-3"),
    nama_penerima: "Niji",
    id_barang: 28,
    id_request: 15
  },
  {
    id_donasi: 9,
    tanggal_donasi: new Date("2025-2-20"),
    nama_penerima: "Luki",
    id_barang: 29,
    id_request: 17
  },
  {
    id_donasi: 10,
    tanggal_donasi: new Date("2025-4-3"),
    nama_penerima: "Sumira",
    id_barang: 30,
    id_request: 19
  },
];

export async function donasiSeeding() {
  await prismaClient.donasi.createMany({
    data: listDonasi,
  });
}

donasiSeeding()
  .then(() => {
    logger.info("Berhasil menambahkan seluruh seeding donasi");
  })
  .catch((e) => {
    logger.info(e);
    process.exit(1);
  })
  .finally(() => {
    prismaClient.$disconnect();
  });
