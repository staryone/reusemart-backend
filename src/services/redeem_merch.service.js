import { prismaClient } from "../application/database.js";
import { ResponseError } from "../errors/response.error.js";
import { idToString } from "../utils/formater.util.js";
import {
  createRedeemMerchValidation,
  getRedeemMerchValidation,
  updateRedeemMerchValidation,
} from "../validation/redeem_merch.validate.js";
import { validate } from "../validation/validate.js";

const create = async (request) => {
  request = validate(createRedeemMerchValidation, request);

  return prismaClient.redeemMerchandise.create({
    data: request,
  });
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
  const searchPembeli = query.searchPembeli;

  // Build the where clause dynamically
  const whereClause =
    q || searchPembeli
      ? {
          OR: [
            q
              ? {
                  deskripsi: {
                    contains: q,
                  },
                }
              : null,
            q
              ? {
                  status: {
                    equals: q, // Enum filter for status
                  },
                }
              : null,
            searchPembeli
              ? {
                  pembeli: {
                    nama: {
                      contains: searchPembeli,
                    },
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
        merchandise: true
    },
    skip: skip,
    take: limit,
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

  if (data.id_pembeli !== updateRequest.id_pembeli) {
    throw new ResponseError(
      401,
      "Anda hanya boleh mengakses redeem_merch sendiri!"
    );
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

export default {
  create,
  get,
  getAllList,
  update,
};