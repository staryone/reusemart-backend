import { prismaClient } from "../application/database.js";
import { getUrlFile, uploadFile, deleteFile } from "../application/storage.js";
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
    request.gambar.map(async (g) => {
      g.fieldname = formatNamaGambarBarang(id_penitip);
      await uploadFile(g, "gambar_barang");
      return "gambar_barang/" + g.fieldname + "." + String(g.mimetype).slice(6);
    })
  );

  delete request.gambar;

  const barang = await prismaClient.barang.create({
    data: request,
    select: {
      id_barang: true,
    },
  });

  await Promise.all(
    imageURLs.map(async (imageurl, index) => {
      await prismaClient.gambarBarang.create({
        data: {
          url_gambar: imageurl,
          id_barang: barang.id_barang,
          is_primary: index == 0 ? true : false,
        },
      });
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
        detail_penitipan: barang.detail_penitipan,
        diskusi: [],
      };
    })
  );

  return [formattedBarang, countAllReqBarang];
};

// const updateStatus = async (req, id_penitip) => {
//   req = validate(updateStatusBarangValidation, req);

//   if (typeof req.id_barang === "string") {
//     req.id_barang = idToInteger(req.id_barang);
//   }

//   const barang = await prismaClient.barang.update({
//     where: {
//       id_barang: req.id_barang,
//     },
//     data: {
//       status: req.status,
//     },
//     include: {
//       donasi: true,
//       detail_penitipan: {
//         include: {
//           penitipan: {
//             include: {
//               penitip: true,
//             },
//           },
//         },
//       },
//     },
//   });

//   if (barang.detail_penitipan.penitipan.id_penitip !== id_penitip) {
//     throw new ResponseError(
//       401,
//       "Anda hanya bisa mengubah status milik sendiri!"
//     );
//   }

//   if (barang.status === "TERDONASI") {
//     await penitipService.updateSistem({
//       id_penitip: idToString(
//         barang.detail_penitipan.penitipan.penitip.prefix,
//         barang.detail_penitipan.penitipan.penitip.id_penitip
//       ),
//       poin: barang.donasi.poin_penitip,
//     });
//   }

