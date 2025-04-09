-- DropForeignKey
ALTER TABLE `pengiriman` DROP FOREIGN KEY `fk_pengiriman_to_alamat`;

-- DropIndex
DROP INDEX `fk_pengiriman_to_alamat` ON `pengiriman`;

-- AlterTable
ALTER TABLE `pengiriman` MODIFY `tanggal` DATETIME(3) NULL,
    MODIFY `id_alamat` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `pengiriman` ADD CONSTRAINT `fk_pengiriman_to_alamat` FOREIGN KEY (`id_alamat`) REFERENCES `alamat`(`id_alamat`) ON DELETE SET NULL ON UPDATE CASCADE;
