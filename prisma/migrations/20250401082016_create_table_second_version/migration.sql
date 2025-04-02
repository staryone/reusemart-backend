/*
  Warnings:

  - You are about to drop the `Alamat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pengiriman` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Alamat` DROP FOREIGN KEY `fk_alamat_to_pembeli`;

-- DropForeignKey
ALTER TABLE `Pengiriman` DROP FOREIGN KEY `fk_pengiriman_to_alamat`;

-- DropForeignKey
ALTER TABLE `Pengiriman` DROP FOREIGN KEY `fk_pengiriman_to_kurir`;

-- DropForeignKey
ALTER TABLE `Pengiriman` DROP FOREIGN KEY `fk_pengiriman_to_transaksi`;

-- DropTable
DROP TABLE `Alamat`;

-- DropTable
DROP TABLE `Pengiriman`;

-- CreateTable
CREATE TABLE `alamat` (
    `id_alamat` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_alamat` VARCHAR(255) NOT NULL,
    `detail_alamat` VARCHAR(255) NOT NULL,
    `status_default` BOOLEAN NOT NULL DEFAULT false,
    `id_pembeli` VARCHAR(16) NOT NULL,

    PRIMARY KEY (`id_alamat`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pengiriman` (
    `id_pengiriman` INTEGER NOT NULL AUTO_INCREMENT,
    `tanggal` DATETIME(3) NOT NULL,
    `status_pengiriman` VARCHAR(255) NOT NULL,
    `id_kurir` VARCHAR(16) NOT NULL,
    `id_alamat` INTEGER NOT NULL,
    `id_transaksi` VARCHAR(16) NOT NULL,

    UNIQUE INDEX `pengiriman_id_transaksi_key`(`id_transaksi`),
    PRIMARY KEY (`id_pengiriman`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `alamat` ADD CONSTRAINT `fk_alamat_to_pembeli` FOREIGN KEY (`id_pembeli`) REFERENCES `pembeli`(`id_pembeli`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengiriman` ADD CONSTRAINT `fk_pengiriman_to_kurir` FOREIGN KEY (`id_kurir`) REFERENCES `pegawai`(`id_pegawai`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengiriman` ADD CONSTRAINT `fk_pengiriman_to_alamat` FOREIGN KEY (`id_alamat`) REFERENCES `alamat`(`id_alamat`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengiriman` ADD CONSTRAINT `fk_pengiriman_to_transaksi` FOREIGN KEY (`id_transaksi`) REFERENCES `transaksi`(`id_transaksi`) ON DELETE RESTRICT ON UPDATE CASCADE;
