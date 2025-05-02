/*
  Warnings:

  - A unique constraint covering the columns `[nomor_ktp]` on the table `penitip` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `token` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `penitip_nomor_ktp_key` ON `penitip`(`nomor_ktp`);
