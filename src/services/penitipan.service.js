import { prismaClient } from "../application/database.js";
import { ResponseError } from "../errors/response.error.js";
import { createPenitipanValidation } from "../validation/penitipan.validate.js";
import { validate } from "../validation/validate.js";
import { getUrlFile } from "../application/storage.js";
import barangService from "./barang.service.js";
import { generateNomorNota, idToString } from "../utils/formater.util.js";
import notifikasiService from "./notifikasi.service.js";
import { startOfDay, endOfDay } from 'date-fns';

const create = async (
  barangDataArray,
  penitipanData,
  detailPenitipanDataArray
) => {
  // Validate penitipanData using Joi schema
  // console.log("\n\n", detailPenitipanDataArray);
  const validatedPenitipanData = validate(
    createPenitipanValidation,
    penitipanData
  );

  // Validate input data
  if (!Array.isArray(barangDataArray) || barangDataArray.length === 0) {
    throw new ResponseError(400, "At least one barangData is required");
  }
  if (
    !Array.isArray(detailPenitipanDataArray) ||
    detailPenitipanDataArray.length === 0 ||
    detailPenitipanDataArray.length !== barangDataArray.length
  ) {
    throw new ResponseError(
      400,
      "detailPenitipanDataArray must match barangDataArray in length"
    );
  }
  if (
    detailPenitipanDataArray.some((d) => !d.tanggal_akhir || !d.batas_ambil)
  ) {
    throw new ResponseError(
      400,
      "Each detailPenitipan must have tanggal_akhir and batas_ambil"
    );
  }

  // Use a transaction to ensure atomicity
  const result = await prismaClient.$transaction(async (tx) => {
    // Step 1: Create multiple Barang records
    const idBarangArray = await Promise.all(
      barangDataArray.map((barangData) =>
        barangService.create(barangData, validatedPenitipanData.id_penitip)
      )
    );

    // Step 2: Create Penitipan record
    const penitipan = await tx.penitipan.create({
      data: {
        id_penitip: validatedPenitipanData.id_penitip,
        id_pegawai_qc: validatedPenitipanData.id_pegawai_qc,
        id_hunter: validatedPenitipanData.id_hunter || null, // Optional field
      },
    });

    // Step 3: Create DetailPenitipan records
    const detailPenitipanRecords = detailPenitipanDataArray.map(
      (detail, index) => ({
        id_penitipan: penitipan.id_penitipan,
        id_barang: idBarangArray[index],
        tanggal_masuk: new Date(), // Defaults to now
        tanggal_akhir: new Date(detail.tanggal_akhir),
        batas_ambil: new Date(detail.batas_ambil),
        tanggal_laku: detail.tanggal_laku
          ? new Date(detail.tanggal_laku)
          : null,
        is_perpanjang: detail.is_perpanjang || false,
      })
    );

    const detailPenitipan = await tx.detailPenitipan.createMany({
      data: detailPenitipanRecords,
    });

    return {
      penitipan,
      detailPenitipan: detailPenitipanRecords, // Return formatted input data
      barang: idBarangArray.map((id_barang) => ({ id_barang })),
      message: "Barang, Penitipan, and DetailPenitipan created successfully",
    };
  });

  return result;
};

