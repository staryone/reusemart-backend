import { prismaClient } from "../application/database.js";
import { getUrlFile, uploadFile } from "../application/storage.js";
import { ResponseError } from "../errors/response.error.js";
import {
  formatNamaGambarBarang,
  idToInteger,
  idToString,
} from "../utils/formater.util.js";
import {
  createBarangValidation,
  getBarangValidation,
  updateBarangValidation,
  updateStatusBarangValidation,
} from "../validation/barang.validate.js";
import { validate } from "../validation/validate.js";
import penitipService from "./penitip.service.js";

const create = async (request, id_penitip) => {
  request = validate(createBarangValidation, request);

  const imageURLs = await Promise.all(
    request.gambar.map(async(g) => {
      g.fieldname = formatNamaGambarBarang(id_penitip);
      await uploadFile("gambar_barang/", g);
      return "gambar_barang/" + g.fieldname + "." + String(g.mimetype).slice(6);
    })
  );

  console.log(imageURLs);

  delete request.gambar;

  const barang = await prismaClient.barang.create({
    data: request,
    select: {
      id_barang: true,
    },
  });

  await Promise.all(
    imageURLs.map((imageurl) => {
      prismaClient.gambarBarang.create({
        data: {
          url_gambar: imageurl,
          id_barang: barang.id_barang,
        },
      });
      return "OK";
    })
  );
  return barang.id_barang;
};

