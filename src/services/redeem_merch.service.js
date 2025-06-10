import { prismaClient } from "../application/database.js";
import { ResponseError } from "../errors/response.error.js";
import { idToString } from "../utils/formater.util.js";
import {
  createRedeemMerchValidation,
  getRedeemMerchValidation,
  updateRedeemMerchValidation,
} from "../validation/redeem_merch.validate.js";
import { validate } from "../validation/validate.js";

// const create = async (request) => {
//   request = validate(createRedeemMerchValidation, request);

//   const currentMerch = await prismaClient.merchandise.findUnique({
//     where: {
//         id_merchandise: request.id_merchandise,
//       },
//   });

//   if(request.jumlah_merch > currentMerch.stok){
//     throw new ResponseError(400, "Jumlah merchandise yang tersedia tidak mencukupi")
//   }
//   else {
//     currentMerch.stok = currentMerch.stok - request.jumlah_merch;
//   }
//   return prismaClient.redeemMerchandise.create({
//     data: request,
//   });
// };
const create = async (request) => {
  request = validate(createRedeemMerchValidation, request);

  const currentMerch = await prismaClient.merchandise.findUnique({
    where: {
      id_merchandise: request.id_merchandise,
    },
  });

  if (!currentMerch) {
    throw new ResponseError(404, "Merchandise tidak ditemukan");
  }

  if (request.jumlah_merch > currentMerch.stok) {
    throw new ResponseError(
      400,
      "Jumlah merchandise yang tersedia tidak mencukupi"
    );
  }

  const pembeli = await prismaClient.pembeli.findUnique({
    where: {
      id_pembeli: request.id_pembeli,
    },
    select: {
      poin_loyalitas: true,
    },
  });

  if (!pembeli) {
    throw new ResponseError(404, "Pembeli tidak ditemukan");
  }

  const totalPointsRequired = currentMerch.harga_poin * request.jumlah_merch;

  if (pembeli.poin_loyalitas < totalPointsRequired) {
    throw new ResponseError(
      400,
      `Poin tidak cukup. Anda memiliki ${pembeli.poin_loyalitas} poin, diperlukan ${totalPointsRequired} poin.`
    );
  }

  const result = await prismaClient.$transaction([
    // Update merchandise stock
    prismaClient.merchandise.update({
      where: {
        id_merchandise: request.id_merchandise,
      },
      data: {
        stok: currentMerch.stok - request.jumlah_merch,
      },
    }),
    // Deduct buyer points
    prismaClient.pembeli.update({
      where: {
        id_pembeli: request.id_pembeli,
      },
      data: {
        poin_loyalitas: pembeli.poin_loyalitas - totalPointsRequired,
      },
    }),
    // Create redeemMerchandise record
    prismaClient.redeemMerchandise.create({
      data: request,
    }),
  ]);

  return result[2]; // Return the created redeemMerchandise record
};

const get = async (id, id_pembeli) => {
  const id_redeem_merch = validate(getRedeemMerchValidation, id);

  const redeem_merch = await prismaClient.redeemMerchandise.findUnique({
    where: {
      id_redeem_merch: id_redeem_merch,
    },
    include: {
      pembeli: true,
    },
  });

  if (!redeem_merch) {
    throw new ResponseError(404, "RedeemMerch tidak ditemukan");
  }

  if (redeem_merch.id_pembeli !== id_pembeli) {
    throw new ResponseError(
      401,
      "Anda hanya boleh mengakses redeem merch sendiri!"
    );
  }

  return redeem_merch;
};

// const getList = async (query, id_organisasi) => {
//   const page = parseInt(query.page) || 1;
//   const limit = parseInt(query.limit) || 10;
//   const skip = (page - 1) * limit;
//   const q = query.search;
//   const status = query.status;