const getList = async (request) => {
  const page = parseInt(request.page) || 1;
  const limit = parseInt(request.limit) || 10;
  const skip = (page - 1) * limit;
  const q = request.search;
  const filter = request.status;
  const startDate = request.startDate ? new Date(request.startDate) : undefined;
  const endDate = request.endDate ? new Date(request.endDate) : undefined;

  // Validate dates
  if (startDate && isNaN(startDate.getTime())) {
    throw new Error("Invalid start date format");
  }
  if (endDate && isNaN(endDate.getTime())) {
    throw new Error("Invalid end date format");
  }

  // Base where clause for search and filter
  const baseWhere =
    q || filter
      ? {
          OR: [
            q
              ? {
                  penitipan: {
                    penitip: {
                      nama: {
                        contains: q,
                      },
                    },
                  },
                }
              : null,
            q
              ? {
                  barang: {
                    nama_barang: {
                      contains: q,
                    },
                  },
                }
              : null,
            q && !isNaN(Number(q))
              ? {
                  barang: {
                    harga: {
                      equals: Number(q),
                    },
                  },
                }
              : null,
            filter
              ? {
                  barang: {
                    status: {
                      equals: filter,
                    },
                  },
                }
              : null,
          ].filter(Boolean),
        }
      : {};

  // Add date range filter to the where clause
  const dateRangeFilter =
    startDate || endDate
      ? {
          tanggal_masuk: {
            ...(startDate ? { gte: startDate } : {}),
            ...(endDate ? { lte: endDate } : {}),
          },
        }
      : {};

  // Combine base filters with date range filter
  const whereClause = {
    ...baseWhere,
    ...(startDate || endDate ? dateRangeFilter : {}),
    ...(baseWhere.OR ? { AND: [baseWhere] } : {}), // Wrap baseWhere in AND if OR exists
  };

  const countAllPenitipan = await prismaClient.detailPenitipan.count({
    where: whereClause,
  });

  const findManyOptions = {
    where: whereClause,
    include: {
      barang: {
        select: {
          id_barang: true,
          nama_barang: true,
          harga: true,
          status: true,
          deskripsi: true,
          berat: true,
          garansi: true,
          kategori: true,
          prefix: true,
          gambar: true,
        },
      },
      penitipan: {
        select: {
          id_penitipan: true,
          penitip: true,
          pegawai_qc: true,
          hunter: true,
        },
      },
    },
    orderBy: {
      tanggal_masuk: "desc",
    },
  };

  if (!request.all && skip !== undefined && limit !== undefined) {
    findManyOptions.skip = skip;
    findManyOptions.take = limit;
  }

  const listPenitipan = await prismaClient.detailPenitipan.findMany(
    findManyOptions
  );

  const formattedPenitipan = await Promise.all(
    listPenitipan.map(async (p) => {
      const gambarPromises = p.barang.gambar.map(async (g) => {
        try {
          const url = await getUrlFile(g.url_gambar);
          return {
            id_gambar: g.id_gambar,
            url_gambar: url,
            order_number: g.order_number,
            is_primary: g.is_primary,
            id_barang: g.id_barang,
            createdAt: g.createdAt,
            updatedAt: g.updatedAt,
          };
        } catch {
          return {
            id_gambar: g.id_gambar,
            url_gambar: null,
            order_number: g.order_number,
            is_primary: g.is_primary,
            id_barang: g.id_barang,
            createdAt: g.createdAt,
            updatedAt: g.updatedAt,
          };
        }
      });
      const gambarResults = await Promise.allSettled(gambarPromises);
      const gambar = gambarResults.map((result) => {
        if (result.status === "fulfilled") {
          return result.value;
        }
        return result.reason;
      });
      return {
        id_dtl_penitipan: p.id_dtl_penitipan,
        nomorNota: generateNomorNota(p.tanggal_masuk, p.id_dtl_penitipan),
        tanggal_masuk: p.tanggal_masuk,
        tanggal_akhir: p.tanggal_akhir,
        tanggal_laku: p.tanggal_laku,
        batas_ambil: p.batas_ambil,
        is_perpanjang: p.is_perpanjang,
        penitipan: p.penitipan,
        barang: {
          id_barang: idToString(p.barang.prefix, p.barang.id_barang),
          nama_barang: p.barang.nama_barang,
          deskripsi: p.barang.deskripsi,
          harga: p.barang.harga,
          status: p.barang.status,
          garansi: p.barang.garansi ? p.barang.garansi : null,
          berat: p.barang.berat,
          kategori: p.barang.kategori,
          gambar: gambar,
        },
      };
    })
  );
  return [formattedPenitipan, countAllPenitipan];
};

