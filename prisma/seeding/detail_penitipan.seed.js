const listDetailPenitipan = [
    {
        id_dtl_penitipan: 1,
        id_penitipan: 1,
        id_barang: 1,
    },
    {
        id_dtl_penitipan: 2,
        id_penitipan: 2,
        id_barang: 2,
    },
    {
        id_dtl_penitipan: 3,
        id_penitipan: 3,
        id_barang: 3,
    },
    {
        id_dtl_penitipan: 4,
        id_penitipan: 4,
        id_barang: 4,
    },
    {
        id_dtl_penitipan: 5,
        id_penitipan: 5,
        id_barang: 5,
    },
    {
        id_dtl_penitipan: 6,
        id_penitipan: 6,
        id_barang: 6,
    },
    {
        id_dtl_penitipan: 7,
        id_penitipan: 7,
        id_barang: 7,
    },
    {
        id_dtl_penitipan: 8,
        id_penitipan: 8,
        id_barang: 8,
    },
    {
        id_dtl_penitipan: 9,
        id_penitipan: 9,
        id_barang: 9,
    },
    {
        id_dtl_penitipan: 10,
        id_penitipan: 10,
        id_barang: 10,
    },
    {
        id_dtl_penitipan: 11,
        id_penitipan: 1,
        id_barang: 11,
    },
    {
        id_dtl_penitipan: 12,
        id_penitipan: 2,
        id_barang: 12,
    },
    {
        id_dtl_penitipan: 13,
        id_penitipan: 3,
        id_barang: 13,
    },
    {
        id_dtl_penitipan: 14,
        id_penitipan: 3,
        id_barang: 14,
    },
    {
        id_dtl_penitipan: 15,
        id_penitipan: 5,
        id_barang: 15,
    },
    {
        id_dtl_penitipan: 16,
        id_penitipan: 7,
        id_barang: 16,
    },
    {
        id_dtl_penitipan: 17,
        id_penitipan: 8,
        id_barang: 17,
    },
    {
        id_dtl_penitipan: 18,
        id_penitipan: 9,
        id_barang: 18,
    },
    {
        id_dtl_penitipan: 19,
        id_penitipan: 10,
        id_barang: 19,
    },
    {
        id_dtl_penitipan: 20,
        id_penitipan: 10,
        id_barang: 20,
    },
    {
        id_dtl_penitipan: 21,
        id_penitipan: 9,
        id_barang: 31,
    },
    {
        id_dtl_penitipan: 22,
        id_penitipan: 8,
        id_barang: 32,
    },
    {
        id_dtl_penitipan: 23,
        id_penitipan: 11,
        id_barang: 33,
    },
    {
        id_dtl_penitipan: 24,
        id_penitipan: 11,
        id_barang: 34,
    },
    {
        id_dtl_penitipan: 25,
        id_penitipan: 12,
        id_barang: 35,
    },
    {
        id_dtl_penitipan: 26,
        id_penitipan: 12,
        id_barang: 36,
    },
    {
        id_dtl_penitipan: 27,
        id_penitipan: 13,
        id_barang: 37,
    },
    {
        id_dtl_penitipan: 28,
        id_penitipan: 13,
        id_barang: 38,
    },
    {
        id_dtl_penitipan: 29,
        id_penitipan: 14,
        id_barang: 39,
    },
    {
        id_dtl_penitipan: 30,
        id_penitipan: 14,
        id_barang: 40,
    },
    {
        id_dtl_penitipan: 31,
        id_penitipan: 15,
        id_barang: 41,
    },
    {
        id_dtl_penitipan: 32,
        id_penitipan: 15,
        id_barang: 42,
    },
    {
        id_dtl_penitipan: 33,
        id_penitipan: 11,
        id_barang: 43,
    },
    {
        id_dtl_penitipan: 34,
        id_penitipan: 12,
        id_barang: 44,
    },
    {
        id_dtl_penitipan: 35,
        id_penitipan: 13,
        id_barang: 45,
    },
    {
        id_dtl_penitipan: 36,
        id_penitipan: 14,
        id_barang: 46,
    },
    {
        id_dtl_penitipan: 37,
        id_penitipan: 15,
        id_barang: 47,
    },
];

export async function detailPenitipanSeeding(prismaClient) {
    await prismaClient.detailPenitipan.createMany({
        data: listDetailPenitipan,
    });
}
