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

const seedFiles = [
    { name: "users", seed: userSeeding },
    { name: "jabatan", seed: jabatanSeeding },
    { name: "pegawai", seed: pegawaiSeeding },
    { name: "organisasi", seed: organisasiSeeding },
    { name: "penitip", seed: penitipSeeding },
    { name: "pembeli", seed: pembeliSeeding },
    { name: "alamat", seed: alamatSeeding },
    // redeemMerch
    { name: "merchandise", seed: merchandiseSeeding },
    // detailmerch
    { name: "kategori", seed: kategoriSeeding },
    { name: "barang", seed: barangSeeding },
    { name: "diskusi", seed: diskusiSeeding },
    { name: "transaksi", seed: transaksiSeeding },
    { name: "keranjang", seed: keranjangSeeding },
    { name: "request_donasi", seed: requestSeeding },
    { name: "donasi", seed: donasiSeeding },
    { name: "penitipan", seed: penitipanSeeding },
    // detail penitipan
    // pengiriman
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