const getLaporanKomisi = async (request) => {
  const q = request.search;
  const filter = request.status;
  const startDate = request.startDate ? new Date(request.startDate) : undefined;
  const endDate = request.endDate ? new Date(request.endDate) : undefined;

  // Validate dates
  if (startDate && isNaN(startDate.getTime())) {
    throw new Error("Invalid start date format");
  }
  if (endDate && isNaN(endDate.getTime())) {
    throw new Error("Invalid end date format");
  }

  // Base where clause for search and filter
  const baseWhere =
    q || filter
      ? {
          OR: [
            q
              ? {
                  penitipan: {
                    penitip: {
                      nama: {
                        contains: q,
                      },
                    },
                  },
                }
              : null,
            q
              ? {
                  barang: {
                    nama_barang: {
                      contains: q,
                    },
                  },
                }
              : null,
            filter
              ? {
                  barang: {
                    status: {
                      equals: filter,
                    },
                  },
                }
              : null,
          ].filter(Boolean),
        }
      : {};

  // Add date range filter to the where clause
  const dateRangeFilter =
    startDate || endDate
      ? {
          tanggal_masuk: {
            ...(startDate ? { gte: startDate } : {}),
            ...(endDate ? { lte: endDate } : {}),
          },
        }
      : {};

  // Combine base filters with date range filter
  const whereClause = {
    ...baseWhere,
    ...(startDate || endDate ? dateRangeFilter : {}),
    ...(baseWhere.OR ? { AND: [baseWhere] } : {}), // Wrap baseWhere in AND if OR exists
  };

  const countAllPenitipan = await prismaClient.detailPenitipan.count({
    where: whereClause,
  });

  const listPenitipan = await prismaClient.detailPenitipan.findMany({
    where: whereClause,
    include: {
      barang: {
        select: {
          id_barang: true,
          nama_barang: true,
          harga: true,
          status: true,
          deskripsi: true,
          berat: true,
          garansi: true,
          kategori: true,
          prefix: true,
          gambar: true,
          detail_transaksi: {
            select: {
              komisi_hunter: true,
              komisi_penitip: true,
              komisi_reusemart: true,
            },
          },
        },
      },
      penitipan: {
        select: {
          id_penitipan: true,
          penitip: true,
          pegawai_qc: true,
          hunter: true,
        },
      },
    },
    orderBy: {
      tanggal_masuk: "desc",
    },
  });

  const formattedPenitipan = await Promise.all(
    listPenitipan.map(async (p) => {
      const gambarPromises = p.barang.gambar.map(async (g) => {
        try {
          const url = await getUrlFile(g.url_gambar);
          return {
            id_gambar: g.id_gambar,
            url_gambar: url,
            order_number: g.order_number,
            is_primary: g.is_primary,
            id_barang: g.id_barang,
            createdAt: g.createdAt,
            updatedAt: g.updatedAt,
          };
        } catch {
          return {
            id_gambar: g.id_gambar,
            url_gambar: null,
            order_number: g.order_number,
            is_primary: g.is_primary,
            id_barang: g.id_barang,
            createdAt: g.createdAt,
            updatedAt: g.updatedAt,
          };
        }
      });
      const gambarResults = await Promise.allSettled(gambarPromises);
      const gambar = gambarResults.map((result) => {
        if (result.status === "fulfilled") {
          return result.value;
        }
        return result.reason;
      });
      const detailTransaksi = await prismaClient.detailTransaksi.findFirst({
        where: {
          id_barang: p.id_barang,
        },
      });
      return {
        id_dtl_penitipan: p.id_dtl_penitipan,
        nomorNota: generateNomorNota(p.tanggal_masuk, p.id_dtl_penitipan),
        tanggal_masuk: p.tanggal_masuk,
        tanggal_akhir: p.tanggal_akhir,
        tanggal_laku: p.tanggal_laku,
        batas_ambil: p.batas_ambil,
        is_perpanjang: p.is_perpanjang,
        penitipan: p.penitipan,
        barang: {
          id_barang: idToString(p.barang.prefix, p.barang.id_barang),
          nama_barang: p.barang.nama_barang,
          deskripsi: p.barang.deskripsi,
          harga: p.barang.harga,
          status: p.barang.status,
          garansi: p.barang.garansi ? p.barang.garansi : null,
          berat: p.barang.berat,
          kategori: p.barang.kategori,
          gambar: gambar,
          detail_transaksi: detailTransaksi,
        },
      };
    })
  );

  // console.log("\n\nData hehe", listPenitipan);

  return [formattedPenitipan, countAllPenitipan];
};

