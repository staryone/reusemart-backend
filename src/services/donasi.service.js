import { prismaClient } from "../application/database.js";
import { ResponseError } from "../errors/response.error.js";
import {
  idToInteger,
  idOrgToInteger,
  idToString,
} from "../utils/formater.util.js";
import {
  createDonasiValidation,
  getDonasiValidation,
  updateDonasiValidation,
} from "../validation/donasi.validate.js";
import { validate } from "../validation/validate.js";
import barangService from "./barang.service.js";
import notifikasiService from "./notifikasi.service.js";

// const create = async (request) => {
//   request = validate(createDonasiValidation, request);
//   request.id_barang = idToInteger(request.id_barang);

//   const barang = await prismaClient.barang.findUnique({
//     where: {
//       id_barang: request.id_barang,
//     },
//     select: {
//       harga: true,
//     },
//   });

//   const penitip = await prismaClient.barang.findUnique({
//     where: {
//       id_barang: request.id_barang,
//     },
//     select: {
//       detail_penitipan: {
//         select: {
//           penitipan: {
//             select: {
//               penitip: {
//                 select: {
//                   poin: true,
//                   id_penitip: true,
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//   });

//   request.poin_penitip = barang.harga / 10000;

//   const totalPoin =
//     penitip.detail_penitipan.penitipan.penitip.poin + request.poin_penitip;

//   await prismaClient.penitip.update({
//     where: {
//       id_penitip: penitip.detail_penitipan.penitipan.penitip.id_penitip,
//     },
//     data: {
//       poin: totalPoin,
//     },
//   });

//   await prismaClient.requestDonasi.update({
//     where: {
//       id_request: request.id_request,
//     },
//     data: {
//       status: "DISETUJUI",
//     },
//   });

//   await prismaClient.barang.update({
//     where: {
//       id_barang: request.id_barang,
//     },
//     data: {
//       status: "TERDONASI",
//     },
//   });

//   return prismaClient.donasi.create({
//     data: request,
//   });
// };

const create = async (request) => {
  // Validate request and convert id_barang to integer
  request = validate(createDonasiValidation, request);
  request.id_barang = idToInteger(request.id_barang);
  request.id_request = idToInteger(request.id_request);

  // Fetch barang details
  const barang = await prismaClient.barang.findUnique({
    where: {
      id_barang: request.id_barang,
    },
    select: {
      harga: true,
      nama_barang: true, // Added to include item name for notification
    },
  });

  const requestDonasi = await prismaClient.requestDonasi.findUnique({
    where: {
      id_request: request.id_request,
    },
    select: {
      organisasi: {
        select: {
          nama_organisasi: true, // Added to include organization name for notification
        },
      },
    },
  });

  console.log(
    `Processing donation for item: ${barang.nama_barang}, Request ID: ${request.id_request}`
  );

  // Fetch penitip details
  const penitip = await prismaClient.barang.findUnique({
    where: {
      id_barang: request.id_barang,
    },
    select: {
      detail_penitipan: {
        select: {
          penitipan: {
            select: {
              penitip: {
                select: {
                  poin: true,
                  id_penitip: true,
                  id_user: true, // Added to get user ID for notification
                  nama: true, // Added to get penitip name for notification
                },
              },
            },
          },
        },
      },
    },
  });

  console.log(
    `Processing donation for item: ${barang.nama_barang}, Penitip ID: ${penitip.detail_penitipan.penitipan.penitip.id_penitip}`
  );

  // Calculate points for penitip
  request.poin_penitip = barang.harga / 10000;

  const totalPoin =
    penitip.detail_penitipan.penitipan.penitip.poin + request.poin_penitip;

  // Update penitip points
  await prismaClient.penitip.update({
    where: {
      id_penitip: penitip.detail_penitipan.penitipan.penitip.id_penitip,
    },
    data: {
      poin: totalPoin,
    },
  });

  // Update request status
  await prismaClient.requestDonasi.update({
    where: {
      id_request: request.id_request,
    },
    data: {
      status: "DISETUJUI",
    },
  });

  // Update barang status
  await prismaClient.barang.update({
    where: {
      id_barang: request.id_barang,
    },
    data: {
      status: "TERDONASI",
    },
  });

  // Create donation record
  const donasi = await prismaClient.donasi.create({
    data: request,
  });

  console.log(`Donasi created with ID: ${donasi.id_donasi}`);

  // Send notification to penitip
  const toSendPenitip = {
    user_id: penitip.detail_penitipan.penitipan.penitip.id_user,
    title: "Donasi Barangmu Disetujui!",
    body: `Halo ${penitip.detail_penitipan.penitipan.penitip.nama}, barang ${barang.nama_barang} telah didonasikan kepada ${requestDonasi.organisasi.nama_organisasi}. Kamu mendapatkan ${request.poin_penitip} poin. Cek detailnya di aplikasi. Terima kasih atas donasimu!`,
  };
  await notifikasiService.sendNotification(toSendPenitip);

  console.log(
    `Notifikasi dikirim ke penitip ${penitip.detail_penitipan.penitipan.penitip.nama} (ID: ${penitip.detail_penitipan.penitipan.penitip.id_user})`
  );

  return donasi;
};

