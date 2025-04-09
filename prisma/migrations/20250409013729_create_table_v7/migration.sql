/*
  Warnings:

  - You are about to alter the column `id_penitipan` on the `dtl_penitipan` table. The data in that column could be lost. The data in that column will be cast from `VarChar(16)` to `Int`.
  - You are about to alter the column `id_transaksi` on the `dtl_transaksi` table. The data in that column could be lost. The data in that column will be cast from `VarChar(16)` to `Int`.
  - You are about to alter the column `id_transaksi` on the `pengiriman` table. The data in that column could be lost. The data in that column will be cast from `VarChar(16)` to `Int`.
  - The primary key for the `penitipan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id_penitipan` on the `penitipan` table. The data in that column could be lost. The data in that column will be cast from `VarChar(16)` to `Int`.
  - The primary key for the `transaksi` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id_transaksi` on the `transaksi` table. The data in that column could be lost. The data in that column will be cast from `VarChar(16)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `dtl_penitipan` DROP FOREIGN KEY `fk_detail_penitipan_to_penitipan`;

-- DropForeignKey
ALTER TABLE `dtl_transaksi` DROP FOREIGN KEY `fk_detail_transaksi_to_transaksi`;

-- DropForeignKey
ALTER TABLE `pengiriman` DROP FOREIGN KEY `fk_pengiriman_to_transaksi`;

-- DropIndex
DROP INDEX `fk_detail_penitipan_to_penitipan` ON `dtl_penitipan`;

-- DropIndex
DROP INDEX `fk_detail_transaksi_to_transaksi` ON `dtl_transaksi`;

-- AlterTable
ALTER TABLE `dtl_penitipan` MODIFY `id_penitipan` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `dtl_transaksi` MODIFY `id_transaksi` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `pengiriman` MODIFY `id_transaksi` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `penitipan` DROP PRIMARY KEY,
    MODIFY `id_penitipan` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id_penitipan`);

-- AlterTable
ALTER TABLE `transaksi` DROP PRIMARY KEY,
    MODIFY `id_transaksi` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id_transaksi`);

-- AddForeignKey
ALTER TABLE `dtl_transaksi` ADD CONSTRAINT `fk_detail_transaksi_to_transaksi` FOREIGN KEY (`id_transaksi`) REFERENCES `transaksi`(`id_transaksi`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dtl_penitipan` ADD CONSTRAINT `fk_detail_penitipan_to_penitipan` FOREIGN KEY (`id_penitipan`) REFERENCES `penitipan`(`id_penitipan`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengiriman` ADD CONSTRAINT `fk_pengiriman_to_transaksi` FOREIGN KEY (`id_transaksi`) REFERENCES `transaksi`(`id_transaksi`) ON DELETE RESTRICT ON UPDATE CASCADE;