const getLaporanPenjualanBulanan = async (request) => {
  const q = request.search;
  const filter = request.status;
  const startDate = request.startDate ? new Date(request.startDate) : undefined;
  const endDate = request.endDate ? new Date(request.endDate) : undefined;

  // Validate dates
  if (startDate && isNaN(startDate.getTime())) {
    throw new Error("Invalid start date format");
  }
  if (endDate && isNaN(endDate.getTime())) {
    throw new Error("Invalid end date format");
  }

  // Base where clause for search and filter
  const baseWhere =
    filter === "TERJUAL" || q
      ? {
          OR: [
            q
              ? {
                  penitipan: {
                    penitip: {
                      nama: {
                        contains: q,
                      },
                    },
                  },
                }
              : null,
            q
              ? {
                  barang: {
                    nama_barang: {
                      contains: q,
                    },
                  },
                }
              : null,
            filter === "TERJUAL"
              ? {
                  barang: {
                    status: {
                      equals: "TERJUAL",
                    },
                  },
                }
              : null,
          ].filter(Boolean),
        }
      : {};

  // Add date range filter to the where clause
  const dateRangeFilter =
    startDate || endDate
      ? {
          tanggal_laku: {
            ...(startDate ? { gte: startDate } : {}),
            ...(endDate ? { lte: endDate } : {}),
          },
        }
      : {};

  // Combine base filters with date range filter
  const whereClause = {
    ...baseWhere,
    ...(startDate || endDate ? dateRangeFilter : {}),
    ...(baseWhere.OR ? { AND: [baseWhere] } : {}),
  };

  // Fetch all relevant data
  const listPenitipan = await prismaClient.detailPenitipan.findMany({
    where: whereClause,
    include: {
      barang: {
        select: {
          harga: true,
          status: true,
        },
      },
    },
    orderBy: {
      tanggal_laku: "asc",
    },
  });

  // Aggregate data by month manually
  const aggregatedData = listPenitipan.reduce((acc, item) => {
    if (item.barang.status !== "TERJUAL") return acc; // Double-check status
    const date = new Date(item.tanggal_laku);
    const monthYear = date.toLocaleDateString("id-ID", {
      month: "long",
      year: "numeric",
    });

    const existingMonth = acc.find((m) => m.month === monthYear);
    if (existingMonth) {
      existingMonth.itemsSold += 1;
      existingMonth.totalSales += item.barang.harga || 0;
    } else {
      acc.push({
        month: monthYear,
        itemsSold: 1,
        totalSales: item.barang.harga || 0,
      });
    }
    return acc;
  }, []);

  // Sort by date for consistency
  aggregatedData.sort((a, b) => {
    const dateA = new Date(a.month, 0).getTime();
    const dateB = new Date(b.month, 0).getTime();
    return dateA - dateB;
  });

  // Count total records for all months (optional, for completeness)
  const countAllPenitipan = await prismaClient.detailPenitipan.count({
    where: whereClause,
  });

  return [aggregatedData, countAllPenitipan];
};

