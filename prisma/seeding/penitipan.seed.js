import { prismaClient } from "../../src/application/database.js";
import { logger } from "../../src/application/logging.js";

const listPenitipan = [
  {
    id_penitipan: "",
    tanggal_masuk: new Date(),
    tanggal_akhir: new Date(),
    tanggal_laku: null,
    batas_ambil: new Date(),
    is_perpanjang: false,
    id_penitip: 1,
    id_hunter: null,
    id_pegawai_qc: 12,
  },
];
