import { prismaClient } from "../src/application/database.js";
import { logger } from "../src/application/logging.js";
import { userSeeding } from "./seeding/user.seed.js";
import { jabatanSeeding } from "./seeding/jabatan.seed.js";
import { pegawaiSeeding } from "./seeding/pegawai.seed.js";
import { organisasiSeeding } from "./seeding/organisasi.seed.js";
import { penitipSeeding } from "./seeding/penitip.seed.js";
import { pembeliSeeding } from "./seeding/pembeli.seed.js";
import { alamatSeeding } from "./seeding/alamat.seed.js";
import { merchandiseSeeding } from "./seeding/merchandise.seed.js";
import { kategoriSeeding } from "./seeding/kategori.seed.js";
import { barangSeeding } from "./seeding/barang.seed.js";
import { diskusiSeeding } from "./seeding/diskusi.seed.js";
import { keranjangSeeding } from "./seeding/keranjang.seed.js";
import { requestSeeding } from "./seeding/request_donasi.seed.js";
import { penitipanSeeding } from "./seeding/penitipan.seed.js";
import { donasiSeeding } from "./seeding/donasi.seed.js";
import { transaksiSeeding } from "./seeding/transaksi.seed.js";
import { detailTransaksiSeeding } from "./seeding/detail_transaksi.seed.js";
import { redeemMerchandiseSeeding } from "./seeding/redeem_merchandise.seed.js";
import { detailRedeemMerchandiseSeeding } from "./seeding/detail_redeem_merchandise.seed.js";
import { pengirimanSeeding } from "./seeding/pengiriman.seed.js";

const seedFiles = [
  { name: "users", seed: userSeeding },
  { name: "jabatan", seed: jabatanSeeding },
  { name: "pegawai", seed: pegawaiSeeding },
  { name: "organisasi", seed: organisasiSeeding },
  { name: "penitip", seed: penitipSeeding },
  { name: "pembeli", seed: pembeliSeeding },
  { name: "alamat", seed: alamatSeeding },
  { name: "merchandise", seed: merchandiseSeeding },
  { name: "redeem_merchandise", seed: redeemMerchandiseSeeding },
  { name: "kategori", seed: kategoriSeeding },
  { name: "barang", seed: barangSeeding },
  { name: "diskusi", seed: diskusiSeeding },
  { name: "transaksi", seed: transaksiSeeding },
  { name: "keranjang", seed: keranjangSeeding },
  { name: "request_donasi", seed: requestSeeding },
  { name: "donasi", seed: donasiSeeding },
  { name: "penitipan", seed: penitipanSeeding },
  { name: "dtl_transaksi", seed: detailTransaksiSeeding },
  { name: "dtl_redeem_merch", seed: detailRedeemMerchandiseSeeding },
  { name: "pengiriman", seed: pengirimanSeeding },
];

async function main() {
  try {
    logger.info("Starting seeding process...");

    for (const { name, seed } of seedFiles) {
      logger.info(`Seeding ${name}...`);
      await seed(prismaClient);
      logger.info(`${name} seeded successfully`);
    }

    logger.info("Seeding completed successfully!");
  } catch (e) {
    logger.error("Error during seeding:", e);
    process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

main();
