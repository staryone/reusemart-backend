const listRedeemMerchandise = [
    {
        id_redeem_merch: 1,
        tanggal_redeem: new Date("2025-04-11"),
        id_pembeli: 1,
    },
    {
        id_redeem_merch: 2,
        tanggal_redeem: new Date("2025-04-12"),
        id_pembeli: 2,
    },
    {
        id_redeem_merch: 3,
        tanggal_redeem: new Date("2025-04-13"),
        id_pembeli: 4,
    },
    {
        id_redeem_merch: 4,
        tanggal_redeem: new Date("2025-04-14"),
        id_pembeli: 5,
    },
    {
        id_redeem_merch: 5,
        tanggal_redeem: new Date("2025-04-15"),
        id_pembeli: 6,
    },
    {
        id_redeem_merch: 6,
        tanggal_redeem: new Date("2025-04-16"),
        id_pembeli: 7,
    },
    {
        id_redeem_merch: 7,
        tanggal_redeem: new Date("2025-04-17"),
        id_pembeli: 8,
    },
    {
        id_redeem_merch: 8,
        tanggal_redeem: new Date("2025-04-18"),
        id_pembeli: 9,
    },
    {
        id_redeem_merch: 9,
        tanggal_redeem: new Date("2025-04-19"),
        id_pembeli: 10,
    },
    {
        id_redeem_merch: 10,
        tanggal_redeem: new Date("2025-04-20"),
        id_pembeli: 3,
    }
];

export async function redeemMerchandiseSeeding(prismaClient) {
    await prismaClient.redeemMerchandise.createMany({
        data: listRedeemMerchandise,
    });
}
