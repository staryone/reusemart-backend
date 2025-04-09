const listRedeemMerchandise = [
    {
        // id_redeem_merch: ,
        // tanggal_redeem: ,
        // id_pembeli: ,
    },
];

export async function redeemMerchandiseSeeding(prismaClient) {
    await prismaClient.redeemMerchandise.createMany({
        data: listRedeemMerchandise,
    });
}