const update = async (
  id_dtl_penitipan,
  barangDataArray,
  penitipanData,
  detailPenitipanDataArray,
  existingGambarArrays
) => {
  // Validate penitipanData using Joi schema
  const validatedPenitipanData = validate(
    createPenitipanValidation,
    penitipanData
  );

  // Validate input data
  if (!id_dtl_penitipan) {
    throw new ResponseError(400, "id_dtl_penitipan is required");
  }
  if (!Array.isArray(barangDataArray) || barangDataArray.length === 0) {
    throw new ResponseError(400, "At least one barangData is required");
  }
  if (
    !Array.isArray(detailPenitipanDataArray) ||
    detailPenitipanDataArray.length === 0 ||
    detailPenitipanDataArray.length !== barangDataArray.length
  ) {
    throw new ResponseError(
      400,
      "detailPenitipanDataArray must match barangDataArray in length"
    );
  }
  if (
    detailPenitipanDataArray.some((d) => !d.tanggal_akhir || !d.batas_ambil)
  ) {
    throw new ResponseError(
      400,
      "Each detailPenitipan must have tanggal_akhir and batas_ambil"
    );
  }

  // Verify that the DetailPenitipan record exists
  const existingDetailPenitipan = await prismaClient.detailPenitipan.findUnique(
    {
      where: { id_dtl_penitipan: parseInt(id_dtl_penitipan) },
      include: {
        barang: true,
        penitipan: true,
      },
    }
  );

  if (!existingDetailPenitipan) {
    throw new ResponseError(404, "DetailPenitipan not found");
  }
  console.log("\n\nExisting gambar arrays", existingGambarArrays);
  // Use a transaction to ensure atomicity
  const result = await prismaClient.$transaction(async (tx) => {
    // Step 1: Update Barang record
    const barangData = barangDataArray[0]; // Assuming single barang per DetailPenitipan
    const existingGambar = existingGambarArrays ? existingGambarArrays : []; // Array of { id_gambar }
    console.log(existingGambar);
    const id_barang =
      existingDetailPenitipan.barang.prefix +
      existingDetailPenitipan.barang.id_barang;
    const updatedBarangId = await barangService.update(
      id_barang,
      barangData,
      validatedPenitipanData.id_penitip,
      existingGambar
    );

    // Step 2: Update Penitipan record
    const penitipan = await tx.penitipan.update({
      where: { id_penitipan: existingDetailPenitipan.penitipan.id_penitipan },
      data: {
        id_penitip: validatedPenitipanData.id_penitip,
        id_pegawai_qc: validatedPenitipanData.id_pegawai_qc,
        id_hunter: validatedPenitipanData.id_hunter || null,
      },
    });

    // Step 3: Update DetailPenitipan record
    const detailPenitipanData = detailPenitipanDataArray[0]; // Assuming single detail per DetailPenitipan
    const detailPenitipan = await tx.detailPenitipan.update({
      where: { id_dtl_penitipan: parseInt(id_dtl_penitipan) },
      data: {
        id_penitipan: penitipan.id_penitipan,
        id_barang: updatedBarangId,
        tanggal_masuk: new Date(detailPenitipanData.tanggal_masuk),
        tanggal_akhir: new Date(detailPenitipanData.tanggal_akhir),
        batas_ambil: new Date(detailPenitipanData.batas_ambil),
        tanggal_laku: detailPenitipanData.tanggal_laku
          ? new Date(detailPenitipanData.tanggal_laku)
          : null,
        is_perpanjang: detailPenitipanData.is_perpanjang || false,
      },
    });

    // Step 4: Format the response
    const formattedDetailPenitipan = {
      id_dtl_penitipan: detailPenitipan.id_dtl_penitipan,
      id_penitipan: detailPenitipan.id_penitipan,
      id_barang: detailPenitipan.id_barang,
      tanggal_masuk: detailPenitipan.tanggal_masuk,
      tanggal_akhir: detailPenitipan.tanggal_akhir,
      batas_ambil: detailPenitipan.batas_ambil,
      tanggal_laku: detailPenitipan.tanggal_laku,
      is_perpanjang: detailPenitipan.is_perpanjang,
    };

    return {
      penitipan,
      detailPenitipan: [formattedDetailPenitipan],
      barang: [{ id_barang: updatedBarangId }],
      message: "Barang, Penitipan, and DetailPenitipan updated successfully",
    };
  });

  return result;
};

