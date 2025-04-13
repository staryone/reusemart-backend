-- DropForeignKey
ALTER TABLE `alamat` DROP FOREIGN KEY `fk_alamat_to_pembeli`;

-- DropForeignKey
ALTER TABLE `barang` DROP FOREIGN KEY `fk_barang_to_kategori`;

-- DropForeignKey
ALTER TABLE `diskusi` DROP FOREIGN KEY `fk_diskusi_to_barang`;

-- DropForeignKey
ALTER TABLE `diskusi` DROP FOREIGN KEY `fk_diskusi_to_user`;

-- DropForeignKey
ALTER TABLE `donasi` DROP FOREIGN KEY `fk_donasi_to_barang`;

-- DropForeignKey
ALTER TABLE `donasi` DROP FOREIGN KEY `fk_donasi_to_request`;

-- DropForeignKey
ALTER TABLE `dtl_penitipan` DROP FOREIGN KEY `fk_detail_penitipan_to_barang`;

-- DropForeignKey
ALTER TABLE `dtl_penitipan` DROP FOREIGN KEY `fk_detail_penitipan_to_penitipan`;

-- DropForeignKey
ALTER TABLE `dtl_redeem_merch` DROP FOREIGN KEY `fk_detail_redeem_to_merchandise`;

-- DropForeignKey
ALTER TABLE `dtl_redeem_merch` DROP FOREIGN KEY `fk_detail_redeem_to_redeem_merch`;

-- DropForeignKey
ALTER TABLE `dtl_transaksi` DROP FOREIGN KEY `fk_detail_transaksi_to_barang`;

-- DropForeignKey
ALTER TABLE `dtl_transaksi` DROP FOREIGN KEY `fk_detail_transaksi_to_transaksi`;

-- DropForeignKey
ALTER TABLE `keranjang` DROP FOREIGN KEY `fk_keranjang_to_barang`;

-- DropForeignKey
ALTER TABLE `keranjang` DROP FOREIGN KEY `fk_keranjang_to_pembeli`;

-- DropForeignKey
ALTER TABLE `pembeli` DROP FOREIGN KEY `fk_pembeli_to_user`;

-- DropForeignKey
ALTER TABLE `pengiriman` DROP FOREIGN KEY `fk_pengiriman_to_alamat`;

-- DropForeignKey
ALTER TABLE `pengiriman` DROP FOREIGN KEY `fk_pengiriman_to_kurir`;

-- DropForeignKey
ALTER TABLE `pengiriman` DROP FOREIGN KEY `fk_pengiriman_to_transaksi`;

-- DropForeignKey
ALTER TABLE `penitip` DROP FOREIGN KEY `fk_penitip_to_user`;

-- DropForeignKey
ALTER TABLE `penitipan` DROP FOREIGN KEY `fk_penitipan_to_hunter`;

-- DropForeignKey
ALTER TABLE `penitipan` DROP FOREIGN KEY `fk_penitipan_to_penitip`;

-- DropForeignKey
ALTER TABLE `penitipan` DROP FOREIGN KEY `fk_penitipan_to_qc`;

-- DropForeignKey
ALTER TABLE `redeem_merchandise` DROP FOREIGN KEY `fk_redeem_merch_to_pembeli`;

-- DropForeignKey
ALTER TABLE `request_donasi` DROP FOREIGN KEY `fk_request_donasi_to_organisasi`;

-- DropForeignKey
ALTER TABLE `transaksi` DROP FOREIGN KEY `fk_transaksi_to_pembeli`;

-- DropIndex
DROP INDEX `fk_alamat_to_pembeli` ON `alamat`;

-- DropIndex
DROP INDEX `fk_barang_to_kategori` ON `barang`;

-- DropIndex
DROP INDEX `fk_diskusi_to_barang` ON `diskusi`;

-- DropIndex
DROP INDEX `fk_diskusi_to_user` ON `diskusi`;

-- DropIndex
DROP INDEX `fk_detail_penitipan_to_penitipan` ON `dtl_penitipan`;

-- DropIndex
DROP INDEX `fk_detail_redeem_to_merchandise` ON `dtl_redeem_merch`;

-- DropIndex
DROP INDEX `fk_detail_redeem_to_redeem_merch` ON `dtl_redeem_merch`;

-- DropIndex
DROP INDEX `fk_detail_transaksi_to_transaksi` ON `dtl_transaksi`;

-- DropIndex
DROP INDEX `fk_keranjang_to_barang` ON `keranjang`;

-- DropIndex
DROP INDEX `fk_keranjang_to_pembeli` ON `keranjang`;

-- DropIndex
DROP INDEX `fk_pengiriman_to_alamat` ON `pengiriman`;

-- DropIndex
DROP INDEX `fk_pengiriman_to_kurir` ON `pengiriman`;

-- DropIndex
DROP INDEX `fk_penitipan_to_hunter` ON `penitipan`;

