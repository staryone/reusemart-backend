import pengirimanService from "../services/pengiriman.service.js";

// const create = async (req, res, next) => {
//   try {
//     const pengiriman = {
//       tanggal: req.body.tanggal,
//       status_pengiriman: req.body.status_pengiriman,
//       id_kurir: parseInt(req.body.id_kurir),
//       id_transaksi: parseInt(req.body.id_transaksi),
//     };

//     const result = await pengirimanService.create(pengiriman);

//     res.status(200).json({
//       data: result,
//       message: "Pengiriman berhasil dibuat!",
//     });
//   } catch (e) {
//     next(e);
//   }
// };

// const get = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const result = await pengirimanService.get(id);

//     res.status(200).json({
//       data: result,
//     });
//   } catch (e) {
//     next(e);
//   }
// };

// const getList = async (req, res, next) => {
//   try {
//     const [listPengiriman, totalItems] = await pengirimanService.getList(
//       req.query
//     );

//     res.status(200).json({
//       data: listPengiriman,
//       totalItems: totalItems,
//     });
//   } catch (e) {
//     next(e);
//   }
// };

// const getList = async (req, res, next) => {
//   try {
//     // Restrict access to authenticated employees (handled by restrictTo middleware)
//     if (!req.session.user?.pegawai) {
//       throw new Error("Unauthorized: Employee access required");
//     }

//     const { page, limit, status } = req.query;
//     const request = {
//       page: page || "1",
//       limit: limit || "10",
//       status: status || "ALL",
//     };

//     const result = await pengirimanService.getList(request);

//     res.status(200).json({
//       data: result.data,
//       totalItems: result.total,
//     });
//   } catch (e) {
//     next(e);
//   }
// };

const getListDikirim = async (req, res, next) => {
  try {
    const { page, limit, status } = req.query;
    const request = {
      page: page || "1",
      limit: limit || "10",
      status: status || "",
    };

    const result = await pengirimanService.getListDikirim(request);

    res.status(200).json({
      data: result.data,
      totalItems: result.total,
    });
  } catch (e) {
    next(e);
  }
};

const getListDiambil = async (req, res, next) => {
  try {
    const { page, limit, status } = req.query;
    const request = {
      page: page || "1",
      limit: limit || "10",
      status: status || "",
    };

    const result = await pengirimanService.getListDiambil(request);

    res.status(200).json({
      data: result.data,
      totalItems: result.total,
    });
  } catch (e) {
    next(e);
  }
};

const aturPengiriman = async (req, res, next) => {
  try {
    const result = await pengirimanService.aturPengiriman(req.body);

    res.status(200).json({
      data: result,
      message: "Pengiriman berhasil diatur!",
    });
  } catch (e) {
    next(e);
  }
};

// const update = async (req, res, next) => {
//   try {
//     const pengiriman = {
//       id_pengiriman: req.params.id,
//       tanggal: req.body.tanggal,
//       status_pengiriman: req.body.status_pengiriman,
//       id_kurir: req.body.id_kurir ? parseInt(req.body.id_kurir) : undefined,
//       id_transaksi: req.body.id_transaksi
//         ? parseInt(req.body.id_transaksi)
//         : undefined,
//     };

//     const result = await pengirimanService.update(pengiriman);

//     res.status(200).json({
//       data: result,
//       message: "Pengiriman berhasil diperbarui!",
//     });
//   } catch (e) {
//     next(e);
//   }
// };

// const destroy = async (req, res, next) => {
//   try {
//     await pengirimanService.destroy(req.params.id);

//     res.status(200).json({
//       data: "OK",
//       message: "Pengiriman berhasil dihapus!",
//     });
//   } catch (e) {
//     next(e);
//   }
// };

export default {
  // create,
  // get,
  getListDikirim,
  getListDiambil,
  aturPengiriman,
  // update,
  // destroy,
};
