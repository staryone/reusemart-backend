import { prismaClient } from "../application/database.js";
import { ResponseError } from "../errors/response.error.js";
import {
  createAlamatValidation,
  getAlamatValidation,
  updateAlamatValidation,
} from "../validation/alamat.validate.js";
import { validate } from "../validation/validate.js";

const create = async (request) => {
  request = validate(createAlamatValidation, request);

  const countAlamat = await prismaClient.alamat.findMany({
    where: {
      id_pembeli: request.id_pembeli,
    },
  });

  if (countAlamat > 5) {
    throw new ResponseError(
      400,
      "Hanya boleh maksimal menambahkan 5 alamat per pengguna!"
    );
  }

  return prismaClient.alamat.create({
    data: request,
  });
};

const get = async (id, id_pembeli) => {
  const id_alamat = validate(getAlamatValidation, id);

  const alamat = await prismaClient.alamat.findUnique({
    where: {
      id_alamat: id_alamat,
    },
  });

  if (!alamat) {
    throw new ResponseError(404, "Alamat tidak ditemukan");
  }

  if (alamat.id_pembeli !== id_pembeli) {
    throw new ResponseError(401, "Anda hanya boleh mengakses alamat sendiri!");
  }

  return alamat;
};

const getList = async (query, id_pembeli) => {
  let listAlamat;
  const page = query.page || 1;
  const limit = query.limit || 10;
  const skip = (page - 1) * limit;
  const q = query.search;

  listAlamat = await prismaClient.alamat.findMany({
    where: {
      AND: [
        {
          id_pembeli: id_pembeli,
        },
        q
          ? {
              OR: [
                {
                  nama_alamat: {
                    contains: q,
                  },
                },
                {
                  detail_alamat: {
                    contains: q,
                  },
                },
              ],
            }
          : {},
      ],
    },
    skip: skip,
    take: limit,
  });

  return listAlamat;
};

const update = async (request) => {
  const updateRequest = validate(updateAlamatValidation, request);

  const data = await prismaClient.alamat.findUnique({
    where: {
      id_alamat: updateRequest.id_alamat,
    },
  });

  if (!data) {
    throw new ResponseError(404, "Alamat tidak ditemukan!");
  }

  if (data.id_pembeli !== updateRequest.id_pembeli) {
    throw new ResponseError(401, "Anda hanya boleh mengakses alamat sendiri!");
  }

  if (updateRequest.nama_alamat) {
    data.nama_alamat = updateRequest.nama_alamat;
  }

  if (updateRequest.detail_alamat) {
    data.detail_alamat = updateRequest.detail_alamat;
  }

  if (updateRequest.status_default !== null) {
    if (updateRequest.status_default === true) {
      const findStatusTrue = await prismaClient.alamat.findFirst({
        where: {
          AND: [
            {
              id_pembeli: updateRequest.id_pembeli,
            },
            {
              status_default: true,
            },
          ],
        },
      });

      if (findStatusTrue) {
        findStatusTrue.status_default = false;
        await prismaClient.alamat.update({
          where: {
            id_alamat: findStatusTrue.id_alamat,
          },
          data: findStatusTrue,
        });
      }

      data.status_default = updateRequest.status_default;
    } else {
      data.status_default = false;
    }
  }

  return prismaClient.alamat.update({
    where: {
      id_alamat: data.id_alamat,
    },
    data: data,
  });
};

const destroy = async (id, id_pembeli) => {
  const id_alamat = validate(getAlamatValidation, id);

  const alamat = await prismaClient.alamat.findUnique({
    where: {
      id_alamat: id_alamat,
    },
  });

  if (!alamat) {
    throw new ResponseError(404, "Alamat tidak ditemukan!");
  }

  if (alamat.id_pembeli !== id_pembeli) {
    throw new ResponseError(401, "Anda hanya boleh mengakses alamat sendiri!");
  }

  return prismaClient.alamat.delete({
    where: {
      id_alamat: id_alamat,
    },
  });
};

export default {
  create,
  get,
  getList,
  update,
  destroy,
};