const get = async (id) => {
  const id_donasi = validate(getDonasiValidation, id);

  const donasi = await prismaClient.donasi.findUnique({
    where: {
      id_donasi: id_donasi,
    },
    include: {
      barang: true,
    },
  });

  if (!donasi) {
    throw new ResponseError(404, "Donasi tidak ditemukan");
  }

  donasi.id_barang = idToString(donasi.barang.prefix, donasi.id_barang);

  delete donasi.barang;

  return donasi;
};

const getList = async (query, id_organisasi) => {
  const page = query.page || 1;
  const limit = query.limit || 10;
  const skip = (page - 1) * limit;
  const q = query.search;

  if (typeof id_organisasi !== "string") {
    throw new ResponseError(400, "Id organisasi tidak valid!");
  }

  id_organisasi = idOrgToInteger(id_organisasi);

  const countAllDonasi = await prismaClient.donasi.count({
    where: {
      AND: [
        {
          request: {
            id_organisasi: id_organisasi,
          },
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
              ],
            }
          : {},
      ],
    },
  });
  const listDonasi = await prismaClient.donasi.findMany({
    where: {
      AND: [
        {
          request: {
            id_organisasi: id_organisasi,
          },
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
              ],
            }
          : {},
      ],
    },
    include: {
      barang: true,
    },
    skip: skip,
    take: limit,
  });

  const formattedDonasi = listDonasi.map((donasi) => {
    donasi.id_barang = idToString(donasi.barang.prefix, donasi.id_barang);

    return donasi;
  });

  return [formattedDonasi, countAllDonasi];
};
const getAllList = async (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;
  const q = query.search;

  const countAllDonasi = await prismaClient.donasi.count({
    where: q
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
          ],
        }
      : {},
  });
  const listDonasi = await prismaClient.donasi.findMany({
    where: q
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
          ],
        }
      : {},
    include: {
      barang: true,
      request: {
        include: {
          organisasi: true,
        },
      },
    },
    skip: skip,
    take: limit,
  });

  const formattedDonasi = listDonasi.map((donasi) => {
    donasi.id_barang = idToString(donasi.barang.prefix, donasi.id_barang);

    return donasi;
  });

  return [formattedDonasi, countAllDonasi];
};

const update = async (request) => {
  const updateRequest = validate(updateDonasiValidation, request);

  const data = await prismaClient.donasi.findUnique({
    where: {
      id_donasi: updateRequest.id_donasi,
    },
  });

  if (!data) {
    throw new ResponseError(404, "Donasi tidak ditemukan!");
  }

  if (updateRequest.tanggal_donasi) {
    data.tanggal_donasi = new Date(updateRequest.tanggal_donasi);
  }

  if (updateRequest.nama_penerima) {
    data.nama_penerima = updateRequest.nama_penerima;
  }

  if (updateRequest.status) {
    await barangService.updateStatus({
      id_barang: data.id_barang,
      status: updateRequest.status,
    });
  }

  return prismaClient.donasi.update({
    where: {
      id_donasi: data.id_donasi,
    },
    data: data,
  });
};

const getLaporanDonasiBarang = async (query) => {
  const tahun = query.tahun ? parseInt(query.tahun) : null;
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;

  // Hitung total data untuk pagination
  const countAllDonasi = await prismaClient.donasi.count({
    where: {
      ...(tahun && {
        tanggal_donasi: {
          gte: new Date(`${tahun}-01-01`), // Mulai dari awal tahun
          lte: new Date(`${tahun}-12-31`), // Sampai akhir tahun
        },
      }),
    },
  });

  // Ambil data dengan pagination
  const donasiList = await prismaClient.donasi.findMany({
    where: {
      ...(tahun && {
        tanggal_donasi: {
          gte: new Date(`${tahun}-01-01`), // Mulai dari awal tahun
          lte: new Date(`${tahun}-12-31`), // Sampai akhir tahun
        },
      }),
    },
    include: {
      barang: {
        select: {
          prefix: true,
          id_barang: true,
          nama_barang: true,
          detail_penitipan: {
            select: {
              penitipan: {
                select: {
                  penitip: {
                    select: {
                      prefix: true,
                      id_penitip: true,
                      nama: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      request: {
        select: {
          organisasi: {
            select: {
              nama_organisasi: true,
            },
          },
        },
      },
    },
    skip: skip,
    take: limit,
  });

  // Format data sesuai dengan struktur laporan
  const formattedData = donasiList.map((donasi) => ({
    kode_produk: `${donasi.barang.prefix}${donasi.barang.id_barang}`, // Contoh: K202
    nama_produk: donasi.barang.nama_barang, // Nama barang
    id_penitip: `${donasi.barang.detail_penitipan.penitipan.penitip.prefix}${donasi.barang.detail_penitipan.penitipan.penitip.id_penitip}`, // Contoh: T25
    nama_penitip: donasi.barang.detail_penitipan.penitipan.penitip.nama, // Nama penitip
    tanggal_donasi: donasi.tanggal_donasi.toLocaleDateString("id-ID"), // Format tanggal: 29/3/2025
    organisasi: donasi.request.organisasi.nama_organisasi, // Nama organisasi
    nama_penerima: donasi.nama_penerima, // Nama penerima
  }));

  return [formattedData, countAllDonasi];
};

export default {
  create,
  get,
  getList,
  getAllList,
  update,
  getLaporanDonasiBarang,
};
