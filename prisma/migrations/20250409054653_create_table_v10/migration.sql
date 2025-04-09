/*
  Warnings:

  - Added the required column `batas_pembayaran` to the `transaksi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transaksi` ADD COLUMN `batas_pembayaran` DATETIME(3) NOT NULL,
    MODIFY `tanggal_pembayaran` DATETIME(3) NULL;
