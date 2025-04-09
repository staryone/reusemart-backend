/*
  Warnings:

  - Added the required column `path_gambar` to the `barang` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `barang` ADD COLUMN `path_gambar` VARCHAR(255) NOT NULL;
