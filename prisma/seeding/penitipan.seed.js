const listPenitipan = [
    {
        id_penitipan: 1,
        id_penitip: 1,
        id_hunter: 10,
        id_pegawai_qc: 4,
    },
    {
        id_penitipan: 2,
        id_penitip: 2,
        id_hunter: null,
        id_pegawai_qc: 5,
    },
    {
        id_penitipan: 3,
        id_penitip: 3,
        id_hunter: 11,
        id_pegawai_qc: 12,
    },
    {
        id_penitipan: 4,
        id_penitip: 4,
        id_hunter: 10,
        id_pegawai_qc: 13,
    },
    {
        id_penitipan: 5,
        id_penitip: 5,
        id_hunter: null,
        id_pegawai_qc: 5,
    },
    {
        id_penitipan: 6,
        id_penitip: 6,
        id_hunter: 11,
        id_pegawai_qc: 4,
    },
    {
        id_penitipan: 7,
        id_penitip: 7,
        id_hunter: 10,
        id_pegawai_qc: 13,
    },
    {
        id_penitipan: 8,
        id_penitip: 8,
        id_hunter: null,
        id_pegawai_qc: 12,
    },
    {
        id_penitipan: 9,
        id_penitip: 9,
        id_hunter: 11,
        id_pegawai_qc: 5,
    },
    {
        id_penitipan: 10,
        id_penitip: 10,
        id_hunter: 10,
        id_pegawai_qc: 4,
    },
    {
        id_penitipan: 11,
        id_penitip: 11,
        id_hunter: 18,
        id_pegawai_qc: 19,
    },
    {
        id_penitipan: 12,
        id_penitip: 12,
        id_hunter: null,
        id_pegawai_qc: 4,
    },
    {
        id_penitipan: 13,
        id_penitip: 13,
        id_hunter: 10,
        id_pegawai_qc: 12,
    },
    {
        id_penitipan: 14,
        id_penitip: 14,
        id_hunter: 18,
        id_pegawai_qc: 5,
    },
    {
        id_penitipan: 15,
        id_penitip: 15,
        id_hunter: null,
        id_pegawai_qc: 13,
    },
];

export async function penitipanSeeding(prismaClient) {
    await prismaClient.penitipan.createMany({
        data: listPenitipan,
    });
}
