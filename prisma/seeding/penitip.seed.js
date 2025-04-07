import { prismaClient } from "../../src/application/database.js";
import { logger } from "../../src/application/logging.js";

const listPenitip = [
    {
        id_penitip: "T1",
        nomor_ktp: "3471005201222146",
        nama: "Joko Santoso",
        alamat: "Jalan Babarsari No. 12, Caturtunggal, Depok, Sleman",
        nomor_telepon: "081234567890",
        saldo: 0,
        rating: 0,
        total_review: 0,
        jumlah_review: 0,
        total_per_bulan: 0,
        poin: 0,
    },
    {
        id_penitip: "T2",
        nomor_ktp: "3471012305980001",
        nama: "Siti Aminah",
        alamat: "Jalan Raya Babarsari Gang Mawar No. 5, Sleman",
        nomor_telepon: "085678901234",
        saldo: 0,
        rating: 0,
        total_review: 0,
        jumlah_review: 0,
        total_per_bulan: 0,
        poin: 0,
    },
    {
        id_penitip: "T3",
        nomor_ktp: "3471021503750002",
        nama: "Budi Hartono",
        alamat: "Perumahan Babarsari Indah Blok A No. 8, Depok",
        nomor_telepon: "087712345678",
        saldo: 0,
        rating: 0,
        total_review: 0,
        jumlah_review: 0,
        total_per_bulan: 0,
        poin: 0,
    },
    {
        id_penitip: "T4",
        nomor_ktp: "3471032908900003",
        nama: "Rina Wulandari",
        alamat: "Jalan Babarsari Km 2 No. 17, Caturtunggal",
        nomor_telepon: "082134567890",
        saldo: 0,
        rating: 0,
        total_review: 0,
        jumlah_review: 0,
        total_per_bulan: 0,
        poin: 0,
    },
    {
        id_penitip: "T5",
        nomor_ktp: "3471040712990004",
        nama: "Ahmad Yani",
        alamat: "Gang Kenanga No. 3, Babarsari, Sleman",
        nomor_telepon: "089876543210",
        saldo: 0,
        rating: 0,
        total_review: 0,
        jumlah_review: 0,
        total_per_bulan: 0,
        poin: 0,
    },
    {
        id_penitip: "T6",
        nomor_ktp: "3471051406820005",
        nama: "Dewi Lestari",
        alamat: "Jalan Seturan Raya No. 25, Depok, Sleman",
        nomor_telepon: "081987654321",
        saldo: 0,
        rating: 0,
        total_review: 0,
        jumlah_review: 0,
        total_per_bulan: 0,
        poin: 0,
    },
    {
        id_penitip: "T7",
        nomor_ktp: "3471062504010006",
        nama: "Eko Prasetyo",
        alamat: "Jalan Babarsari No. 45, Caturtunggal, Depok",
        nomor_telepon: "083245678901",
        saldo: 0,
        rating: 0,
        total_review: 0,
        jumlah_review: 0,
        total_per_bulan: 0,
        poin: 0,
    },
    {
        id_penitip: "T8",
        nomor_ktp: "3471073105770007",
        nama: "Lina Marlina",
        alamat: "Perumahan Seturan Asri No. 9, Babarsari",
        nomor_telepon: "081356789012",
        saldo: 0,
        rating: 0,
        total_review: 0,
        jumlah_review: 0,
        total_per_bulan: 0,
        poin: 0,
    },
    {
        id_penitip: "T9",
        nomor_ktp: "3471080909130008",
        nama: "Fajar Nugroho",
        alamat: "Jalan Raya Babarsari No. 33, Sleman",
        nomor_telepon: "085432109876",
        saldo: 0,
        rating: 0,
        total_review: 0,
        jumlah_review: 0,
        total_per_bulan: 0,
        poin: 0,
    },
    {
        id_penitip: "T10",
        nomor_ktp: "3471092111880009",
        nama: "Tina Susanti",
        alamat: "Gang Melati No. 7, Babarsari, Depok",
        nomor_telepon: "082876543210",
        saldo: 0,
        rating: 0,
        total_review: 0,
        jumlah_review: 0,
        total_per_bulan: 0,
        poin: 0,
    },
];

export async function penitipSeeding() {
    await prismaClient.penitip.createMany({
        data: listPenitip,
    });
}

penitipSeeding()
    .then(() => {
        logger.info("Berhasil menambahkan seluruh seeding penitip");
    })
    .catch((e) => {
        logger.info(e);
        process.exit(1);
    })
    .finally(() => {
        prismaClient.$disconnect();
    });
