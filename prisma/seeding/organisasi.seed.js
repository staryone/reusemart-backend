import { prismaClient } from "../../src/application/database.js";
import { logger } from "../../src/application/logging.js";

const listOrganisasi = [
  {
    id_organisasi: 1,
    id_user: 36,
    nama_organisasi: "Yayasan Dharma Bakti",
    alamat: "Jl. Babarsari, No. 14",
    nomor_telepon: "08123123123",
    deskripsi: "Yayasan penyaluran bantuan bencana",
  },
  {
    id_organisasi: 2,
    id_user: 37,
    nama_organisasi: "Lembaga Cinta Kasih",
    alamat: "Jl. Kaliurang KM 7",
    nomor_telepon: "08123456789",
    deskripsi: "Lembaga sosial peduli anak yatim",
  },
  {
    id_organisasi: 3,
    id_user: 38,
    nama_organisasi: "Forum Hijau Indonesia",
    alamat: "Jl. Gejayan No. 5",
    nomor_telepon: "082112223333",
    deskripsi: "Organisasi pelestarian lingkungan",
  },
  {
    id_organisasi: 4,
    id_user: 39,
    nama_organisasi: "Komunitas Peduli Pendidikan",
    alamat: "Jl. Magelang KM 4",
    nomor_telepon: "085266778899",
    deskripsi: "Komunitas relawan pendidikan anak",
  },
  {
    id_organisasi: 5,
    id_user: 40,
    nama_organisasi: "Bakti Sosial Nusantara",
    alamat: "Jl. Solo No. 10",
    nomor_telepon: "08199887766",
    deskripsi: "Organisasi bantuan sosial dan medis",
  },
  {
    id_organisasi: 6,
    id_user: 41,
    nama_organisasi: "Relawan Tanggap Darurat",
    alamat: "Jl. Parangtritis KM 3",
    nomor_telepon: "089611223344",
    deskripsi: "Tim relawan untuk tanggap bencana",
  },
  {
    id_organisasi: 7,
    id_user: 42,
    nama_organisasi: "Gerakan Donor Darah",
    alamat: "Jl. Ringroad Utara No. 8",
    nomor_telepon: "087733221100",
    deskripsi: "Komunitas penggerak donor darah",
  },
  {
    id_organisasi: 8,
    id_user: 43,
    nama_organisasi: "Sahabat Lansia",
    alamat: "Jl. Palagan Tentara Pelajar",
    nomor_telepon: "08122334455",
    deskripsi: "Layanan sosial untuk lansia",
  },
  {
    id_organisasi: 9,
    id_user: 44,
    nama_organisasi: "Rumah Harapan",
    alamat: "Jl. Seturan No. 15",
    nomor_telepon: "083144556677",
    deskripsi: "Pusat rehabilitasi dan konseling",
  },
  {
    id_organisasi: 10,
    id_user: 45,
    nama_organisasi: "Pemuda Berkarya",
    alamat: "Jl. Affandi No. 23",
    nomor_telepon: "082345678901",
    deskripsi: "Organisasi pengembangan pemuda",
  },
];

export async function organisasiSeeding() {
  await prismaClient.organisasi.createMany({
    data: listOrganisasi,
  });
}

organisasiSeeding()
  .then(() => {
    logger.info("Berhasil menambahkan seluruh seeding organisasi");
  })
  .catch((e) => {
    logger.info(e);
    process.exit(1);
  })
  .finally(() => {
    prismaClient.$disconnect();
  });
