import { prismaClient } from "../../src/application/database.js";
import { logger } from "../../src/application/logging.js";

const listAlamat = [
  [
    {
      nama_alamat: "Rumah",
      detail_alamat: "Jl. Babarsari No. 1",
      status_default: true,
      id_pembeli: 1,
    },
    {
      nama_alamat: "Rumah",
      detail_alamat: "Jl. Kaliurang Km. 5",
      status_default: false,
      id_pembeli: 2,
    },
    {
      nama_alamat: "Rumah",
      detail_alamat: "Jl. Gejayan No. 21",
      status_default: false,
      id_pembeli: 1,
    },
    {
      nama_alamat: "Rumah",
      detail_alamat: "Jl. Solo No. 10",
      status_default: true,
      id_pembeli: 3,
    },
    {
      nama_alamat: "Rumah",
      detail_alamat: "Jl. Wonosari Km. 8",
      status_default: false,
      id_pembeli: 2,
    },
    {
      nama_alamat: "Rumah",
      detail_alamat: "Jl. Affandi No. 5",
      status_default: false,
      id_pembeli: 3,
    },
    {
      nama_alamat: "Rumah",
      detail_alamat: "Jl. Palagan Tentara Pelajar",
      status_default: true,
      id_pembeli: 4,
    },
    {
      nama_alamat: "Rumah",
      detail_alamat: "Perumahan Griya Citra Asri Blok B2",
      status_default: true,
      id_pembeli: 5,
    },
    {
      nama_alamat: "Rumah",
      detail_alamat: "Jl. Monjali No. 17",
      status_default: true,
      id_pembeli: 6,
    },
    {
      nama_alamat: "Rumah",
      detail_alamat: "Jl. Ringroad Utara No. 3",
      status_default: true,
      id_pembeli: 7,
    },
    {
      nama_alamat: "Rumah",
      detail_alamat: "Jl. Godean Km. 4",
      status_default: false,
      id_pembeli: 4,
    },
    {
      nama_alamat: "Rumah",
      detail_alamat: "Jl. Imogiri Timur No. 2",
      status_default: false,
      id_pembeli: 5,
    },
    {
      nama_alamat: "Rumah",
      detail_alamat: "Komplek Puri Indah No. 12",
      status_default: true,
      id_pembeli: 8,
    },
    {
      nama_alamat: "Rumah",
      detail_alamat: "Perumahan Citra Garden Blok A1",
      status_default: false,
      id_pembeli: 6,
    },
    {
      nama_alamat: "Rumah",
      detail_alamat: "Jl. Magelang Km. 6",
      status_default: false,
      id_pembeli: 7,
    },
    {
      nama_alamat: "Rumah",
      detail_alamat: "Jl. Kapten Piere Tendean",
      status_default: true,
      id_pembeli: 9,
    },
    {
      nama_alamat: "Rumah",
      detail_alamat: "Jl. Rajawali No. 8",
      status_default: false,
      id_pembeli: 8,
    },
    {
      nama_alamat: "Kantor",
      detail_alamat: "Jl. Sudirman No. 15",
      status_default: true,
      id_pembeli: 10,
    },
    {
      nama_alamat: "Kantor",
      detail_alamat: "Jl. Malioboro No. 1",
      status_default: false,
      id_pembeli: 9,
    },
    {
      nama_alamat: "Kantor",
      detail_alamat: "Jl. Adisutjipto Km. 3",
      status_default: false,
      id_pembeli: 10,
    },
    {
      nama_alamat: "Kantor",
      detail_alamat: "Jl. Seturan No. 11",
      status_default: false,
      id_pembeli: 1,
    },
    {
      nama_alamat: "Kantor",
      detail_alamat: "Jl. Laksda Adisucipto No. 20",
      status_default: true,
      id_pembeli: 2,
    },
    {
      nama_alamat: "Kantor",
      detail_alamat: "Ruko Mataram Square Blok C",
      status_default: false,
      id_pembeli: 3,
    },
    {
      nama_alamat: "Kantor",
      detail_alamat: "Jl. Solo Baru No. 9",
      status_default: false,
      id_pembeli: 4,
    },
    {
      nama_alamat: "Kantor",
      detail_alamat: "Jl. Dr. Sutomo No. 5",
      status_default: false,
      id_pembeli: 5,
    },
  ],
];

export async function alamatSeeding() {
  await prismaClient.alamat.createMany({
    data: listAlamat,
  });
}

alamatSeeding()
  .then(() => {
    logger.info("Berhasil menambahkan seluruh seeding alamat");
  })
  .catch((e) => {
    logger.info(e);
    process.exit(1);
  })
  .finally(() => {
    prismaClient.$disconnect();
  });
