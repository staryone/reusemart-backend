import { prismaClient } from "../../src/application/database.js";
import { logger } from "../../src/application/logging.js";

const listPegawai = [
  {
    id_pegawai: "P1",
    nama: "Frendy",
    nomor_telepon: "081221282818",
    komisi: 0,
    tgl_lahir: new Date("1999-10-10"),
    id_jabatan: 1,
  },
  {
    id_pegawai: "P2",
    nama: "Alexander Fabian",
    nomor_telepon: "081321282817",
    komisi: 0,
    tgl_lahir: new Date("2000-08-22"),
    id_jabatan: 2,
  },
  {
    id_pegawai: "P3",
    nama: "Stanyslaus Hary",
    nomor_telepon: "081411282816",
    komisi: 0,
    tgl_lahir: new Date("2000-07-12"),
    id_jabatan: 2,
  },
  {
    id_pegawai: "P4",
    nama: "Sukarjo Maja",
    nomor_telepon: "081521282810",
    komisi: 0,
    tgl_lahir: new Date("2001-08-12"),
    id_jabatan: 3,
  },
  {
    id_pegawai: "P5",
    nama: "Eni Manari",
    nomor_telepon: "081721282815",
    komisi: 0,
    tgl_lahir: new Date("2000-09-11"),
    id_jabatan: 3,
  },
  {
    id_pegawai: "P6",
    nama: "Putri Sakoju",
    nomor_telepon: "081821282814",
    komisi: 0,
    tgl_lahir: new Date("2002-10-14"),
    id_jabatan: 4,
  },
  {
    id_pegawai: "P7",
    nama: "Dewi Sekira",
    nomor_telepon: "082211282813",
    komisi: 0,
    tgl_lahir: new Date("2004-02-28"),
    id_jabatan: 4,
  },
  {
    id_pegawai: "P8",
    nama: "Ahmad Jaya",
    nomor_telepon: "081621282112",
    komisi: 0,
    tgl_lahir: new Date("2000-11-13"),
    id_jabatan: 5,
  },
  {
    id_pegawai: "P9",
    nama: "Fauzan Iman",
    nomor_telepon: "082121282119",
    komisi: 0,
    tgl_lahir: new Date("2001-10-14"),
    id_jabatan: 5,
  },
  {
    id_pegawai: "P10",
    nama: "Hugo Palimasada",
    nomor_telepon: "081521282122",
    komisi: 0,
    tgl_lahir: new Date("2004-04-24"),
    id_jabatan: 6,
  },
  {
    id_pegawai: "P11",
    nama: "Indah Pertiwi",
    nomor_telepon: "082322282142",
    komisi: 0,
    tgl_lahir: new Date("2004-06-17"),
    id_jabatan: 6,
  },
];

export async function pegawaiSeeding() {
  await prismaClient.pegawai.createMany({
    data: listPegawai,
  });
}

pegawaiSeeding()
  .then(() => {
    logger.info("Berhasil menambahkan seluruh seeding pegawai");
  })
  .catch((e) => {
    logger.info(e);
    process.exit(1);
  })
  .finally(() => {
    prismaClient.$disconnect();
  });
