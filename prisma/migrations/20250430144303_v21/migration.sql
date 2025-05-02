/*
  Warnings:

  - Added the required column `foto_ktp` to the `penitip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `penitip` ADD COLUMN `foto_ktp` VARCHAR(255) NOT NULL;
