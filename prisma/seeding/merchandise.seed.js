const listMerchandise = [
  {
    id_merchandise: 1,
    nama_merch: "Ballpoin ReUseMart",
    harga_poin: 100,
    stok: 45,
  },
  {
    id_merchandise: 2,
    nama_merch: "Stiker Eco-Friendly",
    harga_poin: 100,
    stok: 60,
  },
  {
    id_merchandise: 3,
    nama_merch: "Mug ReUseMart",
    harga_poin: 250,
    stok: 30,
  },
  {
    id_merchandise: 4,
    nama_merch: "Topi ReUseMart",
    harga_poin: 250,
    stok: 25,
  },
  {
    id_merchandise: 5,
    nama_merch: "Tumbler Stainless",
    harga_poin: 500,
    stok: 20,
  },
  {
    id_merchandise: 6,
    nama_merch: "Kaos Daur Ulang",
    harga_poin: 500,
    stok: 18,
  },
  {
    id_merchandise: 7,
    nama_merch: "Jam Dinding ReUse",
    harga_poin: 500,
    stok: 15,
  },
  {
    id_merchandise: 8,
    nama_merch: "Tas Travel Lipat",
    harga_poin: 1000,
    stok: 25,
  },
  {
    id_merchandise: 9,
    nama_merch: "Payung ReUseMart",
    harga_poin: 1000,
    stok: 12,
  },
  {
    id_merchandise: 10,
    nama_merch: "Gantungan Kunci ReUseMart",
    harga_poin: 100,
    stok: 0,
  },
  {
    id_merchandise: 11,
    nama_merch: "Tote Bag ReUseMart",
    harga_poin: 250,
    stok: 15,
  },
  {
    id_merchandise: 12,
    nama_merch: "Stiker Ramah Lingkungan",
    harga_poin: 50,
    stok: 100,
  },
  {
    id_merchandise: 13,
    nama_merch: "Tempat Pensil Kanvas",
    harga_poin: 400,
    stok: 30,
  },
  {
    id_merchandise: 14,
    nama_merch: "Notebook Daur Ulang",
    harga_poin: 300,
    stok: 40,
  },
  {
    id_merchandise: 15,
    nama_merch: "Pin ReUseMart",
    harga_poin: 200,
    stok: 50,
  },
];

export async function merchandiseSeeding(prismaClient) {
  await prismaClient.merchandise.createMany({
    data: listMerchandise,
  });
}
