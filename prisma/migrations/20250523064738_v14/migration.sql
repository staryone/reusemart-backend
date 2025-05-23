-- AddForeignKey
ALTER TABLE `dtl_transaksi` ADD CONSTRAINT `fk_detail_transaksi_to_barang` FOREIGN KEY (`id_barang`) REFERENCES `barang`(`id_barang`) ON DELETE CASCADE ON UPDATE CASCADE;
