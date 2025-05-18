/*
  Warnings:

  - You are about to drop the column `batas_ambil` on the `penitipan` table. All the data in the column will be lost.
  - You are about to drop the column `is_perpanjang` on the `penitipan` table. All the data in the column will be lost.
  - You are about to drop the column `tanggal_akhir` on the `penitipan` table. All the data in the column will be lost.
  - You are about to drop the column `tanggal_laku` on the `penitipan` table. All the data in the column will be lost.
  - You are about to drop the column `tanggal_masuk` on the `penitipan` table. All the data in the column will be lost.
  - Added the required column `batas_ambil` to the `dtl_penitipan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal_akhir` to the `dtl_penitipan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `dtl_penitipan` ADD COLUMN `batas_ambil` DATETIME(3) NOT NULL,
    ADD COLUMN `is_perpanjang` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `tanggal_akhir` DATETIME(3) NOT NULL,
    ADD COLUMN `tanggal_laku` DATETIME(3) NULL,
    ADD COLUMN `tanggal_masuk` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `penitipan` DROP COLUMN `batas_ambil`,
    DROP COLUMN `is_perpanjang`,
    DROP COLUMN `tanggal_akhir`,
    DROP COLUMN `tanggal_laku`,
    DROP COLUMN `tanggal_masuk`;