//   const [countAllReqDonasi, listRequestDonasi, organisasi] = await Promise.all([
//     prismaClient.requestDonasi.count({
//       where: {
//         AND: [
//           {
//             id_organisasi: id_organisasi,
//           },
//           status
//             ? {
//                 status: status,
//               }
//             : {},
//           q
//             ? {
//                 OR: [
//                   {
//                     deskripsi: {
//                       contains: q,
//                     },
//                   },
//                 ],
//               }
//             : {},
//         ],
//       },
//     }),
//     prismaClient.requestDonasi.findMany({
//       where: {
//         AND: [
//           {
//             id_organisasi: id_organisasi,
//           },
//           status
//             ? {
//                 status: status,
//               }
//             : {},
//           q
//             ? {
//                 OR: [
//                   {
//                     deskripsi: {
//                       contains: q,
//                     },
//                   },
//                 ],
//               }
//             : {},
//         ],
//       },
//       skip: skip,
//       take: limit,
//     }),
//     prismaClient.organisasi.findUnique({
//       where: {
//         id_organisasi: id_organisasi,
//       },
//     }),
//   ]);

//   const formattedRequestDonasi = listRequestDonasi.map((request_donasi) => {
//     request_donasi.id_organisasi = idToString(
//       organisasi.prefix,
//       request_donasi.id_organisasi
//     );

//     return request_donasi;
//   });

//   return [formattedRequestDonasi, countAllReqDonasi];
// };

const getAllList = async (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;
  const q = query.search;
  const filter = query.filterStatus;

  // Build the where clause dynamically
  const whereClause =
    q || filter
      ? {
          OR: [
            q
              ? {
                  merchandise: {
                    nama_merch: {
                      contains: q,
                    },
                  },
                }
              : null,
            q
              ? {
                  pembeli: {
                    nama: {
                      contains: q,
                    },
                  },
                }
              : null,
            filter
              ? {
                  status: {
                    equals: filter, // Enum filter for status
                  },
                }
              : null,
          ].filter(Boolean), // Remove null entries
        }
      : {};

  const countAllRedeemMerch = await prismaClient.redeemMerchandise.count({
    where: whereClause,
  });

  const listRedeemMerch = await prismaClient.redeemMerchandise.findMany({
    where: whereClause,
    include: {
      pembeli: true,
      merchandise: true,
    },
    skip: skip,
    take: limit,
    orderBy: {tanggal_redeem: "desc"}
  });

  return [listRedeemMerch, countAllRedeemMerch];
};

const update = async (request) => {
  const updateRequest = validate(updateRedeemMerchValidation, request);

  const data = await prismaClient.redeemMerchandise.findUnique({
    where: {
      id_redeem_merch: updateRequest.id_redeem_merch,
    },
  });

  if (!data) {
    throw new ResponseError(404, "RedeemMerch tidak ditemukan!");
  }

  if (updateRequest.status) {
    data.status = updateRequest.status;
  }

  data.tanggal_ambil = new Date(Date.now());

  return prismaClient.redeemMerchandise.update({
    where: {
      id_redeem_merch: data.id_redeem_merch,
    },
    data: data,
  });
};

const getListByPembeli = async (id_pembeli, query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;
  const q = query.search;

  // Build the where clause dynamically
  const whereClause = {
    id_pembeli: id_pembeli,
    ...(q
      ? {
          OR: [
            {
              merchandise: {
                nama_merch: {
                  contains: q,
                },
              },
            },
          ],
        }
      : {}),
  };

  const [countAllRedeemMerch, listRedeemMerch] = await Promise.all([
    prismaClient.redeemMerchandise.count({
      where: whereClause,
    }),
    prismaClient.redeemMerchandise.findMany({
      where: whereClause,
      include: {
        pembeli: true,
        merchandise: true,
      },
      skip: skip,
      take: limit,
    }),
  ]);

  return [listRedeemMerch, countAllRedeemMerch];
};

export default {
  create,
  get,
  getAllList,
  update,
  getListByPembeli,
};
