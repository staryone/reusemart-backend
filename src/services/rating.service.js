import { prismaClient } from "../application/database.js";
import { ResponseError } from "../errors/response.error.js";

const updateRating = async (id_barang_req, req) => {
  // Validate rating input
  const rating = Number(req.rating);
  const id_barang = Number(id_barang_req);
  if (!rating || rating < 1 || rating > 5) {
    throw new Error("Rating harus antara 1 hingga 5");
  }

  const detailTransaksiRecord = await prismaClient.detailTransaksi.findFirst({
    where: { id_barang: id_barang },
  });

  // Update is_rating in detail_transaksi
  const detailTransaksi = await prismaClient.detailTransaksi.update({
    where: { id_dtl_transaksi: detailTransaksiRecord.id_dtl_transaksi },
    data: { is_rating: true },
  });

  if (!detailTransaksi) {
    throw new Error("Detail transaksi tidak ditemukan untuk barang ini");
  }

  // Fetch barang with penitip data
  const barangWithPenitip = await prismaClient.barang.findUnique({
    where: { id_barang },
    include: {
      detail_penitipan: {
        include: {
          penitipan: {
            include: { penitip: true },
          },
        },
      },
    },
  });

  if (
    !barangWithPenitip ||
    !barangWithPenitip.detail_penitipan?.penitipan?.penitip
  ) {
    throw new Error("Data penitip tidak ditemukan untuk barang ini");
  }

  const penitip = barangWithPenitip.detail_penitipan.penitipan.penitip;

  // Update penitip's rating data
  const updatedPenitip = await prismaClient.penitip.update({
    where: { id_penitip: penitip.id_penitip },
    data: {
      jumlah_review: { increment: 1 },
      total_review: { increment: rating },
      rating: {
        set: (penitip.total_review + rating) / (penitip.jumlah_review + 1),
      },
    },
  });

  return updatedPenitip;
};

export default {
  updateRating,
};
