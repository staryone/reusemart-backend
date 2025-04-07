import { prismaClient } from "../../src/application/database.js";
import { logger } from "../../src/application/logging.js";

const listBarang = [
    {
        id_barang: "B1",
        nama_barang: "Blender Philips HR2056",
        deskripsi:
            "Blender multifungsi dengan pisau stainless steel, cocok untuk jus dan bumbu",
        harga: 450000,
        status: "siap dijual",
        garansi: new Date("2024-12-15"),
        berat: 2.5,
        id_kategori: 1,
    },
    {
        id_barang: "K2",
        nama_barang: "Kaos Polos Cotton Combed",
        deskripsi:
            "Kaos polos warna hitam, bahan lembut, nyaman dipakai sehari-hari",
        harga: 75000,
        status: "siap dijual",
        garansi: new Date("2025-06-30"),
        berat: 0.2,
        id_kategori: 2,
    },
    {
        id_barang: "M3",
        nama_barang: "Meja Lipat Kayu",
        deskripsi:
            "Meja lipat minimalis, cocok untuk belajar atau bekerja dari rumah",
        harga: 250000,
        status: "siap dijual",
        garansi: new Date("2024-08-20"),
        berat: 5.0,
        id_kategori: 3,
    },
    {
        id_barang: "B4",
        nama_barang: "Buku Novel 'Laskar Pelangi'",
        deskripsi: "Novel best-seller karya Andrea Hirata, kondisi baru",
        harga: 95000,
        status: "siap dijual",
        garansi: new Date("2025-09-10"),
        berat: 0.4,
        id_kategori: 4,
    },
    {
        id_barang: "A5",
        nama_barang: "Action Figure Iron Man",
        deskripsi:
            "Action figure original Marvel, detail tinggi, cocok untuk koleksi",
        harga: 350000,
        status: "siap dijual",
        garansi: new Date("2024-11-01"),
        berat: 0.5,
        id_kategori: 5,
    },
    {
        id_barang: "S6",
        nama_barang: "Stroller Bayi Pliko",
        deskripsi:
            "Stroller ringan dengan desain modern, mudah dilipat dan dibawa",
        harga: 1200000,
        status: "siap dijual",
        garansi: new Date("2025-12-25"),
        berat: 7.0,
        id_kategori: 6,
    },
    {
        id_barang: "V7",
        nama_barang: "Velg Mobil Ring 15 Bekas",
        deskripsi:
            "Velg mobil bekas kondisi mulus, cocok untuk modifikasi mobil sedan",
        harga: 1800000,
        status: "siap dijual",
        garansi: new Date("2024-06-05"),
        berat: 8.0,
        id_kategori: 7,
    },
    {
        id_barang: "P8",
        nama_barang: "Pot Tanaman Keramik",
        deskripsi:
            "Pot tanaman aesthetic berdiameter 20 cm, cocok untuk dekorasi taman",
        harga: 65000,
        status: "siap dijual",
        garansi: new Date("2025-07-15"),
        berat: 1.2,
        id_kategori: 8,
    },
    {
        id_barang: "P9",
        nama_barang: "Printer Canon Pixma G3010",
        deskripsi:
            "Printer multifungsi untuk cetak, scan, dan copy, hemat tinta",
        harga: 2300000,
        status: "siap dijual",
        garansi: new Date("2024-03-10"),
        berat: 6.0,
        id_kategori: 9,
    },
    {
        id_barang: "H10",
        nama_barang: "Hair Dryer Panasonic EH-ND11",
        deskripsi:
            "Hair dryer bekas kondisi baik, daya 400W, cocok untuk penggunaan harian",
        harga: 120000,
        status: "siap dijual",
        garansi: new Date("2025-05-20"),
        berat: 0.6,
        id_kategori: 10,
    },
];

export async function barangSeeding() {
    await prismaClient.barang.createMany({
        data: listBarang,
    });
}

barangSeeding()
    .then(() => {
        logger.info("Berhasil menambahkan seluruh seeding barang");
    })
    .catch((e) => {
        logger.info(e);
        process.exit(1);
    })
    .finally(() => {
        prismaClient.$disconnect();
    });
