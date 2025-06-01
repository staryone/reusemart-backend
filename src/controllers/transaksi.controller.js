import transaksiService from "../services/transaksi.service.js";
import { fileTypeFromBuffer } from "file-type";

const create = async (req, res, next) => {
  try {
    const dataTransaksi = JSON.parse(req.body.dataTransaksi);
    dataTransaksi.id_pembeli = req.session.user.pembeli.id_pembeli;

    if (dataTransaksi.id_alamat === null) delete dataTransaksi.id_alamat;

    const result = await transaksiService.create(dataTransaksi);
    res.status(200).json({
      data: result,
      message: "Create transaksi berhasil!",
    });
  } catch (e) {
    next(e);
  }
};

const getListVerifPembayaran = async (req, res, next) => {
  try {
    const [listTransaksi, totalItems] =
      await transaksiService.getListVerifPembayaran(req.query);
    res.status(200).json({
      data: listTransaksi,
      totalItems: totalItems,
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const id_pembeli = req.session.user.pembeli.id_pembeli;

    const result = await transaksiService.get(req.params.id, id_pembeli);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const uploadPembayaran = async (req, res, next) => {
  try {
    const id_pembeli = req.session.user.pembeli.id_pembeli;
    const fileType = await fileTypeFromBuffer(req.files[0].buffer);
    req.files[0].mimetype = fileType.mime;

    console.log(req.files[0]);
    console.log(id_pembeli);
    console.log(parseInt(req.params.id));
    await transaksiService.updateBuktiPembayaranByPembeli(
      req.files,
      id_pembeli,
      parseInt(req.params.id)
    );
    res.status(200).json({
      data: "OK",
      message: "Upload bukti pembayaran berhasil!",
    });
  } catch (e) {
    next(e);
  }
};

const verifPembayaran = async (req, res, next) => {
  try {
    const id_cs = req.session.user.pegawai.id_pegawai;

    await transaksiService.updateStatusByCS(
      req.params.id,
      req.body.status,
      id_cs
    );
    res.status(200).json({
      data: "OK",
      message: "Verif pembayaran berhasil!",
    });
  } catch (e) {
    next(e);
  }
};

const updateExpiredPayment = async (req, res, next) => {
  try {
    const id_pembeli = req.session.user.pembeli.id_pembeli;
    const result = await transaksiService.updateExpiredPayment(
      req.params.id,
      id_pembeli
    );
    res.status(200).json({
      data: "OK",
      message: result,
    });
  } catch (e) {
    next(e);
  }
};

const getLaporanTransaksiPenitip = async (req, res, next) => {
  try {
    const result = await transaksiService.getLaporanTransaksiPenitip(req.query);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  create,
  get,
  uploadPembayaran,
  verifPembayaran,
  updateExpiredPayment,
  getListVerifPembayaran,
  getLaporanTransaksiPenitip,
};