const get = async (idBarang) => {
  idBarang = validate(getBarangValidation, idBarang);
  const id_barang = idToInteger(idBarang);

  const barang = await prismaClient.barang.findUnique({
    where: {
      id_barang: id_barang,
    },
    include: {
      diskusi: {
        include: {
          user: {
            include: {
              pegawai: {
                include: {
                  jabatan: true,
                },
              },
              pembeli: true,
            },
          },
        },
      },
      kategori: true,
      gambar: true,
      detail_penitipan: {
        include: {
          penitipan: {
            include: {
              penitip: {
                select: {
                  prefix: true,
                  id_penitip: true,
                  nama: true,
                  is_top_seller: true,
                  nomor_telepon: true,
                  alamat: true,
                  rating: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!barang) {
    throw new ResponseError(404, "Barang tidak ditemukan");
  }

  barang.detail_penitipan.penitipan.penitip.id_penitip = idToString(
    barang.detail_penitipan.penitipan.penitip.prefix,
    barang.detail_penitipan.penitipan.penitip.id_penitip
  );

  delete barang.detail_penitipan.penitipan.penitip.prefix;

  barang.gambar = await Promise.all(
    barang.gambar.map(async (g) => {
      return {
        id_gambar: g.id_gambar,
        url_gambar: await getUrlFile(g.url_gambar),
        order_number: g.order_number,
        is_primary: g.is_primary,
        id_barang: g.id_barang,
        createdAt: g.createdAt,
        updatedAt: g.updatedAt,
      };
    })
  );

  const formattedBarang = {
    id_barang: idBarang,
    nama_barang: barang.nama_barang,
    deskripsi: barang.deskripsi,
    harga: barang.harga,
    status: barang.status,
    garansi: barang.garansi ? barang.garansi : null,
    berat: barang.berat,
    kategori: barang.kategori,
    gambar: barang.gambar,
    createdAt: barang.createdAt,
    updatedAt: barang.updatedAt,
    penitip: barang.detail_penitipan.penitipan.penitip,
    diskusi: barang.diskusi.map((d) => {
      return {
        id_diskusi: d.id_diskusi,
        tanggal_diskusi: d.tanggal_diskusi,
        pesan: d.pesan,
        id_barang: idBarang,
        id_cs: d.user.pegawai
          ? idToString(d.user.pegawai.prefix, d.user.pegawai.id_pegawai)
          : null,
        id_pembeli: d.user.pembeli ? d.user.pembeli.id_pembeli : null,
        nama: d.user.pegawai ? d.user.pegawai.nama : d.user.pembeli.nama,
        role: d.user.pegawai
          ? String(d.user.pegawai.jabatan.nama_jabatan).toUpperCase()
          : d.user.role,
      };
    }),
  };

  return formattedBarang;
};

const getList = async (query) => {
  const page = query.page || 1;
  const limit = query.limit || 10;
  const skip = query.all ? undefined : (page - 1) * limit; // Explicitly set skip to undefined when fetching all
  const q = query.search || "";
  const status = query.status || "";

  const countAllReqBarang = await prismaClient.barang.count({
    where: {
      AND: [
        status ? { status } : {},
        q
          ? {
              OR: [
                {
                  nama_barang: {
                    contains: q,
                  },
                },
                {
                  detail_penitipan: {
                    penitipan: {
                      penitip: {
                        nama: q,
                      },
                    },
                  },
                },
                {
                  kategori: {
                    nama_kategori: q,
                  },
                },
              ],
            }
          : {},
      ],
    },
  });

  const findManyOptions = {
    where: {
      AND: [
        status ? { status } : {},
        q
          ? {
              OR: [
                {
                  nama_barang: {
                    contains: q,
                  },
                },
                {
                  detail_penitipan: {
                    penitipan: {
                      penitip: {
                        nama: q,
                      },
                    },
                  },
                },
                {
                  kategori: {
                    nama_kategori: q,
                  },
                },
              ],
            }
          : {},
      ],
    },
    include: {
      diskusi: {
        include: {
          user: {
            include: {
              pegawai: {
                include: {
                  jabatan: true,
                },
              },
              pembeli: true,
            },
          },
        },
      },
      kategori: true,
      gambar: true,
      detail_penitipan: {
        include: {
          penitipan: {
            include: {
              penitip: {
                select: {
                  prefix: true,
                  id_penitip: true,
                  nama: true,
                  is_top_seller: true,
                  nomor_telepon: true,
                  alamat: true,
                  rating: true,
                },
              },
            },
          },
        },
      },
    },
  };

  // Only add skip and take if not fetching all
  if (!query.all && skip !== undefined && limit !== undefined) {
    findManyOptions.skip = skip;
    findManyOptions.take = limit;
  }

  const listBarang = await prismaClient.barang.findMany(findManyOptions);

  // Rest of the code (formatting barang, handling images, etc.) remains unchanged
  const formattedBarang = await Promise.all(
    listBarang.map(async (barang) => {
      const gambarPromises = barang.gambar.map(async (g) => {
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
        } catch (error) {
          console.error(
            `Gagal mendapatkan URL untuk gambar ${g.id_gambar}:`,
            error
          );
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
        id_barang: idToString(barang.prefix, barang.id_barang),
        nama_barang: barang.nama_barang,
        deskripsi: barang.deskripsi,
        harga: barang.harga,
        status: barang.status,
        garansi: barang.garansi ? barang.garansi : null,
        berat: barang.berat,
        kategori: barang.kategori,
        gambar: gambar,
        createdAt: barang.createdAt,
        updatedAt: barang.updatedAt,
        penitip: barang.detail_penitipan.penitipan.penitip,
        diskusi: [],
      };
    })
  );

  return [formattedBarang, countAllReqBarang];
};

const updateStatus = async (req) => {
  req = validate(updateStatusBarangValidation, req);

  if (typeof req.id_barang === "string") {
    req.id_barang = idToInteger(req.id_barang);
  }

  const barang = await prismaClient.barang.update({
    where: {
      id_barang: req.id_barang,
    },
    data: {
      status: req.status,
    },
    include: {
      donasi: true,
      detail_penitipan: {
        include: {
          penitipan: {
            include: {
              penitip: true,
            },
          },
        },
      },
    },
  });

  if (barang.status === "TERDONASI") {
    await penitipService.updateSistem({
      id_penitip: idToString(
        barang.detail_penitipan.penitipan.penitip.prefix,
        barang.detail_penitipan.penitipan.penitip.id_penitip
      ),
      poin: barang.donasi.poin_penitip,
    });
  }

  return "OK";
};

export default {
  create,
  get,
  getList,
  updateStatus,
};
