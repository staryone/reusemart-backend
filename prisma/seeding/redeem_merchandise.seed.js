const listRedeemMerchandise = [
    {
        id_redeem_merch: 1,
        tanggal_redeem: new Date("2025-04-11"),
        tanggal_ambil: new Date("2025-04-14"),
        id_pembeli: 1,
        id_merchandise: 1,
        jumlah_merch: 1,
        status: "SUDAH_DIAMBIL"
    },
    {
        id_redeem_merch: 2,
        tanggal_redeem: new Date("2025-04-12"),
        id_pembeli: 2,
        tanggal_ambil: null,
        id_merchandise: 4,
        jumlah_merch: 1,
        status: "BELUM_DIAMBIL"
    },
    {
        id_redeem_merch: 3,
        tanggal_redeem: new Date("2025-04-13"),
        id_pembeli: 4,
        tanggal_ambil: null,
        id_merchandise: 2,
        jumlah_merch: 1,
        status: "BELUM_DIAMBIL"
    },
    {
        id_redeem_merch: 4,
        tanggal_redeem: new Date("2025-04-14"),
        id_pembeli: 5,
        tanggal_ambil: new Date("2025-04-15"),
        id_merchandise: 8,
        jumlah_merch: 1,
        status: "SUDAH_DIAMBIL"
    },
    {
        id_redeem_merch: 5,
        tanggal_redeem: new Date("2025-04-15"),
        id_pembeli: 6,
        tanggal_ambil: null,
        id_merchandise: 2,
        jumlah_merch: 1,
        status: "BELUM_DIAMBIL"
    },
    {
        id_redeem_merch: 6,
        tanggal_redeem: new Date("2025-04-16"),
        id_pembeli: 7,
        tanggal_ambil: new Date("2025-04-20"),
        id_merchandise: 3,
        jumlah_merch: 1,
        status: "SUDAH_DIAMBIL"
    },
    {
        id_redeem_merch: 7,
        tanggal_redeem: new Date("2025-04-17"),
        id_pembeli: 8,
        tanggal_ambil: new Date("2025-04-19"),
        id_merchandise: 3,
        jumlah_merch: 1,
        status: "SUDAH_DIAMBIL"
    },
    {
        id_redeem_merch: 8,
        tanggal_redeem: new Date("2025-04-18"),
        id_pembeli: 9,
        tanggal_ambil: new Date("2025-04-21"),
        id_merchandise: 4,
        jumlah_merch: 1,
        status: "SUDAH_DIAMBIL"
    },
    {
        id_redeem_merch: 9,
        tanggal_redeem: new Date("2025-04-19"),
        id_pembeli: 10,
        tanggal_ambil: null,
        id_merchandise: 9,
        jumlah_merch: 1,
        status: "BELUM_DIAMBIL"
    },
    {
        id_redeem_merch: 10,
        tanggal_redeem: new Date("2025-04-20"),
        id_pembeli: 3,
        tanggal_ambil: new Date("2025-04-21"),
        id_merchandise: 4,
        jumlah_merch: 1,
        status: "SUDAH_DIAMBIL"
    },
    {
        id_redeem_merch: 11,
        tanggal_redeem: new Date("2025-04-25 08:45:20.000"),
        id_pembeli: 11,
        tanggal_ambil: new Date("2025-04-27"),
        id_merchandise: 16,
        jumlah_merch: 1,
        status: "SUDAH_DIAMBIL"
    },
    {
        id_redeem_merch: 12,
        tanggal_redeem: new Date("2025-04-26 14:30:15.000"),
        id_pembeli: 12,
        tanggal_ambil: null,
        id_merchandise: 16,
        jumlah_merch: 1,
        status: "BELUM_DIAMBIL"
    },
    {
        id_redeem_merch: 13,
        tanggal_redeem: new Date("2025-04-27 10:15:45.000"),
        id_pembeli: 13,
        tanggal_ambil: null,
        id_merchandise: 18,
        jumlah_merch: 1,
        status: "BELUM_DIAMBIL"
    },
    {
        id_redeem_merch: 14,
        tanggal_redeem: new Date("2025-04-28 16:20:30.000"),
        id_pembeli: 14,
        tanggal_ambil: null,
        id_merchandise: 19,
        jumlah_merch: 1,
        status: "BELUM_DIAMBIL"
    },
    {
        id_redeem_merch: 15,
        tanggal_redeem: new Date("2025-04-29 09:50:10.000"),
        id_pembeli: 15,
        tanggal_ambil: null,
        id_merchandise: 20,
        jumlah_merch: 1,
        status: "BELUM_DIAMBIL"
    },
];

export async function redeemMerchandiseSeeding(prismaClient) {
    await prismaClient.redeemMerchandise.createMany({
        data: listRedeemMerchandise,
    });
}
