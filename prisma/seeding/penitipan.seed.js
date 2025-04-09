import { prismaClient } from "../../src/application/database.js";
import { logger } from "../../src/application/logging.js";

const listPenitipan = [
  {
    id_penitipan: 1,
    tanggal_masuk: new Date("2024-01-15T09:00:00"),
    tanggal_akhir: new Date("2024-02-14T09:00:00"),
    tanggal_laku: null,
    batas_ambil: new Date("2024-02-21T09:00:00"),
    is_perpanjang: false,
    id_penitip: 1,
    id_hunter: 10,
    id_pegawai_qc: 4,
  },
  {
    id_penitipan: 2,
    tanggal_masuk: new Date("2024-03-01T13:30:00"),
    tanggal_akhir: new Date("2024-04-30T13:30:00"),
    tanggal_laku: null,
    batas_ambil: new Date("2024-05-07T13:30:00"),
    is_perpanjang: true,
    id_penitip: 2,
    id_hunter: null,
    id_pegawai_qc: 5,
  },
  {
    id_penitipan: 3,
    tanggal_masuk: new Date("2023-12-10T08:15:00"),
    tanggal_akhir: new Date("2024-01-09T08:15:00"),
    tanggal_laku: null,
    batas_ambil: new Date("2024-01-16T08:15:00"),
    is_perpanjang: false,
    id_penitip: 3,
    id_hunter: 11,
    id_pegawai_qc: 12,
  },
  {
    id_penitipan: 4,
    tanggal_masuk: new Date("2024-06-20T14:45:00"),
    tanggal_akhir: new Date("2024-08-19T14:45:00"),
    tanggal_laku: null,
    batas_ambil: new Date("2024-08-26T14:45:00"),
    is_perpanjang: true,
    id_penitip: 4,
    id_hunter: 10,
    id_pegawai_qc: 13,
  },
  {
    id_penitipan: 5,
    tanggal_masuk: new Date("2024-09-05T17:00:00"),
    tanggal_akhir: new Date("2024-10-05T17:00:00"),
    tanggal_laku: null,
    batas_ambil: new Date("2024-10-12T17:00:00"),
    is_perpanjang: false,
    id_penitip: 5,
    id_hunter: null,
    id_pegawai_qc: 5,
  },
  {
    id_penitipan: 6,
    tanggal_masuk: new Date("2024-11-11T11:30:00"),
    tanggal_akhir: new Date("2025-01-10T11:30:00"),
    tanggal_laku: null,
    batas_ambil: new Date("2025-01-17T11:30:00"),
    is_perpanjang: true,
    id_penitip: 6,
    id_hunter: 11,
    id_pegawai_qc: 4,
  },
  {
    id_penitipan: 7,
    tanggal_masuk: new Date("2023-10-22T07:20:00"),
    tanggal_akhir: new Date("2023-11-21T07:20:00"),
    tanggal_laku: null,
    batas_ambil: new Date("2023-11-28T07:20:00"),
    is_perpanjang: false,
    id_penitip: 7,
    id_hunter: 10,
    id_pegawai_qc: 13,
  },
  {
    id_penitipan: 8,
    tanggal_masuk: new Date("2024-04-10T10:10:00"),
    tanggal_akhir: new Date("2024-06-09T10:10:00"),
    tanggal_laku: null,
    batas_ambil: new Date("2024-06-16T10:10:00"),
    is_perpanjang: true,
    id_penitip: 8,
    id_hunter: null,
    id_pegawai_qc: 12,
  },
  {
    id_penitipan: 9,
    tanggal_masuk: new Date("2024-08-08T15:00:00"),
    tanggal_akhir: new Date("2024-09-07T15:00:00"),
    tanggal_laku: null,
    batas_ambil: new Date("2024-09-14T15:00:00"),
    is_perpanjang: false,
    id_penitip: 9,
    id_hunter: 11,
    id_pegawai_qc: 5,
  },
  {
    id_penitipan: 10,
    tanggal_masuk: new Date("2024-05-25T16:40:00"),
    tanggal_akhir: new Date("2024-07-24T16:40:00"),
    tanggal_laku: null,
    batas_ambil: new Date("2024-07-31T16:40:00"),
    is_perpanjang: true,
    id_penitip: 10,
    id_hunter: 10,
    id_pegawai_qc: 4,
  },
];

// id_penitipan Int @id @default(autoincrement())
// tanggal_masuk DateTime @default(now()) // tambah default now
// tanggal_akhir DateTime
// tanggal_laku DateTime? // ini dijadikan bisa null
// batas_ambil DateTime
// is_perpanjang Boolean @default(false) // awalnya isPerpanjang
// id_penitip Int // ini integer
// id_hunter Int? // ini dijadikan bisa null
// id_pegawai_qc Int // ini integer

export async function penitipanSeeding() {
  await prismaClient.penitipan.createMany({
    data: listPenitipan,
  });
}

penitipanSeeding()
  .then(() => {
    logger.info("Berhasil menambahkan seluruh seeding penitipan");
  })
  .catch((e) => {
    logger.info(e);
    process.exit(1);
  })
  .finally(() => {
    prismaClient.$disconnect();
  });
