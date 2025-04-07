import { prismaClient } from "../../src/application/database.js";
import { logger } from "../../src/application/logging.js";

const listPembeli = [
  {
    id_pembeli: "PB1",
    nama: "Alya Putri",
    nomor_telepon: "081234567890",
    poin_loyalitas: 0,
  },
  {
    id_pembeli: "PB2",
    nama: "Andi Nugroho",
    nomor_telepon: "081234567891",
    poin_loyalitas: 0,
  },
  {
    id_pembeli: "PB3",
    nama: "Siti",
    nomor_telepon: "081234567892",
    poin_loyalitas: 0,
  },
  {
    id_pembeli: "PB4",
    nama: "Budi Santoso",
    nomor_telepon: "081234567893",
    poin_loyalitas: 0,
  },
  {
    id_pembeli: "PB5",
    nama: "Dina Aulia Rahma",
    nomor_telepon: "081234567894",
    poin_loyalitas: 0,
  },
  {
    id_pembeli: "PB6",
    nama: "Rudi",
    nomor_telepon: "081234567895",
    poin_loyalitas: 0,
  },
  {
    id_pembeli: "PB7",
    nama: "Lia Kartika",
    nomor_telepon: "081234567896",
    poin_loyalitas: 0,
  },
  {
    id_pembeli: "PB8",
    nama: "Ahmad Zaki",
    nomor_telepon: "081234567897",
    poin_loyalitas: 0,
  },
  {
    id_pembeli: "PB9",
    nama: "Melati Nur Hasanah",
    nomor_telepon: "081234567898",
    poin_loyalitas: 0,
  },
  {
    id_pembeli: "PB10",
    nama: "Joko",
    nomor_telepon: "081234567899",
    poin_loyalitas: 0,
  },
];

export async function pembeliSeeding() {
  await prismaClient.pembeli.createMany({
    data: listPembeli,
  });
}

pembeliSeeding()
  .then(() => {
    logger.info("Berhasil menambahkan seluruh seeding pembeli");
  })
  .catch((e) => {
    logger.info(e);
    process.exit(1);
  })
  .finally(() => {
    prismaClient.$disconnect();
  });
