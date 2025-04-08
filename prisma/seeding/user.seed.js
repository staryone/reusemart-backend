import { prismaClient } from "../../src/application/database.js";
import { logger } from "../../src/application/logging.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const listUser = [
  [
    {
      id_user: 1,
      email: "frendy@reusemart.my.id",
      password: bcrypt.hash("10101999", 10),
      role: "PEGAWAI",
      token: uuid().toString(),
    },
    {
      id_user: 2,
      email: "alexanderfabian@reusemart.my.id",
      password: bcrypt.hash("22082000", 10),
      role: "PEGAWAI",
      token: uuid().toString(),
    },
    {
      id_user: 3,
      email: "stanyslaushary@reusemart.my.id",
      password: bcrypt.hash("12072000", 10),
      role: "PEGAWAI",
      token: uuid().toString(),
    },
    {
      id_user: 4,
      email: "sukarjomaja@reusemart.my.id",
      password: bcrypt.hash("12082001", 10),
      role: "PEGAWAI",
      token: uuid().toString(),
    },
    {
      id_user: 5,
      email: "enimanari@reusemart.my.id",
      password: bcrypt.hash("11092000", 10),
      role: "PEGAWAI",
      token: uuid().toString(),
    },
    {
      id_user: 6,
      email: "putrisakoju@reusemart.my.id",
      password: bcrypt.hash("14102002", 10),
      role: "PEGAWAI",
      token: uuid().toString(),
    },
    {
      id_user: 7,
      email: "dewisekira@reusemart.my.id",
      password: bcrypt.hash("28022004", 10),
      role: "PEGAWAI",
      token: uuid().toString(),
    },
    {
      id_user: 8,
      email: "ahmadjaya@reusemart.my.id",
      password: bcrypt.hash("13112000", 10),
      role: "PEGAWAI",
      token: uuid().toString(),
    },
    {
      id_user: 9,
      email: "fauzaniman@reusemart.my.id",
      password: bcrypt.hash("14102001", 10),
      role: "PEGAWAI",
      token: uuid().toString(),
    },
    {
      id_user: 10,
      email: "hugopalimasada@reusemart.my.id",
      password: bcrypt.hash("24042004", 10),
      role: "PEGAWAI",
      token: uuid().toString(),
    },
    {
      id_user: 11,
      email: "indahpertiwi@reusemart.my.id",
      password: bcrypt.hash("17062004", 10),
      role: "PEGAWAI",
      token: uuid().toString(),
    },
    {
      id_user: 12,
      email: "budisantoso@reusemart.my.id",
      password: bcrypt.hash("15052001", 10),
      role: "PEGAWAI",
      token: uuid().toString(),
    },
    {
      id_user: 13,
      email: "rinawulandari@reusemart.my.id",
      password: bcrypt.hash("20032002", 10),
      role: "PEGAWAI",
      token: uuid().toString(),
    },
    {
      id_user: 14,
      email: "tinaamelia@reusemart.my.id",
      password: bcrypt.hash("25072003", 10),
      role: "PEGAWAI",
      token: uuid().toString(),
    },
    {
      id_user: 15,
      email: "rudihartono@reusemart.my.id",
      password: bcrypt.hash("10122002", 10),
      role: "PEGAWAI",
      token: uuid().toString(),
    },
    {
      id_user: 16,
      email: "alyaputri@gmail.com",
      password: bcrypt.hash("alyaputri", 10),
      role: "PEMBELI",
      token: uuid().toString(),
    },
    {
      id_user: 17,
      email: "andinugroho@yahoo.com",
      password: bcrypt.hash("andinugroho", 10),
      role: "PEMBELI",
      token: uuid().toString(),
    },
    {
      id_user: 18,
      email: "siti@outlook.com",
      password: bcrypt.hash("siti", 10),
      role: "PEMBELI",
      token: uuid().toString(),
    },
    {
      id_user: 19,
      email: "budisantoso@hotmail.com",
      password: bcrypt.hash("budisantoso", 10),
      role: "PEMBELI",
      token: uuid().toString(),
    },
    {
      id_user: 20,
      email: "dinaauliarahma@gmail.com",
      password: bcrypt.hash("dinaauliarahma", 10),
      role: "PEMBELI",
      token: uuid().toString(),
    },
    {
      id_user: 21,
      email: "rudi@gmail.com",
      password: bcrypt.hash("rudi", 10),
      role: "PEMBELI",
      token: uuid().toString(),
    },
    {
      id_user: 22,
      email: "liakartika@yahoo.com",
      password: bcrypt.hash("liakartika", 10),
      role: "PEMBELI",
      token: uuid().toString(),
    },
    {
      id_user: 23,
      email: "ahmadzaki@outlook.com",
      password: bcrypt.hash("ahmadzaki", 10),
      role: "PEMBELI",
      token: uuid().toString(),
    },
    {
      id_user: 24,
      email: "melatinurhasanah@gmail.com",
      password: bcrypt.hash("melatinurhasanah", 10),
      role: "PEMBELI",
      token: uuid().toString(),
    },
    {
      id_user: 25,
      email: "joko@hotmail.com",
      password: bcrypt.hash("joko", 10),
      role: "PEMBELI",
      token: uuid().toString(),
    },
    {
      id_user: 26,
      email: "jokosantoso@gmail.com",
      password: bcrypt.hash("jokosantoso", 10),
      role: "PENITIP",
      token: uuid().toString(),
    },
    {
      id_user: 27,
      email: "sitiaminah@yahoo.com",
      password: bcrypt.hash("sitiaminah", 10),
      role: "PENITIP",
      token: uuid().toString(),
    },
    {
      id_user: 28,
      email: "budihartono@outlook.com",
      password: bcrypt.hash("budihartono", 10),
      role: "PENITIP",
      token: uuid().toString(),
    },
    {
      id_user: 29,
      email: "rinawulandari@gmail.com",
      password: bcrypt.hash("rinawulandari", 10),
      role: "PENITIP",
      token: uuid().toString(),
    },
    {
      id_user: 30,
      email: "ahmadyani@hotmail.com",
      password: bcrypt.hash("ahmadyani", 10),
      role: "PENITIP",
      token: uuid().toString(),
    },
    {
      id_user: 31,
      email: "dewilestari@yahoo.com",
      password: bcrypt.hash("dewilestari", 10),
      role: "PENITIP",
      token: uuid().toString(),
    },
    {
      id_user: 32,
      email: "ekoprasetyo@gmail.com",
      password: bcrypt.hash("ekoprasetyo", 10),
      role: "PENITIP",
      token: uuid().toString(),
    },
    {
      id_user: 33,
      email: "linamarlina@outlook.com",
      password: bcrypt.hash("linamarlina", 10),
      role: "PENITIP",
      token: uuid().toString(),
    },
    {
      id_user: 34,
      email: "fajarnugroho@gmail.com",
      password: bcrypt.hash("fajarnugroho", 10),
      role: "PENITIP",
      token: uuid().toString(),
    },
    {
      id_user: 35,
      email: "tinasusanti@gmail.com",
      password: bcrypt.hash("tinasusanti", 10),
      role: "PENITIP",
      token: uuid().toString(),
    },
    {
      id_user: 36,
      email: "yayasandharmabakti@gmail.com",
      password: bcrypt.hash("yayasandharmabakti", 10),
      role: "ORGANISASI",
      token: uuid().toString(),
    },
    {
      id_user: 37,
      email: "lembagacintakasih@yahoo.com",
      password: bcrypt.hash("lembagacintakasih", 10),
      role: "ORGANISASI",
      token: uuid().toString(),
    },
    {
      id_user: 38,
      email: "forumhijauindonesia@outlook.com",
      password: bcrypt.hash("forumhijauindonesia", 10),
      role: "ORGANISASI",
      token: uuid().toString(),
    },
    {
      id_user: 39,
      email: "komunitaspedulipendidikan@gmail.com",
      password: bcrypt.hash("komunitaspedulipendidikan", 10),
      role: "ORGANISASI",
      token: uuid().toString(),
    },
    {
      id_user: 40,
      email: "baktisosialnusantara@gmail.com",
      password: bcrypt.hash("baktisosialnusantara", 10),
      role: "ORGANISASI",
      token: uuid().toString(),
    },
    {
      id_user: 41,
      email: "relawantanggapdarurat@yahoo.com",
      password: bcrypt.hash("relawantanggapdarurat", 10),
      role: "ORGANISASI",
      token: uuid().toString(),
    },
    {
      id_user: 42,
      email: "gerakandonordarah@gmail.com",
      password: bcrypt.hash("gerakandonordarah", 10),
      role: "ORGANISASI",
      token: uuid().toString(),
    },
    {
      id_user: 43,
      email: "sahabatlansia@outlook.com",
      password: bcrypt.hash("sahabatlansia", 10),
      role: "ORGANISASI",
      token: uuid().toString(),
    },
    {
      id_user: 44,
      email: "rumahharapan@gmail.com",
      password: bcrypt.hash("rumahharapan", 10),
      role: "ORGANISASI",
      token: uuid().toString(),
    },
    {
      id_user: 45,
      email: "pemudaberkarya@gmail.com",
      password: bcrypt.hash("pemudaberkarya", 10),
      role: "ORGANISASI",
      token: uuid().toString(),
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