const extendPenitipan = async (id_dtl_penitipan) => {
  if (!id_dtl_penitipan) {
    throw new ResponseError(400, "id_dtl_penitipan is required");
  }

  const existingDetailPenitipan = await prismaClient.detailPenitipan.findUnique(
    {
      where: { id_dtl_penitipan: parseInt(id_dtl_penitipan) },
    }
  );

  if (!existingDetailPenitipan) {
    throw new ResponseError(404, "DetailPenitipan not found");
  }

  if (existingDetailPenitipan.is_perpanjang) {
    throw new ResponseError(
      400,
      "Perpanjangan is not allowed because is_perpanjang is already true"
    );
  }

  const result = await prismaClient.$transaction(async (tx) => {
    const newTanggalAkhir = new Date(existingDetailPenitipan.tanggal_akhir);
    newTanggalAkhir.setDate(newTanggalAkhir.getDate() + 30);

    const newBatasAmbil = new Date(existingDetailPenitipan.batas_ambil);
    newBatasAmbil.setDate(newBatasAmbil.getDate() + 30);

    const updatedDetailPenitipan = await tx.detailPenitipan.update({
      where: { id_dtl_penitipan: parseInt(id_dtl_penitipan) },
      data: {
        tanggal_akhir: newTanggalAkhir,
        batas_ambil: newBatasAmbil,
        is_perpanjang: true,
      },
    });

    const formattedDetailPenitipan = {
      id_dtl_penitipan: updatedDetailPenitipan.id_dtl_penitipan,
      tanggal_akhir: updatedDetailPenitipan.tanggal_akhir,
      batas_ambil: updatedDetailPenitipan.batas_ambil,
      is_perpanjang: updatedDetailPenitipan.is_perpanjang,
    };

    return {
      detailPenitipan: formattedDetailPenitipan,
      message: "Penitipan extended successfully by 30 days",
    };
  });

  return result;
};

const checkMasaPenitipan = async () => {
  const now = new Date();
  const threeDaysFromNow = new Date(now);
  threeDaysFromNow.setDate(now.getDate() + 3);
  threeDaysFromNow.setHours(0, 0, 0, 0);
  const startOfToday = startOfDay(now); // 2025-06-01 00:00:00
  const endOfToday = endOfDay(now);

  let is_h3 = false;
  let is_h = false;

  const listPenitipanH3 = await prismaClient.detailPenitipan.findMany({
    where: {
      tanggal_akhir: {
        gte: threeDaysFromNow, // Greater than or equal to start of the day
        lt: new Date(threeDaysFromNow.getTime() + 24 * 60 * 60 * 1000), // Less than start of the next day
      },
    },
    include: {
      penitipan: {
        include: {
          penitip: true,
        },
      },
      barang: true,
    },
  });

  if (listPenitipanH3) {
    for (const detail of listPenitipanH3) {
      const penitip = detail.penitipan.penitip;
      const barang = detail.barang;
      const toSend = {
        user_id: penitip.id_user,
        title: "Masa Penitipan Hampir Habis",
        body: `Halo ${penitip.nama_penitip}, masa penitipan barang ${barang.nama_barang} sisa 3 hari, silahkan konfirmasi perpanjangan di website ReUseMart`,
      };
      console.log(toSend);
      await notifikasiService.sendNotification(toSend);
    }
    is_h3 = true;
  }

  const listPenitipanH = await prismaClient.detailPenitipan.findMany({
    where: {
      tanggal_akhir: {
        gte: startOfToday, 
        lt: endOfToday, 
      },
    },
    include: {
      penitipan: {
        include: {
          penitip: true,
        },
      },
      barang: true,
    },
  });

  if (listPenitipanH) {
    for (const detail of listPenitipanH) {
      const penitip = detail.penitipan.penitip;
      const barang = detail.barang;
      const toSend = {
        user_id: penitip.id_user,
        title: "Masa Penitipan Sudah Habis",
        body: `Halo ${penitip.nama_penitip}, masa penitipan barang ${barang.nama_barang} sudah habis! Silahkan mengambil barang ke kantor ReUseMart.`,
      };
      console.log(toSend);
      await notifikasiService.sendNotification(toSend);
    }
    is_h = true;
  }

  return is_h3 && is_h ? "H-3 dan hari H ada dan operasi berhasil" : is_h3 ? "H-3 ada dan operasi berhasil" : is_h ? "Hari H ada dan operasi berhasil" : "H-3 dan hari H tidak ada";
};

export default {
  create,
  getList,
  getLaporanKomisi,
  getLaporanPenjualanBulanan,
  update,
  extendPenitipan,
  checkMasaPenitipan
};
