const listDetailRedeemMerchandise = [
    {
        id_dtl_redeem_merch: 1,
        jumlah_merch: 1,
        id_redeem_merch: 1,
        id_merchandise: 1,
    },
    {
        id_dtl_redeem_merch: 2,
        jumlah_merch: 1,
        id_redeem_merch: 1,
        id_merchandise: 3,
    },
    {
        id_dtl_redeem_merch: 3,
        jumlah_merch: 1,
        id_redeem_merch: 2,
        id_merchandise: 4,
    },
    {
        id_dtl_redeem_merch: 4,
        jumlah_merch: 1,
        id_redeem_merch: 3,
        id_merchandise: 2,
    },
    {
        id_dtl_redeem_merch: 5,
        jumlah_merch: 1,
        id_redeem_merch: 4,
        id_merchandise: 8,
    },
    {
        id_dtl_redeem_merch: 6,
        jumlah_merch: 1,
        id_redeem_merch: 5,
        id_merchandise: 2,
    },
    {
        id_dtl_redeem_merch: 7,
        jumlah_merch: 1,
        id_redeem_merch: 5,
        id_merchandise: 4,
    },
    {
        id_dtl_redeem_merch: 8,
        jumlah_merch: 1,
        id_redeem_merch: 6,
        id_merchandise: 3,
    },
    {
        id_dtl_redeem_merch: 9,
        jumlah_merch: 1,
        id_redeem_merch: 6,
        id_merchandise: 4,
    },
    {
        id_dtl_redeem_merch: 10,
        jumlah_merch: 1,
        id_redeem_merch: 7,
        id_merchandise: 3,
    },
    {
        id_dtl_redeem_merch: 11,
        jumlah_merch: 1,
        id_redeem_merch: 7,
        id_merchandise: 6,
    },
    {
        id_dtl_redeem_merch: 12,
        jumlah_merch: 1,
        id_redeem_merch: 8,
        id_merchandise: 4,
    },
    {
        id_dtl_redeem_merch: 13,
        jumlah_merch: 1,
        id_redeem_merch: 9,
        id_merchandise: 2,
    },
    {
        id_dtl_redeem_merch: 14,
        jumlah_merch: 1,
        id_redeem_merch: 9,
        id_merchandise: 9,
    },
    {
        id_dtl_redeem_merch: 15,
        jumlah_merch: 1,
        id_redeem_merch: 10,
        id_merchandise: 4,
    },
    {
        id_dtl_redeem_merch: 16,
        jumlah_merch: 1,
        id_redeem_merch: 11,
        id_merchandise: 16,
    },
    {
        id_dtl_redeem_merch: 17,
        jumlah_merch: 1,
        id_redeem_merch: 12,
        id_merchandise: 17,
    },
    {
        id_dtl_redeem_merch: 18,
        jumlah_merch: 1,
        id_redeem_merch: 13,
        id_merchandise: 18,
    },
    {
        id_dtl_redeem_merch: 19,
        jumlah_merch: 1,
        id_redeem_merch: 14,
        id_merchandise: 19,
    },
    {
        id_dtl_redeem_merch: 20,
        jumlah_merch: 1,
        id_redeem_merch: 15,
        id_merchandise: 20,
    },
];

export async function detailRedeemMerchandiseSeeding(prismaClient) {
    await prismaClient.detailRedeemMerchandise.createMany({
        data: listDetailRedeemMerchandise,
    });
}
