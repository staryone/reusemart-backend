import { prismaClient } from "../application/database.js";
import { ResponseError } from "../errors/response.error.js";
import { idToString } from "../utils/formater.util.js";
import {
  createRequestDonasiValidation,
  getRequestDonasiValidation,
  updateRequestDonasiValidation,
} from "../validation/request_donasi.validate.js";
import { validate } from "../validation/validate.js";

const create = async (request) => {
  request = validate(createRequestDonasiValidation, request);

  return prismaClient.requestDonasi.create({
    data: request,
  });
};

const get = async (id, id_organisasi) => {
  const id_request = validate(getRequestDonasiValidation, id);

  const request_donasi = await prismaClient.requestDonasi.findUnique({
    where: {
      id_request: id_request,
    },
    include: {
      organisasi: true,
    },
  });

  if (!request_donasi) {
    throw new ResponseError(404, "RequestDonasi tidak ditemukan");
  }

  if (request_donasi.id_organisasi !== id_organisasi) {
    throw new ResponseError(
      401,
      "Anda hanya boleh mengakses request donasi sendiri!"
    );
  }

  request_donasi.id_organisasi = idToString(
    request_donasi.organisasi.prefix,
    request_donasi.id_organisasi
  );

  delete request_donasi.organisasi;

  return request_donasi;
};

const getList = async (query, id_organisasi) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;
  const q = query.search;

  const [countAllReqDonasi, listRequestDonasi, organisasi] = await Promise.all([
    prismaClient.requestDonasi.count({
      where: {
        AND: [
          {
            id_organisasi: id_organisasi,
          },
          q
            ? {
                OR: [
                  {
                    deskripsi: {
                      contains: q,
                    },
                  },
                  {
                    status: {
                      contains: q,
                    },
                  },
                  // {
                  //   tanggal_request: {
                  //     gte: q,
                  //   },
                  // },
                ],
              }
            : {},
        ],
      },
    }),
    prismaClient.requestDonasi.findMany({
      where: {
        AND: [
          {
            id_organisasi: id_organisasi,
          },
          q
            ? {
                OR: [
                  {
                    deskripsi: {
                      contains: q,
                    },
                  },
                  {
                    status: {
                      contains: q,
                    },
                  },
                  // {
                  //   tanggal_request: {
                  //     gte: q,
                  //   },
                  // },
                ],
              }
            : {},
        ],
      },
      skip: skip,
      take: limit,
    }),
    prismaClient.organisasi.findUnique({
      where: {
        id_organisasi: id_organisasi,
      },
    }),
  ]);

  const formattedRequestDonasi = listRequestDonasi.map((request_donasi) => {
    request_donasi.id_organisasi = idToString(
      organisasi.prefix,
      request_donasi.id_organisasi
    );

    return request_donasi;
  });

  return [formattedRequestDonasi, countAllReqDonasi];
};

const getAllList = async (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;
  const q = query.search;
  const searchOrg = query.searchOrg;

  // Build the where clause dynamically
  const whereClause =
    q || searchOrg
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
            searchOrg
              ? {
                  organisasi: {
                    nama_organisasi: {
                      contains: searchOrg,
                    },
                  },
                }
              : null,
          ].filter(Boolean), // Remove null entries
        }
      : {};

  const countAllReqDonasi = await prismaClient.requestDonasi.count({
    where: whereClause,
  });

  const listRequestDonasi = await prismaClient.requestDonasi.findMany({
    where: whereClause,
    include: {
      organisasi: true,
    },
    skip: skip,
    take: limit,
  });

  const formattedRequestDonasi = listRequestDonasi.map((request_donasi) => {
    request_donasi.id_organisasi = idToString(
      request_donasi.organisasi.prefix,
      request_donasi.id_organisasi
    );
    request_donasi.nama_organisasi = request_donasi.organisasi.nama_organisasi;
    delete request_donasi.organisasi;
    return request_donasi;
  });

  return [formattedRequestDonasi, countAllReqDonasi];
};

const update = async (request) => {
  const updateRequest = validate(updateRequestDonasiValidation, request);

  const data = await prismaClient.requestDonasi.findUnique({
    where: {
      id_request: updateRequest.id_request,
    },
  });

  if (!data) {
    throw new ResponseError(404, "RequestDonasi tidak ditemukan!");
  }

  if (data.id_organisasi !== updateRequest.id_organisasi) {
    throw new ResponseError(
      401,
      "Anda hanya boleh mengakses request_donasi sendiri!"
    );
  }

  if (updateRequest.deskripsi) {
    data.deskripsi = updateRequest.deskripsi;
  }

  data.tanggal_request = new Date(Date.now());

  return prismaClient.requestDonasi.update({
    where: {
      id_request: data.id_request,
    },
    data: data,
  });
};

const destroy = async (id, id_organisasi) => {
  const id_request = validate(getRequestDonasiValidation, id);

  const request_donasi = await prismaClient.requestDonasi.findUnique({
    where: {
      id_request: id_request,
    },
  });

  if (!request_donasi) {
    throw new ResponseError(404, "RequestDonasi tidak ditemukan!");
  }

  if (request_donasi.id_organisasi !== id_organisasi) {
    throw new ResponseError(
      401,
      "Anda hanya boleh mengakses request_donasi sendiri!"
    );
  }

  return prismaClient.requestDonasi.delete({
    where: {
      id_request: id_request,
    },
  });
};

export default {
  create,
  get,
  getList,
  getAllList,
  update,
  destroy,
};
