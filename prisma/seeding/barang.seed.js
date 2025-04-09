import { prismaClient } from "../../src/application/database.js";
import { logger } from "../../src/application/logging.js";

const listBarang = [
  {
    prefix: "B",
    id_barang: 1,
    nama_barang: "Blender Philips HR2056",
    deskripsi:
      "Blender multifungsi dengan pisau stainless steel, cocok untuk jus dan bumbu",
    harga: 450000,
    status: "siap dijual",
    garansi: new Date("2024-12-15"),
    berat: 2.5,
    path_gambar: "path_gambar_dummy_1",
    id_kategori: 1,
  },
  {
    prefix: "K",
    id_barang: 2,
    nama_barang: "Kaos Polos Cotton Combed",
    deskripsi:
      "Kaos polos warna hitam, bahan lembut, nyaman dipakai sehari-hari",
    harga: 75000,
    status: "siap dijual",
    garansi: null,
    berat: 0.2,
    path_gambar: "path_gambar_dummy_2",
    id_kategori: 2,
  },
  {
    prefix: "M",
    id_barang: 3,
    nama_barang: "Meja Lipat Kayu",
    deskripsi:
      "Meja lipat minimalis, cocok untuk belajar atau bekerja dari rumah",
    harga: 250000,
    status: "siap dijual",
    garansi: null,
    berat: 5.0,
    path_gambar: "path_gambar_dummy_3",
    id_kategori: 3,
  },
  {
    prefix: "B",
    id_barang: 4,
    nama_barang: "Buku Novel Laskar Pelangi",
    deskripsi:
      "Novel best-seller karya Andrea Hirata, kondisi belum dibuka plastiknya",
    harga: 95000,
    status: "siap dijual",
    garansi: null,
    berat: 0.4,
    path_gambar: "path_gambar_dummy_4",
    id_kategori: 4,
  },
  {
    prefix: "A",
    id_barang: 5,
    nama_barang: "Action Figure Iron Man",
    deskripsi:
      "Action figure original Marvel, detail tinggi, cocok untuk koleksi",
    harga: 350000,
    status: "siap dijual",
    garansi: new Date("2024-11-01"),
    berat: 0.5,
    path_gambar: "path_gambar_dummy_5",
    id_kategori: 5,
  },
  {
    prefix: "S",
    id_barang: 6,
    nama_barang: "Stroller Bayi Pliko",
    deskripsi: "Stroller ringan dengan desain modern, mudah dilipat dan dibawa",
    harga: 1200000,
    status: "siap dijual",
    garansi: new Date("2025-12-25"),
    berat: 7.0,
    path_gambar: "path_gambar_dummy_6",
    id_kategori: 6,
  },
  {
    prefix: "V",
    id_barang: 7,
    nama_barang: "Velg Mobil Ring 15 Bekas",
    deskripsi:
      "Velg mobil bekas kondisi mulus, cocok untuk modifikasi mobil sedan",
    harga: 1800000,
    status: "siap dijual",
    garansi: new Date("2024-06-05"),
    berat: 8.0,
    path_gambar: "path_gambar_dummy_7",
    id_kategori: 7,
  },
  {
    prefix: "P",
    id_barang: 8,
    nama_barang: "Pot Tanaman Keramik",
    deskripsi:
      "Pot tanaman aesthetic berdiameter 20 cm, cocok untuk dekorasi taman",
    harga: 65000,
    status: "siap dijual",
    garansi: new Date("2025-07-15"),
    berat: 1.2,
    path_gambar: "path_gambar_dummy_8",
    id_kategori: 8,
  },
  {
    prefix: "P",
    id_barang: 9,
    nama_barang: "Printer Canon Pixma G3010",
    deskripsi: "Printer multifungsi untuk cetak, scan, dan copy, hemat tinta",
    harga: 2300000,
    status: "siap dijual",
    garansi: new Date("2024-03-10"),
    berat: 6.0,
    path_gambar: "path_gambar_dummy_9",
    id_kategori: 9,
  },
  {
    prefix: "H",
    id_barang: 10,
    nama_barang: "Hair Dryer Panasonic EH-ND11",
    deskripsi:
      "Hair dryer bekas kondisi baik, daya 400W, cocok untuk penggunaan harian",
    harga: 120000,
    status: "siap dijual",
    garansi: null,
    berat: 0.6,
    path_gambar: "path_gambar_dummy_10",
    id_kategori: 10,
  },
  {
    prefix: "B",
    id_barang: 11,
    nama_barang: "Buku Tulis Sinar Dunia 58 Lembar",
    deskripsi: "Buku tulis bekas tapi bersih, hanya beberapa lembar terpakai, cocok untuk anak sekolah",
    harga: 3000,
    status: "siap dijual",
    garansi: null,
    berat: 0.2,
    path_gambar: "path_gambar_dummy_11",
    id_kategori: 4
  },
  {
    prefix: "K",
    id_barang: 12,
    nama_barang: "Kursi Lipat Plastik Napolly",
    deskripsi: "Kursi lipat bekas, kokoh dan ringan, cocok untuk acara outdoor",
    harga: 45000,
    status: "siap dijual",
    garansi: new Date("2025-05-20"),
    berat: 2.5,
    path_gambar: "path_gambar_dummy_12",
    id_kategori: 3
  },
  {
    prefix: "S",
    id_barang: 13,
    nama_barang: "Sepatu Sneakers Adidas Neo",
    deskripsi: "Sepatu bekas ukuran 42, kondisi masih layak pakai, nyaman dan ringan",
    harga: 175000,
    status: "siap dijual",
    garansi: new Date("2026-03-20"),
    berat: 1.2,
    path_gambar: "path_gambar_dummy_13",
    id_kategori: 2
  },
  {
    prefix: "T",
    id_barang: 14,
    nama_barang: "Tas Ransel Eiger 25L",
    deskripsi: "Tas bekas kondisi bagus, cocok untuk kuliah atau traveling",
    harga: 120000,
    status: "siap dijual",
    garansi: null,
    berat: 0.8,
    path_gambar: "path_gambar_dummy_14",
    id_kategori: 2
  },
  {
    prefix: "P",
    id_barang: 15,
    nama_barang: "Panci Stainless Steel 24cm",
    deskripsi: "Panci bekas, mulus tanpa goresan, cocok untuk masak sup atau mie",
    harga: 50000,
    status: "siap dijual",
    garansi: null,
    berat: 1.3,
    path_gambar: "path_gambar_dummy_15",
    id_kategori: 3
  },
  {
    prefix: "M",
    id_barang: 16,
    nama_barang: "Meja Belajar Lipat Kayu",
    deskripsi: "Meja belajar bekas, bahan kayu ringan, cocok untuk anak-anak",
    harga: 85000,
    status: "siap dijual",
    garansi: null,
    berat: 3.5,
    path_gambar: "path_gambar_dummy_16",
    id_kategori: 3
  },
  {
    prefix: "G",
    id_barang: 17,
    nama_barang: "Gitar Akustik Yamaha F310",
    deskripsi: "Gitar bekas, suara masih jernih, cocok untuk pemula",
    harga: 450000,
    status: "siap dijual",
    garansi: new Date("2025-11-20"),
    berat: 2.2,
    path_gambar: "path_gambar_dummy_17",
    id_kategori: 5
  },
  {
    prefix: "J",
    id_barang: 18,
    nama_barang: "Jaket Parka Uniqlo Pria",
    deskripsi: "Jaket bekas, bahan waterproof, cocok untuk musim hujan",
    harga: 140000,
    status: "siap dijual",
    garansi: null,
    berat: 1.1,
    path_gambar: "path_gambar_dummy_18",
    id_kategori: 2
  },
  {
    prefix: "O",
    id_barang: 19,
    nama_barang: "One Piece Volume 1 - Komik",
    deskripsi: "Komik bekas, halaman lengkap, cover masih bagus",
    harga: 10000,
    status: "siap dijual",
    garansi: null,
    berat: 0.3,
    path_gambar: "path_gambar_dummy_19",
    id_kategori: 5
  },
  {
    prefix: "L",
    id_barang: 20,
    nama_barang: "Lampu Tidur Karakter Hello Kitty",
    deskripsi: "Lampu tidur bekas lucu, cocok untuk kamar anak, nyala normal",
    harga: 25000,
    status: "siap dijual",
    garansi: null,
    berat: 0.5,
    path_gambar: "path_gambar_dummy_20",
    id_kategori: 3
  }
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
