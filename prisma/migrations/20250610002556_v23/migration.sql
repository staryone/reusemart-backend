/*
  Warnings:

  - Added the required column `url_gambar` to the `merchandise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `merchandise` ADD COLUMN `url_gambar` VARCHAR(255) NOT NULL;
