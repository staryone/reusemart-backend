import { prismaClient } from "../application/database.js";
import { getUrlFile } from "../application/storage.js";
import { ResponseError } from "../errors/response.error.js";
import { idToInteger, idToString } from "../utils/formater.util.js";
import { createTransaksiValidation } from "../validation/transaksi.validate.js";
import { validate } from "../validation/validate.js";

const create = async (request) => {
  request = validate(createTransaksiValidation, request);

  const listBarang = await Promise.all(
    request.id_barang.map(async (id) => {
      const result = await prismaClient.barang.findUnique({
        where: {
          id_barang: idToInteger(id),
        },
        select: {
          id_barang: true,
          harga: true,
        },
      });
      result.poin = parseInt(result.harga / 10000);
      return result;
    })
  );

  delete request.id_barang;

  console.log(listBarang);

  await prismaClient.$transaction(async (tx) => {
    const total_harga = listBarang.reduce(
      (acc, barang) => acc + barang.harga,
      0
    );
    const total_poin = listBarang.reduce((acc, barang) => acc + barang.poin, 0);
    const tanggal_transaksi = new Date();
    tanggal_transaksi.setHours(tanggal_pembayaran.getHours() + 7);
    const batas_pembayaran = new Date(tanggal_pembayaran);
    batas_pembayaran.setMinutes(batas_pembayaran.getMinutes() + 1);
    console.log(batas_pembayaran);

    const ongkos_kirim =
      String(request.metode_pembayaran).toUpperCase() === "DIKIRIM" &&
      total_harga < 1500000
        ? 100000
        : 0;

    const { poin_loyalitas } = await tx.pembeli.findUnique({
      where: {
        id_pembeli: request.id_pembeli,
      },
      select: {
        poin_loyalitas: true,
      },
    });

    if (request.potongan_poin > poin_loyalitas) {
      throw new ResponseError(
        401,
        "Poin gagal terpotong karena tidak cukup! " + request.potongan_poin
      );
    }

    const potongan_harga = request.potongan_poin * 0.01 * 10000;

    const total_akhir = total_harga + ongkos_kirim - potongan_harga;

    const transaksiData = {
      ...request,
      total_harga: total_harga,
      tanggal_transaksi: tanggal_transaksi,
      batas_pembayaran: batas_pembayaran,
      total_poin:
        total_harga > 500000
          ? parseInt(total_poin + total_poin * 0.2)
          : total_poin,
      ongkos_kirim: ongkos_kirim,
      total_akhir: total_akhir,
    };

    const result = await tx.transaksi.create({
      data: transaksiData,
      select: {
        id_transaksi: true,
        id_pembeli: true,
        potongan_poin: true,
      },
    });

    await Promise.all(
      listBarang.map(async (barang) => {
        await tx.detailTransaksi.create({
          data: {
            id_barang: barang.id_barang,
            poin: barang.poin,
            id_transaksi: result.id_transaksi,
          },
        });
        await tx.barang.update({
          where: {
            id_barang: barang.id_barang,
          },
          data: {
            status: "PROSES_PEMBAYARAN",
          },
        });
      })
    );

    await tx.pembeli.update({
      where: {
        id_pembeli: result.id_pembeli,
      },
      data: {
        poin_loyalitas: poin_loyalitas - result.potongan_poin,
      },
    });

    await tx.keranjang.deleteMany({
      where: {
        AND: [
          {
            id_pembeli: request.id_pembeli,
          },
          {
            is_selected: true,
          },
        ],
      },
    });
  });

  return "OK";
};

export default {
  create,
};
