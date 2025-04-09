/*
  Warnings:

  - You are about to alter the column `status` on the `request_donasi` table. The data in that column could be lost. The data in that column will be cast from `VarChar(32)` to `Enum(EnumId(4))`.

*/
-- AlterTable
ALTER TABLE `request_donasi` MODIFY `status` ENUM('MENUNGGU', 'DISETUJUI') NOT NULL DEFAULT 'MENUNGGU';
