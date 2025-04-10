const listKeranjang = [
    {
        id_keranjang: 1,
        id_barang: 3,
        id_pembeli: 3,
    },
    {
        id_keranjang: 2,
        id_barang: 14,
        id_pembeli: 7,
    },
    {
        id_keranjang: 3,
        id_barang: 5,
        id_pembeli: 2,
    },
    {
        id_keranjang: 4,
        id_barang: 1,
        id_pembeli: 8,
    },
    {
        id_keranjang: 5,
        id_barang: 17,
        id_pembeli: 5,
    },
    {
        id_keranjang: 6,
        id_barang: 9,
        id_pembeli: 4,
    },
    {
        id_keranjang: 7,
        id_barang: 12,
        id_pembeli: 10,
    },
    {
        id_keranjang: 8,
        id_barang: 6,
        id_pembeli: 1,
    },
    {
        id_keranjang: 9,
        id_barang: 18,
        id_pembeli: 6,
    },
    {
        id_keranjang: 10,
        id_barang: 2,
        id_pembeli: 9,
    },
    {
        id_keranjang: 11,
        id_barang: 38,
        id_pembeli: 11,
    },
    {
        id_keranjang: 12,
        id_barang: 39,
        id_pembeli: 12,
    },
    {
        id_keranjang: 13,
        id_barang: 42,
        id_pembeli: 13,
    },
    {
        id_keranjang: 14,
        id_barang: 33,
        id_pembeli: 14,
    },
    {
        id_keranjang: 15,
        id_barang: 34,
        id_pembeli: 15,
    },
];

export async function keranjangSeeding(prismaClient) {
    await prismaClient.keranjang.createMany({
        data: listKeranjang,
    });
}
