/*
  Warnings:

  - You are about to drop the `dtl_redeem_merch` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_merchandise` to the `redeem_merchandise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jumlah_merch` to the `redeem_merchandise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `redeem_merchandise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal_ambil` to the `redeem_merchandise` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `dtl_redeem_merch` DROP FOREIGN KEY `fk_detail_redeem_to_merchandise`;

-- DropForeignKey
ALTER TABLE `dtl_redeem_merch` DROP FOREIGN KEY `fk_detail_redeem_to_redeem_merch`;

-- AlterTable
ALTER TABLE `redeem_merchandise` ADD COLUMN `id_merchandise` INTEGER NOT NULL,
    ADD COLUMN `jumlah_merch` INTEGER NOT NULL,
    ADD COLUMN `status` ENUM('BELUM_DIAMBIL', 'SUDAH_DIAMBIL') NOT NULL,
    ADD COLUMN `tanggal_ambil` DATETIME(3) NOT NULL;

-- DropTable
DROP TABLE `dtl_redeem_merch`;

-- CreateIndex
CREATE INDEX `fk_redeem_merch_to_merchandise` ON `redeem_merchandise`(`id_merchandise`);

-- AddForeignKey
ALTER TABLE `redeem_merchandise` ADD CONSTRAINT `fk_detail_redeem_to_merchandise` FOREIGN KEY (`id_merchandise`) REFERENCES `merchandise`(`id_merchandise`) ON DELETE CASCADE ON UPDATE CASCADE;
