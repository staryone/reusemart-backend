const listDetailTransaksi = [
    {
        id_dtl_transaksi: 1,
        id_barang: 2,
        id_transaksi: 1
    },
    {
        id_dtl_transaksi: 2,
        id_barang: 1,
        id_transaksi: 2
    },
    {
        id_dtl_transaksi: 3,
        id_barang: 3,
        id_transaksi: 2
    },
    {
        id_dtl_transaksi: 4,
        id_barang: 6,
        id_transaksi: 3
    },
    {
        id_dtl_transaksi: 5,
        id_barang: 8,
        id_transaksi: 4
    },
    {
        id_dtl_transaksi: 6,
        id_barang: 4,
        id_transaksi: 5
    },
    {
        id_dtl_transaksi: 7,
        id_barang: 5,
        id_transaksi: 5
    },
    {
        id_dtl_transaksi: 8,
        id_barang: 10,
        id_transaksi: 6
    },
    {
        id_dtl_transaksi: 9,
        id_barang: 15,
        id_transaksi: 7
    },
    {
        id_dtl_transaksi: 10,
        id_barang: 12,
        id_transaksi: 8
    },
    {
        id_dtl_transaksi: 11,
        id_barang: 7,
        id_transaksi: 9
    },
    {
        id_dtl_transaksi: 12,
        id_barang: 9,
        id_transaksi: 9
    },
    {
        id_dtl_transaksi: 13,
        id_barang: 13,
        id_transaksi: 10
    },
    {
        id_dtl_transaksi: 14,
        id_barang: 14,
        id_transaksi: 11
    },
    {
        id_dtl_transaksi: 15,
        id_barang: 11,
        id_transaksi: 12
    },
    {
        id_dtl_transaksi: 16,
        id_barang: 16,
        id_transaksi: 12
    },
];

export async function detailTransaksiSeeding(prismaClient) {
    await prismaClient.detailTransaksi.createMany({
        data: listDetailTransaksi,
    });
}
