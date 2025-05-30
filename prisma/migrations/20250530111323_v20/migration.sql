-- DropForeignKey
ALTER TABLE `dtl_transaksi` DROP FOREIGN KEY `fk_detail_transaksi_to_barang`;

-- DropIndex
DROP INDEX `dtl_transaksi_id_barang_key` ON `dtl_transaksi`;
