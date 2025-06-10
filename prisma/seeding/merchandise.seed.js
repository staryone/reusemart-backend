const listMerchandise = [
  {
    id_merchandise: 1,
    nama_merch: "Ballpoin ReUseMart",
    harga_poin: 100,
    stok: 45,
    url_gambar:
      "https://faber-castell.co.id/cfind/source/images/product/gwm/produk-gwm-2021/642799-fastgelz-05mm-black-3.jpg",
  },
  {
    id_merchandise: 2,
    nama_merch: "Stiker Eco-Friendly",
    harga_poin: 100,
    stok: 60,
    url_gambar:
      "https://static6.depositphotos.com/1003870/567/v/950/depositphotos_5677203-stock-illustration-eco-sticker-collection.jpg",
  },
  {
    id_merchandise: 3,
    nama_merch: "Mug ReUseMart",
    harga_poin: 250,
    stok: 30,
    url_gambar: "https://api.mdp.co.id/upload/pictures/product/SP9877.jpg",
  },
  {
    id_merchandise: 4,
    nama_merch: "Topi ReUseMart",
    harga_poin: 250,
    stok: 25,
    url_gambar:
      "https://static.jakmall.id/2022/08/images/products/735f2e/thumbnail/baseball-cap-basic-plain-cap-topi-baseball-topi-polos-topi-pria.jpg",
  },
  {
    id_merchandise: 5,
    nama_merch: "Tumbler Stainless",
    harga_poin: 500,
    stok: 20,
    url_gambar:
      "https://demibumi.id/wp-content/uploads/2021/06/TumblerArizona500ml_1-scaled.jpg",
  },
  {
    id_merchandise: 6,
    nama_merch: "Kaos Daur Ulang",
    harga_poin: 500,
    stok: 18,
    url_gambar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLgcwC6vTeK4BbzzCENjJrGnLO7-xqeIX0SA&s",
  },
  {
    id_merchandise: 7,
    nama_merch: "Jam Dinding ReUse",
    harga_poin: 500,
    stok: 15,
    url_gambar:
      "https://cdn.ruparupa.io/fit-in/400x400/filters:format(webp)/filters:quality(90)/ruparupa-com/image/upload/Products/10551371_1.jpg",
  },
  {
    id_merchandise: 8,
    nama_merch: "Tas Travel Lipat",
    harga_poin: 1000,
    stok: 25,
    url_gambar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuu66nmQBlte9a-R6I6UPwlYZ9INqlC5aomA&s",
  },
  {
    id_merchandise: 9,
    nama_merch: "Payung ReUseMart",
    harga_poin: 1000,
    stok: 12,
    url_gambar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgE6RFIp6FIqM6zYBeNF4Agh_yVsKNiZoIgg&s",
  },
  {
    id_merchandise: 10,
    nama_merch: "Gantungan Kunci ReUseMart",
    harga_poin: 100,
    stok: 0,
    url_gambar: "https://qirama.com/wp-content/uploads/2023/04/pin.png",
  },
  {
    id_merchandise: 11,
    nama_merch: "Tote Bag ReUseMart",
    harga_poin: 250,
    stok: 15,
    url_gambar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlTPetj2qTpLnp3s9C5abix-902gpiy-eaog&s",
  },
  {
    id_merchandise: 12,
    nama_merch: "Stiker Ramah Lingkungan",
    harga_poin: 50,
    stok: 100,
    url_gambar:
      "https://u7.uidownload.com/vector/400/57/vector-eco-with-organic-food-stickers-vector-eps-ai.jpg",
  },
  {
    id_merchandise: 13,
    nama_merch: "Tempat Pensil Kanvas",
    harga_poin: 400,
    stok: 30,
    url_gambar:
      "https://id-test-11.slatic.net/p/9c763e3985e8fcef88d1dbd52d95e320.jpg",
  },
  {
    id_merchandise: 14,
    nama_merch: "Notebook Daur Ulang",
    harga_poin: 300,
    stok: 40,
    url_gambar:
      "https://cdn.ready-market.com.tw/64d58f48/Templates/pic/PUNDY-hardcover_notebook_255-01.jpg?v=17b7935d",
  },
  {
    id_merchandise: 15,
    nama_merch: "Pin ReUseMart",
    harga_poin: 200,
    stok: 50,
    url_gambar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ1S5R9h28L_BzSxBoaPmfe7tCoP5u7XYDdg&s",
  },
  {
    id_merchandise: 16,
    nama_merch: "Botol Minum ReUseMart",
    harga_poin: 300,
    stok: 20,
    url_gambar:
      "https://contents.mediadecathlon.com/p1329512/k$41a5c1f30dde1202ccbd5749c55cdf5b/botol-minum-plastik-tritan-100-0-8-l-tutup-screw-quechua-8492776.jpg?f=1920x0&format=auto",
  },
  {
    id_merchandise: 17,
    nama_merch: "Mousepad Eco-Friendly",
    harga_poin: 150,
    stok: 50,
    url_gambar:
      "https://www.softcom.co.id/wp-content/uploads/2020/11/Mousepad-Razer-Gigantus-V2-Large.jpg",
  },
  {
    id_merchandise: 18,
    nama_merch: "Kalender Daur Ulang",
    harga_poin: 200,
    stok: 30,
    url_gambar:
      "https://www.gundalingprint.com/liteprint/application/liteprint/gundaling/assets/product_image/1660209953299-MEJA-7-LBR-210.png",
  },
  {
    id_merchandise: 19,
    nama_merch: "Sandal ReUseMart",
    harga_poin: 400,
    stok: 15,
    url_gambar:
      "https://contents.mediadecathlon.com/p2829751/k$6257a44ffba39d1a3deea873edd25a53/sandal-jepit-wanita-100-hitam-olaian-8731819.jpg",
  },
  {
    id_merchandise: 20,
    nama_merch: "Buku Catatan Kecil",
    harga_poin: 100,
    stok: 60,
    url_gambar:
      "https://images.tokopedia.net/img/cache/700/VqbcmM/2021/11/8/b56ed54a-67cf-47cd-aa25-b41ec9bae0b5.jpg",
  },
];

export async function merchandiseSeeding(prismaClient) {
  await prismaClient.merchandise.createMany({
    data: listMerchandise,
  });
}
