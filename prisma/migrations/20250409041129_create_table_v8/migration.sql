/*
  Warnings:

  - You are about to alter the column `status` on the `barang` table. The data in that column could be lost. The data in that column will be cast from `VarChar(32)` to `Enum(EnumId(1))`.
  - You are about to alter the column `status_pengiriman` on the `pengiriman` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Enum(EnumId(4))`.
  - You are about to alter the column `status_Pembayaran` on the `transaksi` table. The data in that column could be lost. The data in that column will be cast from `VarChar(32)` to `Enum(EnumId(2))`.
  - You are about to alter the column `metode_pengiriman` on the `transaksi` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `Enum(EnumId(3))`.

*/
-- AlterTable
ALTER TABLE `barang` MODIFY `status` ENUM('TERSEDIA', 'KEMBALI', 'DIDONASIKAN', 'TERJUAL') NOT NULL DEFAULT 'TERSEDIA';

-- AlterTable
ALTER TABLE `pengiriman` MODIFY `status_pengiriman` ENUM('DIPROSES', 'SIAP_DIAMBIL', 'SEDANG_DIKIRIM', 'SUDAH_DITERIMA') NOT NULL DEFAULT 'DIPROSES';

-- AlterTable
ALTER TABLE `transaksi` MODIFY `status_Pembayaran` ENUM('BELUM_DIBAYAR', 'SUDAH_DIBAYAR', 'DITERIMA', 'DIBATALKAN') NOT NULL DEFAULT 'BELUM_DIBAYAR',
    MODIFY `metode_pengiriman` ENUM('DIAMBIL', 'DIKIRIM') NOT NULL DEFAULT 'DIAMBIL';
