const listGambarBarang = [
  // Printer
  {
    url_gambar: "gambar_barang/printer_primary.jpeg",
    is_primary: true,
    order_number: 0,
    id_barang: 9, // Printer Canon Pixma G3010
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    url_gambar: "gambar_barang/printer.jpeg",
    is_primary: false,
    order_number: 1,
    id_barang: 9, // Printer Canon Pixma G3010
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Sepatu
  {
    url_gambar: "gambar_barang/sepatu_primary.jpeg",
    is_primary: true,
    order_number: 0,
    id_barang: 13, // Sepatu Sneakers Adidas Neo
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    url_gambar: "gambar_barang/sepatu.jpeg",
    is_primary: false,
    order_number: 1,
    id_barang: 13, // Sepatu Sneakers Adidas Neo
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Stroller
  {
    url_gambar: "gambar_barang/stroller_primary.jpeg",
    is_primary: true,
    order_number: 0,
    id_barang: 6, // Stroller Bayi Pliko
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    url_gambar: "gambar_barang/stroller.jpeg",
    is_primary: false,
    order_number: 1,
    id_barang: 6, // Stroller Bayi Pliko
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Velg
  {
    url_gambar: "gambar_barang/velg_primary.jpeg",
    is_primary: true,
    order_number: 0,
    id_barang: 7, // Velg Mobil Ring 15 Bekas
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    url_gambar: "gambar_barang/velg.jpeg",
    is_primary: false,
    order_number: 1,
    id_barang: 7, // Velg Mobil Ring 15 Bekas
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Blender
  {
    url_gambar: "gambar_barang/blender_primary.jpeg",
    is_primary: true,
    order_number: 0,
    id_barang: 1, // Blender Philips HR2056
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    url_gambar: "gambar_barang/blender.jpeg",
    is_primary: false,
    order_number: 1,
    id_barang: 1, // Blender Philips HR2056
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Buku
  {
    url_gambar: "gambar_barang/buku_primary.jpeg",
    is_primary: true,
    order_number: 0,
    id_barang: 11, // Buku Tulis Sinar Dunia 58 Lembar
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    url_gambar: "gambar_barang/buku.jpeg",
    is_primary: false,
    order_number: 1,
    id_barang: 11, // Buku Tulis Sinar Dunia 58 Lembar
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Hairdryer
  {
    url_gambar: "gambar_barang/hairdryer_primary.jpeg",
    is_primary: true,
    order_number: 0,
    id_barang: 10, // Hair Dryer Panasonic EH-ND11
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    url_gambar: "gambar_barang/hairdryer.jpeg",
    is_primary: false,
    order_number: 1,
    id_barang: 10, // Hair Dryer Panasonic EH-ND11
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Kaos
  {
    url_gambar: "gambar_barang/kaos_primary.jpeg",
    is_primary: true,
    order_number: 0,
    id_barang: 2, // Kaos Polos Cotton Combed
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    url_gambar: "gambar_barang/kaos.jpeg",
    is_primary: false,
    order_number: 1,
    id_barang: 2, // Kaos Polos Cotton Combed
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Kursi
  {
    url_gambar: "gambar_barang/kursi_primary.jpeg",
    is_primary: true,
    order_number: 0,
    id_barang: 12, // Kursi Lipat Plastik Napolly
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    url_gambar: "gambar_barang/kursi.jpeg",
    is_primary: false,
    order_number: 1,
    id_barang: 12, // Kursi Lipat Plastik Napolly
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Meja
  {
    url_gambar: "gambar_barang/meja_primary.jpeg",
    is_primary: true,
    order_number: 0,
    id_barang: 3, // Meja Lipat Kayu
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    url_gambar: "gambar_barang/meja.jpeg",
    is_primary: false,
    order_number: 1,
    id_barang: 3, // Meja Lipat Kayu
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function gambarBarangSeeding(prismaClient) {
  await prismaClient.gambarBarang.createMany({
    data: listGambarBarang,
  });
}
