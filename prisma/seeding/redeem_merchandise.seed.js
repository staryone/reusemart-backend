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
    },
    {
        id_redeem_merch: 11,
        tanggal_redeem: new Date("2025-04-25 08:45:20.000"),
        id_pembeli: 11,
    },
    {
        id_redeem_merch: 12,
        tanggal_redeem: new Date("2025-04-26 14:30:15.000"),
        id_pembeli: 12,
    },
    {
        id_redeem_merch: 13,
        tanggal_redeem: new Date("2025-04-27 10:15:45.000"),
        id_pembeli: 13,
    },
    {
        id_redeem_merch: 14,
        tanggal_redeem: new Date("2025-04-28 16:20:30.000"),
        id_pembeli: 14,
    },
    {
        id_redeem_merch: 15,
        tanggal_redeem: new Date("2025-04-29 09:50:10.000"),
        id_pembeli: 15,
    },
];

export async function redeemMerchandiseSeeding(prismaClient) {
    await prismaClient.redeemMerchandise.createMany({
        data: listRedeemMerchandise,
    });
}
