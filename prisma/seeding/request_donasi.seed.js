import { prismaClient } from "../../src/application/database.js";
import { logger } from "../../src/application/logging.js";

const listRequest = [
  {
    id_request: 1,
    deskripsi: "Kulkas (untuk menyimpan makanan bayi dan anak-anak)",
    tanggal_request: new Date("2025-04-12"),
    status: "Pending",
    id_organisasi: "ORG2"
  },
  {
    id_request: 2,
    deskripsi: "Laptop bekas untuk pelatihan komputer remaja",
    tanggal_request: new Date("2025-04-10"),
    status: "Approved",
    id_organisasi: "ORG1"
  },
  {
    id_request: 3,
    deskripsi: "Tas sekolah dan alat tulis untuk anak-anak",
    tanggal_request: new Date("2025-04-15"),
    status: "Pending",
    id_organisasi: "ORG4"
  },
  {
    id_request: 4,
    deskripsi: "Peralatan masak untuk dapur umum",
    tanggal_request: new Date("2025-04-09"),
    status: "Pending",
    id_organisasi: "ORG5"
  },
  {
    id_request: 5,
    deskripsi: "Mainan edukasi dan buku cerita anak",
    tanggal_request: new Date("2025-04-14"),
    status: "Pending",
    id_organisasi: "ORG6"
  },
  {
    id_request: 6,
    deskripsi: "Printer & scanner untuk kebutuhan administrasi",
    tanggal_request: new Date("2025-04-11"),
    status: "Approved",
    id_organisasi: "ORG3"
  },
  {
    id_request: 7,
    deskripsi: "Pakaian layak pakai untuk korban banjir",
    tanggal_request: new Date("2025-04-13"),
    status: "Pending",
    id_organisasi: "ORG10"
  },
  {
    id_request: 8,
    deskripsi: "Kasur lipat dan selimut untuk lansia",
    tanggal_request: new Date("2025-04-16"),
    status: "Approved",
    id_organisasi: "ORG8"
  },
  {
    id_request: 9,
    deskripsi: "Kamera bekas untuk dokumentasi kegiatan sosial",
    tanggal_request: new Date("2025-04-12"),
    status: "Pending",
    id_organisasi: "ORG7"
  },
  {
    id_request: 10,
    deskripsi: "Peralatan olahraga bekas untuk komunitas pemuda",
    tanggal_request: new Date("2025-04-10"),
    status: "Approved",
    id_organisasi: "ORG9"
  }
];

export async function requestSeeding() {
  await prismaClient.requestDonasi.createMany({
    data: listRequest,
  });
}

requestSeeding()
  .then(() => {
    logger.info("Berhasil menambahkan seluruh seeding request");
  })
  .catch((e) => {
    logger.info(e);
    process.exit(1);
  })
  .finally(() => {
    prismaClient.$disconnect();
  });
