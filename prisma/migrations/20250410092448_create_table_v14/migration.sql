/*
  Warnings:

  - You are about to drop the column `is_top_rating` on the `penitip` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `penitip` DROP COLUMN `is_top_rating`,
    ADD COLUMN `is_top_seller` BOOLEAN NOT NULL DEFAULT false;
