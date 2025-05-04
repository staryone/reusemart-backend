/*
  Warnings:

  - You are about to drop the column `poin` on the `transaksi` table. All the data in the column will be lost.
  - Added the required column `poin` to the `dtl_transaksi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_poin` to the `transaksi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `donasi` ADD COLUMN `poin_penitip` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `dtl_transaksi` ADD COLUMN `komisi_hunter` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `komisi_penitip` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `komisi_reusemart` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `poin` INTEGER NOT NULL,
    MODIFY `id_transaksi` INTEGER NULL;

-- AlterTable
ALTER TABLE `transaksi` DROP COLUMN `poin`,
    ADD COLUMN `total_poin` INTEGER NOT NULL;
