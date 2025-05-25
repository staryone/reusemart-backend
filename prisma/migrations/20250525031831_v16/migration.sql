/*
  Warnings:

  - The values [PROSES_PEMBAYARAN] on the enum `barang_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `barang` MODIFY `status` ENUM('TERSEDIA', 'KEMBALI', 'DIDONASIKAN', 'TERDONASI', 'TERJUAL') NOT NULL DEFAULT 'TERSEDIA';

-- AlterTable
ALTER TABLE `transaksi` MODIFY `status_Pembayaran` ENUM('BELUM_DIBAYAR', 'SUDAH_DIBAYAR', 'DITERIMA', 'DIBATALKAN', 'DITOLAK') NOT NULL DEFAULT 'BELUM_DIBAYAR';

-- AddForeignKey
ALTER TABLE `transaksi` ADD CONSTRAINT `fk_transaksi_to_cs` FOREIGN KEY (`id_cs_verif`) REFERENCES `pegawai`(`id_pegawai`) ON DELETE CASCADE ON UPDATE CASCADE;
