/*
  Warnings:

  - A unique constraint covering the columns `[id_barang]` on the table `dtl_transaksi` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `dtl_transaksi_id_barang_key` ON `dtl_transaksi`(`id_barang`);
