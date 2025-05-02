/*
  Warnings:

  - You are about to drop the column `path_gambar` on the `barang` table. All the data in the column will be lost.
  - You are about to drop the column `id_alamat` on the `pengiriman` table. All the data in the column will be lost.
  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `pengiriman` DROP FOREIGN KEY `fk_pengiriman_to_alamat`;

-- DropForeignKey
ALTER TABLE `sessions` DROP FOREIGN KEY `fk_session_to_user`;

-- DropIndex
DROP INDEX `fk_pengiriman_to_alamat` ON `pengiriman`;

-- AlterTable
ALTER TABLE `barang` DROP COLUMN `path_gambar`;

-- AlterTable
ALTER TABLE `pengiriman` DROP COLUMN `id_alamat`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `transaksi` ADD COLUMN `id_alamat` INTEGER NULL,
    MODIFY `tanggal_transaksi` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `potongan_poin` INTEGER NOT NULL DEFAULT 0,
    MODIFY `ongkos_kirim` DOUBLE NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `sessions`;

-- CreateTable
CREATE TABLE `gambar_barang` (
    `id_gambar` INTEGER NOT NULL AUTO_INCREMENT,
    `url_gambar` VARCHAR(255) NOT NULL,
    `is_primary` BOOLEAN NOT NULL DEFAULT false,
    `order_number` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id_barang` INTEGER NOT NULL,

    PRIMARY KEY (`id_gambar`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `session` (
    `id_session` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expiresAt` DATETIME(3) NULL,
    `id_user` INTEGER NOT NULL,

    UNIQUE INDEX `session_token_key`(`token`),
    PRIMARY KEY (`id_session`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rating` (
    `id_rating` INTEGER NOT NULL AUTO_INCREMENT,
    `rating` INTEGER NOT NULL,
    `id_penitip` INTEGER NOT NULL,
    `id_dtl_transaksi` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `rating_id_dtl_transaksi_key`(`id_dtl_transaksi`),
    PRIMARY KEY (`id_rating`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `gambar_barang` ADD CONSTRAINT `fk_gambar_barang_to_barang` FOREIGN KEY (`id_barang`) REFERENCES `barang`(`id_barang`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaksi` ADD CONSTRAINT `fk_transaksi_to_alamat` FOREIGN KEY (`id_alamat`) REFERENCES `alamat`(`id_alamat`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `session` ADD CONSTRAINT `fk_session_to_user` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rating` ADD CONSTRAINT `fk_rating_to_penitip` FOREIGN KEY (`id_penitip`) REFERENCES `penitip`(`id_penitip`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rating` ADD CONSTRAINT `fk_rating_to_dtl_transaksi` FOREIGN KEY (`id_dtl_transaksi`) REFERENCES `dtl_transaksi`(`id_dtl_transaksi`) ON DELETE CASCADE ON UPDATE CASCADE;
