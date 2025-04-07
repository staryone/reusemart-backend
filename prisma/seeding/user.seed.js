import { prismaClient } from "../../src/application/database.js";
import { logger } from "../../src/application/logging.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const listUser = [
  [
    {
      email: "frendy@reusemart.my.id",
      password: bcrypt.hash("10101999", 10),
      role: "PEGAWAI",
      token: uuid().toString(),
      id_referensi: "P1",
    },
    {
      email: "alexanderfabian@reusemart.my.id",
      password: bcrypt.hash("22082000", 10),
      role: "PEGAWAI",
      token: uuid().toString(),
      id_referensi: "P2",
    },
    {
      email: "stanyslaushary@reusemart.my.id",
      password: bcrypt.hash("12072000", 10),
      role: "PEGAWAI",
      token: uuid().toString(),
      id_referensi: "P3",
    },
    {
      email: "sukarjomaja@reusemart.my.id",
      password: bcrypt.hash("12082001", 10),
      role: "PEGAWAI",
      token: uuid().toString(),
      id_referensi: "P4",
    },
    {
      email: "enimanari@reusemart.my.id",
      password: bcrypt.hash("11092000", 10),
      role: "PEGAWAI",
      token: uuid().toString(),
      id_referensi: "P5",
    },
    {
      email: "putrisakoju@reusemart.my.id",
      password: bcrypt.hash("14102002", 10),
      role: "PEGAWAI",
      token: uuid().toString(),
      id_referensi: "P6",
    },
    {
      email: "dewisekira@reusemart.my.id",
      password: bcrypt.hash("28022004", 10),
      role: "PEGAWAI",
      token: uuid().toString(),
      id_referensi: "P7",
    },
    {
      email: "ahmadjaya@reusemart.my.id",
      password: bcrypt.hash("13112000", 10),
      role: "PEGAWAI",
      token: uuid().toString(),
      id_referensi: "P8",
    },
    {
      email: "fauzaniman@reusemart.my.id",
      password: bcrypt.hash("14102001", 10),
      role: "PEGAWAI",
      token: uuid().toString(),
      id_referensi: "P9",
    },
    {
      email: "hugopalimasada@reusemart.my.id",
      password: bcrypt.hash("24042004", 10),
      role: "PEGAWAI",
      token: uuid().toString(),
      id_referensi: "P10",
    },
    {
      email: "alyaputri@gmail.com",
      password: bcrypt.hash("alyaputri", 10),
      role: "PEMBELI",
      token: uuid().toString(),
      id_referensi: "PB1",
    },
    {
      email: "andinugroho@yahoo.com",
      password: bcrypt.hash("andinugroho", 10),
      role: "PEMBELI",
      token: uuid().toString(),
      id_referensi: "PB2",
    },
    {
      email: "siti@outlook.com",
      password: bcrypt.hash("siti", 10),
      role: "PEMBELI",
      token: uuid().toString(),
      id_referensi: "PB3",
    },
    {
      email: "budisantoso@hotmail.com",
      password: bcrypt.hash("budisantoso", 10),
      role: "PEMBELI",
      token: uuid().toString(),
      id_referensi: "PB4",
    },
    {
      email: "dinaauliarahma@gmail.com",
      password: bcrypt.hash("dinaauliarahma", 10),
      role: "PEMBELI",
      token: uuid().toString(),
      id_referensi: "PB5",
    },
    {
      email: "rudi@gmail.com",
      password: bcrypt.hash("rudi", 10),
      role: "PEMBELI",
      token: uuid().toString(),
      id_referensi: "PB6",
    },
    {
      email: "liakartika@yahoo.com",
      password: bcrypt.hash("liakartika", 10),
      role: "PEMBELI",
      token: uuid().toString(),
      id_referensi: "PB7",
    },
    {
      email: "ahmadzaki@outlook.com",
      password: bcrypt.hash("ahmadzaki", 10),
      role: "PEMBELI",
      token: uuid().toString(),
      id_referensi: "PB8",
    },
    {
      email: "melatinurhasanah@gmail.com",
      password: bcrypt.hash("melatinurhasanah", 10),
      role: "PEMBELI",
      token: uuid().toString(),
      id_referensi: "PB9",
    },
    {
      email: "joko@hotmail.com",
      password: bcrypt.hash("joko", 10),
      role: "PEMBELI",
      token: uuid().toString(),
      id_referensi: "PB10",
    },
    {
      email: "jokosantoso@gmail.com",
      password: bcrypt.hash("jokosantoso", 10),
      role: "PENITIP",
      token: uuid().toString(),
      id_referensi: "T1",
    },
    {
      email: "sitiaminah@yahoo.com",
      password: bcrypt.hash("sitiaminah", 10),
      role: "PENITIP",
      token: uuid().toString(),
      id_referensi: "T2",
    },
    {
      email: "budihartono@outlook.com",
      password: bcrypt.hash("budihartono", 10),
      role: "PENITIP",
      token: uuid().toString(),
      id_referensi: "T3",
    },
    {
      email: "rinawulandari@gmail.com",
      password: bcrypt.hash("rinawulandari", 10),
      role: "PENITIP",
      token: uuid().toString(),
      id_referensi: "T4",
    },
    {
      email: "ahmadyani@hotmail.com",
      password: bcrypt.hash("ahmadyani", 10),
      role: "PENITIP",
      token: uuid().toString(),
      id_referensi: "T5",
    },
    {
      email: "dewilestari@yahoo.com",
      password: bcrypt.hash("dewilestari", 10),
      role: "PENITIP",
      token: uuid().toString(),
      id_referensi: "T6",
    },
    {
      email: "ekoprasetyo@gmail.com",
      password: bcrypt.hash("ekoprasetyo", 10),
      role: "PENITIP",
      token: uuid().toString(),
      id_referensi: "T7",
    },
    {
      email: "linamarlina@outlook.com",
      password: bcrypt.hash("linamarlina", 10),
      role: "PENITIP",
      token: uuid().toString(),
      id_referensi: "T8",
    },
    {
      email: "fajarnugroho@gmail.com",
      password: bcrypt.hash("fajarnugroho", 10),
      role: "PENITIP",
      token: uuid().toString(),
      id_referensi: "T9",
    },
    {
      email: "tinasusanti@gmail.com",
      password: bcrypt.hash("tinasusanti", 10),
      role: "PENITIP",
      token: uuid().toString(),
      id_referensi: "T10",
    },
    {
      email: "yayasandharmabakti@gmail.com",
      password: bcrypt.hash("yayasandharmabakti", 10),
      role: "ORGANISASI",
      token: uuid().toString(),
      id_referensi: "ORG1",
    },
    {
      email: "lembagacintakasih@yahoo.com",
      password: bcrypt.hash("lembagacintakasih", 10),
      role: "ORGANISASI",
      token: uuid().toString(),
      id_referensi: "ORG2",
    },
    {
      email: "forumhijauindonesia@outlook.com",
      password: bcrypt.hash("forumhijauindonesia", 10),
      role: "ORGANISASI",
      token: uuid().toString(),
      id_referensi: "ORG3",
    },
    {
      email: "komunitaspedulipendidikan@gmail.com",
      password: bcrypt.hash("komunitaspedulipendidikan", 10),
      role: "ORGANISASI",
      token: uuid().toString(),
      id_referensi: "ORG4",
    },
    {
      email: "baktisosialnusantara@gmail.com",
      password: bcrypt.hash("baktisosialnusantara", 10),
      role: "ORGANISASI",
      token: uuid().toString(),
      id_referensi: "ORG5",
    },
    {
      email: "relawantanggapdarurat@yahoo.com",
      password: bcrypt.hash("relawantanggapdarurat", 10),
      role: "ORGANISASI",
      token: uuid().toString(),
      id_referensi: "ORG6",
    },
    {
      email: "gerakandonordarah@gmail.com",
      password: bcrypt.hash("gerakandonordarah", 10),
      role: "ORGANISASI",
      token: uuid().toString(),
      id_referensi: "ORG7",
    },
    {
      email: "sahabatlansia@outlook.com",
      password: bcrypt.hash("sahabatlansia", 10),
      role: "ORGANISASI",
      token: uuid().toString(),
      id_referensi: "ORG8",
    },
    {
      email: "rumahharapan@gmail.com",
      password: bcrypt.hash("rumahharapan", 10),
      role: "ORGANISASI",
      token: uuid().toString(),
      id_referensi: "ORG9",
    },
    {
      email: "pemudaberkarya@gmail.com",
      password: bcrypt.hash("pemudaberkarya", 10),
      role: "ORGANISASI",
      token: uuid().toString(),
      id_referensi: "ORG10",
    },
  ],
];

export async function userSeeding() {
  await prismaClient.user.createMany({
    data: listUser,
  });
}

userSeeding()
  .then(() => {
    logger.info("Berhasil menambahkan seluruh seeding user");
  })
  .catch((e) => {
    logger.info(e);
    process.exit(1);
  })
  .finally(() => {
    prismaClient.$disconnect();
  });
