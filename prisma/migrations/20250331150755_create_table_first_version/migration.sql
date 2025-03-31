-- CreateTable
CREATE TABLE `jabatan` (
    `id_jabatan` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_jabatan` VARCHAR(32) NOT NULL,

    PRIMARY KEY (`id_jabatan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pegawai` (
    `id_pegawai` VARCHAR(16) NOT NULL,
    `nama` VARCHAR(255) NOT NULL,
    `nomor_telepon` VARCHAR(15) NOT NULL,
    `komisi` DOUBLE NOT NULL,
    `tgl_lahir` DATETIME(3) NOT NULL,
    `id_jabatan` INTEGER NOT NULL,

    PRIMARY KEY (`id_pegawai`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `organisasi` (
    `id_organisasi` VARCHAR(16) NOT NULL,
    `nama_organisasi` VARCHAR(255) NOT NULL,
    `alamat` TEXT NOT NULL,
    `nomor_telepon` VARCHAR(15) NOT NULL,
    `deskripsi` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id_organisasi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `penitip` (
    `id_penitip` VARCHAR(16) NOT NULL,
    `nomor_ktp` VARCHAR(32) NOT NULL,
    `nama` VARCHAR(255) NOT NULL,
    `alamat` VARCHAR(255) NOT NULL,
    `nomor_telepon` VARCHAR(15) NOT NULL,
    `saldo` DOUBLE NOT NULL,
    `rating` DOUBLE NOT NULL,
    `total_review` DOUBLE NOT NULL,
    `jumlah_review` INTEGER NOT NULL,
    `total_per_bulan` DOUBLE NOT NULL,
    `poin` INTEGER NOT NULL,

    PRIMARY KEY (`id_penitip`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pembeli` (
    `id_pembeli` VARCHAR(16) NOT NULL,
    `nama` VARCHAR(255) NOT NULL,
    `nomor_telepon` VARCHAR(15) NOT NULL,
    `poin_loyalitas` INTEGER NOT NULL,

    PRIMARY KEY (`id_pembeli`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Alamat` (
    `id_alamat` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_alamat` VARCHAR(255) NOT NULL,
    `detail_alamat` VARCHAR(255) NOT NULL,
    `status_default` BOOLEAN NOT NULL DEFAULT false,
    `id_pembeli` VARCHAR(16) NOT NULL,

    PRIMARY KEY (`id_alamat`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('PEMBELI', 'PENITIP', 'PEGAWAI', 'ORGANISASI') NOT NULL DEFAULT 'PEMBELI',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `id_referensi` VARCHAR(16) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_id_referensi_key`(`id_referensi`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `redeem_merchandise` (
    `id_redeem_merch` INTEGER NOT NULL AUTO_INCREMENT,
    `tanggal_redeem` DATETIME(3) NOT NULL,
    `id_pembeli` VARCHAR(16) NOT NULL,

    PRIMARY KEY (`id_redeem_merch`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `merchandise` (
    `id_merchandise` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_merch` VARCHAR(255) NOT NULL,
    `harga_poin` INTEGER NOT NULL,
    `stok` INTEGER NOT NULL,

    PRIMARY KEY (`id_merchandise`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dtl_redeem_merch` (
    `id_dtl_redeem_merch` INTEGER NOT NULL AUTO_INCREMENT,
    `jumlah_merch` INTEGER NOT NULL,
    `id_redeem_merch` INTEGER NOT NULL,
    `id_merchandise` INTEGER NOT NULL,

    PRIMARY KEY (`id_dtl_redeem_merch`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kategori` (
    `id_kategori` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_kategori` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id_kategori`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `barang` (
    `id_barang` VARCHAR(16) NOT NULL,
    `nama_barang` VARCHAR(255) NOT NULL,
    `deskripsi` VARCHAR(255) NOT NULL,
    `harga` DOUBLE NOT NULL,
    `status` VARCHAR(32) NOT NULL,
    `garansi` DATETIME(3) NOT NULL,
    `berat` DOUBLE NOT NULL,
    `id_kategori` INTEGER NOT NULL,

    PRIMARY KEY (`id_barang`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `diskusi` (
    `id_diskusi` INTEGER NOT NULL AUTO_INCREMENT,
    `tanggal_diskusi` DATETIME(3) NOT NULL,
    `pesan` VARCHAR(255) NOT NULL,
    `id_barang` VARCHAR(16) NOT NULL,
    `id_user` INTEGER NOT NULL,

    PRIMARY KEY (`id_diskusi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaksi` (
    `id_transaksi` VARCHAR(16) NOT NULL,
    `tanggal_transaksi` DATETIME(3) NOT NULL,
    `total_harga` DOUBLE NOT NULL,
    `status_Pembayaran` VARCHAR(32) NOT NULL,
    `tanggal_pembayaran` DATETIME(3) NOT NULL,
    `bukti_transfer` VARCHAR(255) NOT NULL,
    `poin` INTEGER NOT NULL,
    `potongan_poin` INTEGER NOT NULL,
    `metode_pengiriman` VARCHAR(50) NOT NULL,
    `ongkos_kirim` DOUBLE NOT NULL,
    `total_akhir` DOUBLE NOT NULL,
    `id_pembeli` VARCHAR(16) NOT NULL,

    PRIMARY KEY (`id_transaksi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dtl_transaksi` (
    `id_dtl_transaksi` INTEGER NOT NULL AUTO_INCREMENT,
    `id_barang` VARCHAR(16) NOT NULL,
    `id_transaksi` VARCHAR(16) NOT NULL,

    UNIQUE INDEX `dtl_transaksi_id_barang_key`(`id_barang`),
    PRIMARY KEY (`id_dtl_transaksi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `keranjang` (
    `id_keranjang` INTEGER NOT NULL AUTO_INCREMENT,
    `id_barang` VARCHAR(16) NOT NULL,
    `id_pembeli` VARCHAR(16) NOT NULL,

    PRIMARY KEY (`id_keranjang`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `request_donasi` (
    `id_request` INTEGER NOT NULL AUTO_INCREMENT,
    `deskripsi` VARCHAR(255) NOT NULL,
    `tanggal_request` DATETIME(3) NOT NULL,
    `status` VARCHAR(32) NOT NULL,
    `id_organisasi` VARCHAR(16) NOT NULL,

    PRIMARY KEY (`id_request`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `donasi` (
    `id_donasi` INTEGER NOT NULL AUTO_INCREMENT,
    `tanggal_donasi` DATETIME(3) NOT NULL,
    `nama_penerima` VARCHAR(255) NOT NULL,
    `id_barang` VARCHAR(16) NOT NULL,
    `id_request` INTEGER NOT NULL,

    UNIQUE INDEX `donasi_id_barang_key`(`id_barang`),
    UNIQUE INDEX `donasi_id_request_key`(`id_request`),
    PRIMARY KEY (`id_donasi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `penitipan` (
    `id_penitipan` VARCHAR(16) NOT NULL,
    `tanggal_masuk` DATETIME(3) NOT NULL,
    `tanggal_akhir` DATETIME(3) NOT NULL,
    `tanggal_laku` DATETIME(3) NOT NULL,
    `batas_ambil` DATETIME(3) NOT NULL,
    `is_perpanjang` BOOLEAN NOT NULL DEFAULT false,
    `id_penitip` VARCHAR(16) NOT NULL,
    `id_hunter` VARCHAR(16) NULL,
    `id_pegawai_qc` VARCHAR(16) NOT NULL,

    PRIMARY KEY (`id_penitipan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dtl_penitipan` (
    `id_dtl_penitipan` INTEGER NOT NULL AUTO_INCREMENT,
    `id_penitipan` VARCHAR(16) NOT NULL,
    `id_barang` VARCHAR(16) NOT NULL,

    UNIQUE INDEX `dtl_penitipan_id_barang_key`(`id_barang`),
    PRIMARY KEY (`id_dtl_penitipan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pengiriman` (
    `id_pengiriman` INTEGER NOT NULL AUTO_INCREMENT,
    `tanggal` DATETIME(3) NOT NULL,
    `status_pengiriman` VARCHAR(255) NOT NULL,
    `id_kurir` VARCHAR(16) NOT NULL,
    `id_alamat` INTEGER NOT NULL,
    `id_transaksi` VARCHAR(16) NOT NULL,

    UNIQUE INDEX `Pengiriman_id_transaksi_key`(`id_transaksi`),
    PRIMARY KEY (`id_pengiriman`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pegawai` ADD CONSTRAINT `pegawai_id_jabatan_fkey` FOREIGN KEY (`id_jabatan`) REFERENCES `jabatan`(`id_jabatan`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Alamat` ADD CONSTRAINT `fk_alamat_to_pembeli` FOREIGN KEY (`id_pembeli`) REFERENCES `pembeli`(`id_pembeli`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `fk_user_to_pegawai` FOREIGN KEY (`id_referensi`) REFERENCES `pegawai`(`id_pegawai`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `fk_user_to_organisasi` FOREIGN KEY (`id_referensi`) REFERENCES `organisasi`(`id_organisasi`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `fk_user_to_penitip` FOREIGN KEY (`id_referensi`) REFERENCES `penitip`(`id_penitip`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `fk_user_to_pembeli` FOREIGN KEY (`id_referensi`) REFERENCES `pembeli`(`id_pembeli`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `redeem_merchandise` ADD CONSTRAINT `fk_redeem_merch_to_pembeli` FOREIGN KEY (`id_pembeli`) REFERENCES `pembeli`(`id_pembeli`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dtl_redeem_merch` ADD CONSTRAINT `fk_detail_redeem_to_redeem_merch` FOREIGN KEY (`id_redeem_merch`) REFERENCES `redeem_merchandise`(`id_redeem_merch`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dtl_redeem_merch` ADD CONSTRAINT `fk_detail_redeem_to_merchandise` FOREIGN KEY (`id_merchandise`) REFERENCES `merchandise`(`id_merchandise`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `barang` ADD CONSTRAINT `fk_barang_to_kategori` FOREIGN KEY (`id_kategori`) REFERENCES `kategori`(`id_kategori`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `diskusi` ADD CONSTRAINT `fk_diskusi_to_barang` FOREIGN KEY (`id_barang`) REFERENCES `barang`(`id_barang`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `diskusi` ADD CONSTRAINT `fk_diskusi_to_user` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaksi` ADD CONSTRAINT `fk_transaksi_to_pembeli` FOREIGN KEY (`id_pembeli`) REFERENCES `pembeli`(`id_pembeli`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dtl_transaksi` ADD CONSTRAINT `fk_detail_transaksi_to_barang` FOREIGN KEY (`id_barang`) REFERENCES `barang`(`id_barang`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dtl_transaksi` ADD CONSTRAINT `fk_detail_transaksi_to_transaksi` FOREIGN KEY (`id_transaksi`) REFERENCES `transaksi`(`id_transaksi`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `keranjang` ADD CONSTRAINT `fk_keranjang_to_barang` FOREIGN KEY (`id_barang`) REFERENCES `barang`(`id_barang`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `keranjang` ADD CONSTRAINT `fk_keranjang_to_pembeli` FOREIGN KEY (`id_pembeli`) REFERENCES `pembeli`(`id_pembeli`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `request_donasi` ADD CONSTRAINT `fk_request_donasi_to_organisasi` FOREIGN KEY (`id_organisasi`) REFERENCES `organisasi`(`id_organisasi`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donasi` ADD CONSTRAINT `fk_donasi_to_barang` FOREIGN KEY (`id_barang`) REFERENCES `barang`(`id_barang`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donasi` ADD CONSTRAINT `fk_donasi_to_request` FOREIGN KEY (`id_request`) REFERENCES `request_donasi`(`id_request`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penitipan` ADD CONSTRAINT `fk_penitipan_to_penitip` FOREIGN KEY (`id_penitip`) REFERENCES `penitip`(`id_penitip`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penitipan` ADD CONSTRAINT `fk_penitipan_to_hunter` FOREIGN KEY (`id_hunter`) REFERENCES `pegawai`(`id_pegawai`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penitipan` ADD CONSTRAINT `fk_penitipan_to_qc` FOREIGN KEY (`id_pegawai_qc`) REFERENCES `pegawai`(`id_pegawai`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dtl_penitipan` ADD CONSTRAINT `fk_detail_penitipan_to_penitipan` FOREIGN KEY (`id_penitipan`) REFERENCES `penitipan`(`id_penitipan`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dtl_penitipan` ADD CONSTRAINT `fk_detail_penitipan_to_barang` FOREIGN KEY (`id_barang`) REFERENCES `barang`(`id_barang`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pengiriman` ADD CONSTRAINT `fk_pengiriman_to_kurir` FOREIGN KEY (`id_kurir`) REFERENCES `pegawai`(`id_pegawai`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pengiriman` ADD CONSTRAINT `fk_pengiriman_to_alamat` FOREIGN KEY (`id_alamat`) REFERENCES `Alamat`(`id_alamat`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pengiriman` ADD CONSTRAINT `fk_pengiriman_to_transaksi` FOREIGN KEY (`id_transaksi`) REFERENCES `transaksi`(`id_transaksi`) ON DELETE RESTRICT ON UPDATE CASCADE;