-- DropIndex
DROP INDEX `fk_penitipan_to_penitip` ON `penitipan`;

-- DropIndex
DROP INDEX `fk_penitipan_to_qc` ON `penitipan`;

-- DropIndex
DROP INDEX `fk_redeem_merch_to_pembeli` ON `redeem_merchandise`;

-- DropIndex
DROP INDEX `fk_request_donasi_to_organisasi` ON `request_donasi`;

-- DropIndex
DROP INDEX `fk_transaksi_to_pembeli` ON `transaksi`;

-- AddForeignKey
ALTER TABLE `penitip` ADD CONSTRAINT `fk_penitip_to_user` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pembeli` ADD CONSTRAINT `fk_pembeli_to_user` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alamat` ADD CONSTRAINT `fk_alamat_to_pembeli` FOREIGN KEY (`id_pembeli`) REFERENCES `pembeli`(`id_pembeli`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `redeem_merchandise` ADD CONSTRAINT `fk_redeem_merch_to_pembeli` FOREIGN KEY (`id_pembeli`) REFERENCES `pembeli`(`id_pembeli`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dtl_redeem_merch` ADD CONSTRAINT `fk_detail_redeem_to_redeem_merch` FOREIGN KEY (`id_redeem_merch`) REFERENCES `redeem_merchandise`(`id_redeem_merch`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dtl_redeem_merch` ADD CONSTRAINT `fk_detail_redeem_to_merchandise` FOREIGN KEY (`id_merchandise`) REFERENCES `merchandise`(`id_merchandise`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `barang` ADD CONSTRAINT `fk_barang_to_kategori` FOREIGN KEY (`id_kategori`) REFERENCES `kategori`(`id_kategori`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `diskusi` ADD CONSTRAINT `fk_diskusi_to_barang` FOREIGN KEY (`id_barang`) REFERENCES `barang`(`id_barang`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `diskusi` ADD CONSTRAINT `fk_diskusi_to_user` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaksi` ADD CONSTRAINT `fk_transaksi_to_pembeli` FOREIGN KEY (`id_pembeli`) REFERENCES `pembeli`(`id_pembeli`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dtl_transaksi` ADD CONSTRAINT `fk_detail_transaksi_to_barang` FOREIGN KEY (`id_barang`) REFERENCES `barang`(`id_barang`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dtl_transaksi` ADD CONSTRAINT `fk_detail_transaksi_to_transaksi` FOREIGN KEY (`id_transaksi`) REFERENCES `transaksi`(`id_transaksi`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `keranjang` ADD CONSTRAINT `fk_keranjang_to_barang` FOREIGN KEY (`id_barang`) REFERENCES `barang`(`id_barang`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `keranjang` ADD CONSTRAINT `fk_keranjang_to_pembeli` FOREIGN KEY (`id_pembeli`) REFERENCES `pembeli`(`id_pembeli`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `request_donasi` ADD CONSTRAINT `fk_request_donasi_to_organisasi` FOREIGN KEY (`id_organisasi`) REFERENCES `organisasi`(`id_organisasi`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donasi` ADD CONSTRAINT `fk_donasi_to_barang` FOREIGN KEY (`id_barang`) REFERENCES `barang`(`id_barang`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donasi` ADD CONSTRAINT `fk_donasi_to_request` FOREIGN KEY (`id_request`) REFERENCES `request_donasi`(`id_request`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penitipan` ADD CONSTRAINT `fk_penitipan_to_penitip` FOREIGN KEY (`id_penitip`) REFERENCES `penitip`(`id_penitip`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penitipan` ADD CONSTRAINT `fk_penitipan_to_hunter` FOREIGN KEY (`id_hunter`) REFERENCES `pegawai`(`id_pegawai`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penitipan` ADD CONSTRAINT `fk_penitipan_to_qc` FOREIGN KEY (`id_pegawai_qc`) REFERENCES `pegawai`(`id_pegawai`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dtl_penitipan` ADD CONSTRAINT `fk_detail_penitipan_to_penitipan` FOREIGN KEY (`id_penitipan`) REFERENCES `penitipan`(`id_penitipan`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dtl_penitipan` ADD CONSTRAINT `fk_detail_penitipan_to_barang` FOREIGN KEY (`id_barang`) REFERENCES `barang`(`id_barang`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengiriman` ADD CONSTRAINT `fk_pengiriman_to_kurir` FOREIGN KEY (`id_kurir`) REFERENCES `pegawai`(`id_pegawai`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengiriman` ADD CONSTRAINT `fk_pengiriman_to_alamat` FOREIGN KEY (`id_alamat`) REFERENCES `alamat`(`id_alamat`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengiriman` ADD CONSTRAINT `fk_pengiriman_to_transaksi` FOREIGN KEY (`id_transaksi`) REFERENCES `transaksi`(`id_transaksi`) ON DELETE CASCADE ON UPDATE CASCADE;