//   return "OK";
// };
const updateStatus = async (req, userId, role) => {
  try {
    req = validate(updateStatusBarangValidation, req);

    if (typeof req.id_barang === "string") {
      req.id_barang = idToInteger(req.id_barang);
    }

    // Fetch the barang to check ownership (for PENITIP)
    const barang = await prismaClient.barang.findUnique({
      where: {
        id_barang: req.id_barang,
      },
      include: {
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

    if (!barang) {
      throw new ResponseError(404, "Barang tidak ditemukan");
    }

    // Restrict PENITIP to only update their own items
    if (
      role === "PENITIP" &&
      barang.detail_penitipan.penitipan.id_penitip !== userId
    ) {
      throw new ResponseError(
        403,
        "Anda hanya bisa mengubah status barang milik sendiri!"
      );
    }

    // PEGAWAI and GUDANG can update any item
    const updatedBarang = await prismaClient.barang.update({
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

    if (updatedBarang.status === "TERDONASI") {
      await penitipService.updateSistem({
        id_penitip: idToString(
          updatedBarang.detail_penitipan.penitipan.penitip.prefix,
          updatedBarang.detail_penitipan.penitipan.penitip.id_penitip
        ),
        poin: updatedBarang.donasi.poin_penitip,
      });
    }

    return "OK";
  } catch (error) {
    console.error("Error in updateStatus:", error);
    throw new ResponseError(
      500,
      "Gagal memperbarui status barang: " + error.message
    );
  }
};

const update = async (id_barang, request, id_penitip, existingGambar = []) => {
  // Validate input
  request.id_barang = id_barang;
  request = validate(updateBarangValidation, request);
  id_barang = idToInteger(id_barang);
  id_penitip = idToInteger(id_penitip);

  const id_kategori = request.id_kategori ? request.id_kategori : undefined;
  // Verify barang exists
  const existingBarang = await prismaClient.barang.findUnique({
    where: { id_barang },
    include: { gambar: true },
  });
  if (!existingBarang) {
    throw new ResponseError(404, "Barang tidak ditemukan");
  }

  // Prepare image updates
  let newImageURLs = [];
  if (request.gambar && request.gambar.length > 0) {
    newImageURLs = await Promise.all(
      request.gambar.map(async (g) => {
        g.fieldname = formatNamaGambarBarang(id_penitip);
        await uploadFile(g, "gambar_barang");
        return (
          "gambar_barang/" + g.fieldname + "." + String(g.mimetype).slice(6)
        );
      })
    );
  }

  // Remove gambar field from request to avoid Prisma errors
  console.log("Barang req", request);
  delete request.gambar;
  // Use transaction for atomic updates
  const result = await prismaClient.$transaction(async (tx) => {
    // Update Barang record
    const updatedBarang = await tx.barang.update({
      where: { id_barang },
      data: {
        prefix: request.prefix || existingBarang.prefix,
        nama_barang: request.nama_barang,
        deskripsi: request.deskripsi,
        harga: request.harga,
        berat: request.berat,
        id_kategori: id_kategori,
        garansi: request.garansi || null,
        status: request.status || existingBarang.status,
      },
      select: { id_barang: true },
    });

    // Handle images
    // Delete images not in existingGambar
    if (existingGambar.length > 0 || newImageURLs.length > 0) {
      const imagesToDelete = await tx.gambarBarang.findMany({
        where: {
          id_barang,
          id_gambar: { notIn: existingGambar.map((g) => g.id_gambar) },
        },
        select: { url_gambar: true },
      });

      // Delete files from storage
      await Promise.all(
        imagesToDelete.map(async ({ url_gambar }) => {
          try {
            await deleteFile(url_gambar);
          } catch (error) {
            console.error(
              `Failed to delete file ${url_gambar}:`,
              error.message
            );
            // Continue without throwing to avoid transaction rollback
          }
        })
      );

      await tx.gambarBarang.deleteMany({
        where: {
          id_barang,
          id_gambar: { notIn: existingGambar.map((g) => g.id_gambar) },
        },
      });
    }

    // Create new images
    if (newImageURLs.length > 0) {
      await Promise.all(
        newImageURLs.map(async (imageurl, index) => {
          await tx.gambarBarang.create({
            data: {
              url_gambar: imageurl,
              id_barang: updatedBarang.id_barang,
              is_primary: existingGambar.length === 0 && index === 0, // First new image is primary if no existing images
              order_number: existingGambar.length + index,
            },
          });
        })
      );
    }

    // Ensure at least one image is primary
    const images = await tx.gambarBarang.findMany({
      where: { id_barang: updatedBarang.id_barang },
    });
    if (images.length > 0 && !images.some((img) => img.is_primary)) {
      await tx.gambarBarang.update({
        where: { id_gambar: images[0].id_gambar },
        data: { is_primary: true },
      });
    }

    return updatedBarang.id_barang;
  });

  return result;
};

// const getCategoryStats = async () => {
//   try {
//     // Fetch all categories with their associated items
//     const categories = await prismaClient.kategori.findMany({
//       include: {
//         barang: {
//           select: {
//             status: true,
//           },
//         },
//       },
//     });

//     // Process the data to calculate stats for each category
//     const categoryStats = categories.map((kategori) => {
//       const stats = kategori.barang.reduce(
//         (acc, barang) => {
//           if (barang.status === "TERJUAL") {
//             acc.sold += 1;
//           } else if (
//             barang.status === "DIDONASIKAN" ||
//             barang.status === "KEMBALI"
//           ) {
//             acc.unsold += 1;
//           }
//           return acc;
//         },
//         { sold: 0, unsold: 0 }
//       );

//       return {
//         id_kategori: kategori.id_kategori,
//         nama_kategori: kategori.nama_kategori,
//         total_sold: stats.sold,
//         total_unsold: stats.unsold,
//       };
//     });

//     return categoryStats;
//   } catch (error) {
//     console.error("Error in getCategoryStats:", error);
//     throw new ResponseError(
//       500,
//       "Gagal mengambil statistik kategori: " + error.message
//     );
//   }
// };
const getCategoryStats = async (year = null) => {
  try {
    // Build the where clause for filtering by year if provided
    const yearFilter = year
      ? {
          createdAt: {
            gte: new Date(`${year}-01-01T00:00:00.000Z`),
            lte: new Date(`${year}-12-31T23:59:59.999Z`),
          },
        }
      : {};

    // Fetch all categories with their associated items, filtered by year if specified
    const categories = await prismaClient.kategori.findMany({
      include: {
        barang: {
          where: yearFilter,
          select: {
            status: true,
            createdAt: true,
          },
        },
      },
    });

    // Process the data to calculate stats for each category
    const categoryStats = categories.map((kategori) => {
      const stats = kategori.barang.reduce(
        (acc, barang) => {
          if (barang.status === "TERJUAL") {
            acc.sold += 1;
          } else if (
            barang.status === "DIDONASIKAN" ||
            barang.status === "TERDONASI" ||
            barang.status === "KEMBALI"
          ) {
            acc.unsold += 1;
          }
          return acc;
        },
        { sold: 0, unsold: 0 }
      );

      return {
        id_kategori: kategori.id_kategori,
        nama_kategori: kategori.nama_kategori,
        total_sold: stats.sold,
        total_unsold: stats.unsold,
      };
    });

    return categoryStats;
  } catch (error) {
    console.error("Error in getCategoryStats:", error);
    throw new ResponseError(
      500,
      "Gagal mengambil statistik kategori: " + error.message
    );
  }
};

export default {
  create,
  get,
  getList,
  updateStatus,
  update,
  getCategoryStats,
};
