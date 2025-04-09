/*
  Warnings:

  - You are about to alter the column `id_pembeli` on the `alamat` table. The data in that column could be lost. The data in that column will be cast from `VarChar(16)` to `Int`.
  - The primary key for the `barang` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id_barang` on the `barang` table. The data in that column could be lost. The data in that column will be cast from `VarChar(16)` to `Int`.
  - You are about to alter the column `id_barang` on the `diskusi` table. The data in that column could be lost. The data in that column will be cast from `VarChar(16)` to `Int`.
  - You are about to alter the column `id_barang` on the `donasi` table. The data in that column could be lost. The data in that column will be cast from `VarChar(16)` to `Int`.
  - You are about to alter the column `id_barang` on the `dtl_penitipan` table. The data in that column could be lost. The data in that column will be cast from `VarChar(16)` to `Int`.
  - You are about to alter the column `id_barang` on the `dtl_transaksi` table. The data in that column could be lost. The data in that column will be cast from `VarChar(16)` to `Int`.
  - You are about to alter the column `id_barang` on the `keranjang` table. The data in that column could be lost. The data in that column will be cast from `VarChar(16)` to `Int`.
  - You are about to alter the column `id_pembeli` on the `keranjang` table. The data in that column could be lost. The data in that column will be cast from `VarChar(16)` to `Int`.
  - The primary key for the `organisasi` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id_organisasi` on the `organisasi` table. The data in that column could be lost. The data in that column will be cast from `VarChar(16)` to `Int`.
  - The primary key for the `pegawai` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id_pegawai` on the `pegawai` table. The data in that column could be lost. The data in that column will be cast from `VarChar(16)` to `Int`.
  - The primary key for the `pembeli` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id_pembeli` on the `pembeli` table. The data in that column could be lost. The data in that column will be cast from `VarChar(16)` to `Int`.
  - You are about to alter the column `id_kurir` on the `pengiriman` table. The data in that column could be lost. The data in that column will be cast from `VarChar(16)` to `Int`.
  - The primary key for the `penitip` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id_penitip` on the `penitip` table. The data in that column could be lost. The data in that column will be cast from `VarChar(16)` to `Int`.
  - You are about to alter the column `id_penitip` on the `penitipan` table. The data in that column could be lost. The data in that column will be cast from `VarChar(16)` to `Int`.
  - You are about to alter the column `id_hunter` on the `penitipan` table. The data in that column could be lost. The data in that column will be cast from `VarChar(16)` to `Int`.
  - You are about to alter the column `id_pegawai_qc` on the `penitipan` table. The data in that column could be lost. The data in that column will be cast from `VarChar(16)` to `Int`.
  - You are about to alter the column `id_pembeli` on the `redeem_merchandise` table. The data in that column could be lost. The data in that column will be cast from `VarChar(16)` to `Int`.
  - You are about to alter the column `id_organisasi` on the `request_donasi` table. The data in that column could be lost. The data in that column will be cast from `VarChar(16)` to `Int`.
  - You are about to alter the column `id_pembeli` on the `transaksi` table. The data in that column could be lost. The data in that column will be cast from `VarChar(16)` to `Int`.
  - You are about to drop the column `id_referensi` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_user]` on the table `organisasi` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_user]` on the table `pegawai` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_user]` on the table `pembeli` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_user]` on the table `penitip` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `prefix` to the `barang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `organisasi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `pegawai` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `pembeli` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `penitip` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `alamat` DROP FOREIGN KEY `fk_alamat_to_pembeli`;

-- DropForeignKey
ALTER TABLE `diskusi` DROP FOREIGN KEY `fk_diskusi_to_barang`;

-- DropForeignKey
ALTER TABLE `donasi` DROP FOREIGN KEY `fk_donasi_to_barang`;

-- DropForeignKey
ALTER TABLE `dtl_penitipan` DROP FOREIGN KEY `fk_detail_penitipan_to_barang`;

-- DropForeignKey
ALTER TABLE `dtl_transaksi` DROP FOREIGN KEY `fk_detail_transaksi_to_barang`;

-- DropForeignKey
ALTER TABLE `keranjang` DROP FOREIGN KEY `fk_keranjang_to_barang`;

-- DropForeignKey
ALTER TABLE `keranjang` DROP FOREIGN KEY `fk_keranjang_to_pembeli`;

-- DropForeignKey
ALTER TABLE `pengiriman` DROP FOREIGN KEY `fk_pengiriman_to_kurir`;

-- DropForeignKey
ALTER TABLE `penitipan` DROP FOREIGN KEY `fk_penitipan_to_hunter`;

-- DropForeignKey
ALTER TABLE `penitipan` DROP FOREIGN KEY `fk_penitipan_to_penitip`;

-- DropForeignKey
ALTER TABLE `penitipan` DROP FOREIGN KEY `fk_penitipan_to_qc`;

-- DropForeignKey
ALTER TABLE `redeem_merchandise` DROP FOREIGN KEY `fk_redeem_merch_to_pembeli`;

-- DropForeignKey
ALTER TABLE `request_donasi` DROP FOREIGN KEY `fk_request_donasi_to_organisasi`;

-- DropForeignKey
ALTER TABLE `transaksi` DROP FOREIGN KEY `fk_transaksi_to_pembeli`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `fk_user_to_organisasi`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `fk_user_to_pegawai`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `fk_user_to_pembeli`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `fk_user_to_penitip`;

-- DropIndex
DROP INDEX `fk_alamat_to_pembeli` ON `alamat`;

-- DropIndex
DROP INDEX `fk_diskusi_to_barang` ON `diskusi`;

-- DropIndex
DROP INDEX `fk_keranjang_to_barang` ON `keranjang`;

-- DropIndex
DROP INDEX `fk_keranjang_to_pembeli` ON `keranjang`;

-- DropIndex
DROP INDEX `fk_pengiriman_to_kurir` ON `pengiriman`;

-- DropIndex
DROP INDEX `fk_penitipan_to_hunter` ON `penitipan`;

-- DropIndex
DROP INDEX `fk_penitipan_to_penitip` ON `penitipan`;

-- DropIndex
DROP INDEX `fk_penitipan_to_qc` ON `penitipan`;

-- DropIndex
DROP INDEX `fk_redeem_merch_to_pembeli` ON `redeem_merchandise`;

-- DropIndex
DROP INDEX `fk_request_donasi_to_organisasi` ON `request_donasi`;

-- DropIndex
DROP INDEX `fk_transaksi_to_pembeli` ON `transaksi`;

-- DropIndex
DROP INDEX `users_id_referensi_key` ON `users`;

-- AlterTable
ALTER TABLE `alamat` MODIFY `id_pembeli` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `barang` DROP PRIMARY KEY,
    ADD COLUMN `prefix` CHAR(1) NOT NULL,
    MODIFY `id_barang` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id_barang`);

-- AlterTable
ALTER TABLE `diskusi` MODIFY `id_barang` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `donasi` MODIFY `id_barang` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `dtl_penitipan` MODIFY `id_barang` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `dtl_transaksi` MODIFY `id_barang` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `keranjang` MODIFY `id_barang` INTEGER NOT NULL,
    MODIFY `id_pembeli` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `organisasi` DROP PRIMARY KEY,
    ADD COLUMN `id_user` INTEGER NOT NULL,
    ADD COLUMN `prefix` CHAR(3) NOT NULL DEFAULT 'ORG',
    MODIFY `id_organisasi` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id_organisasi`);

-- AlterTable
ALTER TABLE `pegawai` DROP PRIMARY KEY,
    ADD COLUMN `id_user` INTEGER NOT NULL,
    ADD COLUMN `prefix` CHAR(1) NOT NULL DEFAULT 'P',
    MODIFY `id_pegawai` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id_pegawai`);

-- AlterTable
ALTER TABLE `pembeli` DROP PRIMARY KEY,
    ADD COLUMN `id_user` INTEGER NOT NULL,
    MODIFY `id_pembeli` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id_pembeli`);

-- AlterTable
ALTER TABLE `pengiriman` MODIFY `id_kurir` INTEGER NULL;

-- AlterTable
ALTER TABLE `penitip` DROP PRIMARY KEY,
    ADD COLUMN `id_user` INTEGER NOT NULL,
    ADD COLUMN `prefix` CHAR(1) NOT NULL DEFAULT 'T',
    MODIFY `id_penitip` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id_penitip`);

-- AlterTable
ALTER TABLE `penitipan` MODIFY `tanggal_masuk` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `tanggal_laku` DATETIME(3) NULL,
    MODIFY `id_penitip` INTEGER NOT NULL,
    MODIFY `id_hunter` INTEGER NULL,
    MODIFY `id_pegawai_qc` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `redeem_merchandise` MODIFY `id_pembeli` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `request_donasi` MODIFY `id_organisasi` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `transaksi` MODIFY `id_pembeli` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `id_referensi`;

-- CreateIndex
CREATE UNIQUE INDEX `organisasi_id_user_key` ON `organisasi`(`id_user`);

-- CreateIndex
CREATE UNIQUE INDEX `pegawai_id_user_key` ON `pegawai`(`id_user`);

-- CreateIndex
CREATE UNIQUE INDEX `pembeli_id_user_key` ON `pembeli`(`id_user`);

-- CreateIndex
CREATE UNIQUE INDEX `penitip_id_user_key` ON `penitip`(`id_user`);

-- AddForeignKey
ALTER TABLE `pegawai` ADD CONSTRAINT `fk_pegawai_to_user` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `organisasi` ADD CONSTRAINT `fk_organisasi_to_user` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penitip` ADD CONSTRAINT `fk_penitip_to_user` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pembeli` ADD CONSTRAINT `fk_pembeli_to_user` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alamat` ADD CONSTRAINT `fk_alamat_to_pembeli` FOREIGN KEY (`id_pembeli`) REFERENCES `pembeli`(`id_pembeli`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `redeem_merchandise` ADD CONSTRAINT `fk_redeem_merch_to_pembeli` FOREIGN KEY (`id_pembeli`) REFERENCES `pembeli`(`id_pembeli`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `diskusi` ADD CONSTRAINT `fk_diskusi_to_barang` FOREIGN KEY (`id_barang`) REFERENCES `barang`(`id_barang`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaksi` ADD CONSTRAINT `fk_transaksi_to_pembeli` FOREIGN KEY (`id_pembeli`) REFERENCES `pembeli`(`id_pembeli`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dtl_transaksi` ADD CONSTRAINT `fk_detail_transaksi_to_barang` FOREIGN KEY (`id_barang`) REFERENCES `barang`(`id_barang`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `keranjang` ADD CONSTRAINT `fk_keranjang_to_barang` FOREIGN KEY (`id_barang`) REFERENCES `barang`(`id_barang`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `keranjang` ADD CONSTRAINT `fk_keranjang_to_pembeli` FOREIGN KEY (`id_pembeli`) REFERENCES `pembeli`(`id_pembeli`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `request_donasi` ADD CONSTRAINT `fk_request_donasi_to_organisasi` FOREIGN KEY (`id_organisasi`) REFERENCES `organisasi`(`id_organisasi`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donasi` ADD CONSTRAINT `fk_donasi_to_barang` FOREIGN KEY (`id_barang`) REFERENCES `barang`(`id_barang`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penitipan` ADD CONSTRAINT `fk_penitipan_to_penitip` FOREIGN KEY (`id_penitip`) REFERENCES `penitip`(`id_penitip`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penitipan` ADD CONSTRAINT `fk_penitipan_to_hunter` FOREIGN KEY (`id_hunter`) REFERENCES `pegawai`(`id_pegawai`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penitipan` ADD CONSTRAINT `fk_penitipan_to_qc` FOREIGN KEY (`id_pegawai_qc`) REFERENCES `pegawai`(`id_pegawai`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dtl_penitipan` ADD CONSTRAINT `fk_detail_penitipan_to_barang` FOREIGN KEY (`id_barang`) REFERENCES `barang`(`id_barang`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengiriman` ADD CONSTRAINT `fk_pengiriman_to_kurir` FOREIGN KEY (`id_kurir`) REFERENCES `pegawai`(`id_pegawai`) ON DELETE SET NULL ON UPDATE CASCADE;
