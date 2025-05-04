-- CreateTable
CREATE TABLE `users` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('PEMBELI', 'PENITIP', 'PEGAWAI', 'ORGANISASI') NOT NULL DEFAULT 'PEMBELI',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `token` VARCHAR(191) NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_token_key`(`token`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jabatan` (
    `id_jabatan` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_jabatan` VARCHAR(32) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_jabatan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pegawai` (
    `prefix` CHAR(1) NOT NULL DEFAULT 'P',
    `id_pegawai` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `nama` VARCHAR(255) NOT NULL,
    `nomor_telepon` VARCHAR(15) NOT NULL,
    `komisi` DOUBLE NOT NULL,
    `tgl_lahir` DATETIME(3) NOT NULL,
    `id_jabatan` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `pegawai_id_user_key`(`id_user`),
    PRIMARY KEY (`id_pegawai`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `organisasi` (
    `prefix` CHAR(3) NOT NULL DEFAULT 'ORG',
    `id_organisasi` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `nama_organisasi` VARCHAR(255) NOT NULL,
    `alamat` TEXT NOT NULL,
    `nomor_telepon` VARCHAR(15) NOT NULL,
    `deskripsi` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `organisasi_id_user_key`(`id_user`),
    PRIMARY KEY (`id_organisasi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `penitip` (
    `prefix` CHAR(1) NOT NULL DEFAULT 'T',
    `id_penitip` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `nomor_ktp` VARCHAR(32) NOT NULL,
    `foto_ktp` VARCHAR(255) NOT NULL,
    `nama` VARCHAR(255) NOT NULL,
    `alamat` VARCHAR(255) NOT NULL,
    `nomor_telepon` VARCHAR(15) NOT NULL,
    `saldo` DOUBLE NOT NULL,
    `rating` DOUBLE NOT NULL,
    `total_review` DOUBLE NOT NULL,
    `jumlah_review` INTEGER NOT NULL,
    `total_per_bulan` DOUBLE NOT NULL,
    `is_top_seller` BOOLEAN NOT NULL DEFAULT false,
    `poin` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `penitip_id_user_key`(`id_user`),
    UNIQUE INDEX `penitip_nomor_ktp_key`(`nomor_ktp`),
    PRIMARY KEY (`id_penitip`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pembeli` (
    `id_pembeli` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `nama` VARCHAR(255) NOT NULL,
    `nomor_telepon` VARCHAR(15) NOT NULL,
    `poin_loyalitas` INTEGER NOT NULL,

    UNIQUE INDEX `pembeli_id_user_key`(`id_user`),
    PRIMARY KEY (`id_pembeli`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `alamat` (
    `id_alamat` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_alamat` VARCHAR(255) NOT NULL,
    `detail_alamat` VARCHAR(255) NOT NULL,
    `status_default` BOOLEAN NOT NULL DEFAULT false,
    `id_pembeli` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_alamat`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `redeem_merchandise` (
    `id_redeem_merch` INTEGER NOT NULL AUTO_INCREMENT,
    `tanggal_redeem` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id_pembeli` INTEGER NOT NULL,

    PRIMARY KEY (`id_redeem_merch`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `merchandise` (
    `id_merchandise` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_merch` VARCHAR(255) NOT NULL,
    `harga_poin` INTEGER NOT NULL,
    `stok` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

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
    `prefix` CHAR(1) NOT NULL,
    `id_barang` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_barang` VARCHAR(255) NOT NULL,
    `deskripsi` VARCHAR(255) NOT NULL,
    `harga` DOUBLE NOT NULL,
    `status` ENUM('TERSEDIA', 'KEMBALI', 'DIDONASIKAN', 'TERJUAL') NOT NULL DEFAULT 'TERSEDIA',
    `garansi` DATETIME(3) NULL,
    `berat` DOUBLE NOT NULL,
    `id_kategori` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_barang`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gambar_barang` (
    `id_gambar` INTEGER NOT NULL AUTO_INCREMENT,
    `url_gambar` VARCHAR(255) NOT NULL,
    `is_primary` BOOLEAN NOT NULL DEFAULT false,
    `order_number` INTEGER NOT NULL DEFAULT 0,
    `id_barang` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_gambar`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `diskusi` (
    `id_diskusi` INTEGER NOT NULL AUTO_INCREMENT,
    `tanggal_diskusi` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `pesan` VARCHAR(255) NOT NULL,
    `id_barang` INTEGER NOT NULL,
    `id_user` INTEGER NOT NULL,

    PRIMARY KEY (`id_diskusi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaksi` (
    `id_transaksi` INTEGER NOT NULL AUTO_INCREMENT,
    `tanggal_transaksi` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `total_harga` DOUBLE NOT NULL,
    `status_Pembayaran` ENUM('BELUM_DIBAYAR', 'SUDAH_DIBAYAR', 'DITERIMA', 'DIBATALKAN') NOT NULL DEFAULT 'BELUM_DIBAYAR',
    `tanggal_pembayaran` DATETIME(3) NULL,
    `batas_pembayaran` DATETIME(3) NOT NULL,
    `bukti_transfer` VARCHAR(255) NOT NULL,
    `poin` INTEGER NOT NULL,
    `potongan_poin` INTEGER NOT NULL DEFAULT 0,
    `metode_pengiriman` ENUM('DIAMBIL', 'DIKIRIM') NOT NULL DEFAULT 'DIAMBIL',
    `ongkos_kirim` DOUBLE NOT NULL DEFAULT 0,
    `total_akhir` DOUBLE NOT NULL,
    `id_pembeli` INTEGER NOT NULL,
    `id_alamat` INTEGER NULL,

    PRIMARY KEY (`id_transaksi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dtl_transaksi` (
    `id_dtl_transaksi` INTEGER NOT NULL AUTO_INCREMENT,
    `id_barang` INTEGER NOT NULL,
    `id_transaksi` INTEGER NOT NULL,
    `is_rating` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `dtl_transaksi_id_barang_key`(`id_barang`),
    PRIMARY KEY (`id_dtl_transaksi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `keranjang` (
    `id_keranjang` INTEGER NOT NULL AUTO_INCREMENT,
    `id_barang` INTEGER NOT NULL,
    `id_pembeli` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_keranjang`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `request_donasi` (
    `id_request` INTEGER NOT NULL AUTO_INCREMENT,
    `deskripsi` VARCHAR(255) NOT NULL,
    `tanggal_request` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` ENUM('MENUNGGU', 'DISETUJUI') NOT NULL DEFAULT 'MENUNGGU',
    `id_organisasi` INTEGER NOT NULL,

    PRIMARY KEY (`id_request`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `donasi` (
    `id_donasi` INTEGER NOT NULL AUTO_INCREMENT,
    `tanggal_donasi` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `nama_penerima` VARCHAR(255) NOT NULL,
    `id_barang` INTEGER NOT NULL,
    `id_request` INTEGER NOT NULL,

    UNIQUE INDEX `donasi_id_barang_key`(`id_barang`),
    UNIQUE INDEX `donasi_id_request_key`(`id_request`),
    PRIMARY KEY (`id_donasi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `penitipan` (
    `id_penitipan` INTEGER NOT NULL AUTO_INCREMENT,
    `tanggal_masuk` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tanggal_akhir` DATETIME(3) NOT NULL,
    `tanggal_laku` DATETIME(3) NULL,
    `batas_ambil` DATETIME(3) NOT NULL,
    `is_perpanjang` BOOLEAN NOT NULL DEFAULT false,
    `id_penitip` INTEGER NOT NULL,
    `id_hunter` INTEGER NULL,
    `id_pegawai_qc` INTEGER NOT NULL,

    PRIMARY KEY (`id_penitipan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dtl_penitipan` (
    `id_dtl_penitipan` INTEGER NOT NULL AUTO_INCREMENT,
    `id_penitipan` INTEGER NOT NULL,
    `id_barang` INTEGER NOT NULL,

    UNIQUE INDEX `dtl_penitipan_id_barang_key`(`id_barang`),
    PRIMARY KEY (`id_dtl_penitipan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pengiriman` (
    `id_pengiriman` INTEGER NOT NULL AUTO_INCREMENT,
    `tanggal` DATETIME(3) NULL,
    `status_pengiriman` ENUM('DIPROSES', 'SIAP_DIAMBIL', 'SEDANG_DIKIRIM', 'SUDAH_DITERIMA') NOT NULL DEFAULT 'DIPROSES',
    `id_kurir` INTEGER NULL,
    `id_transaksi` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `pengiriman_id_transaksi_key`(`id_transaksi`),
    PRIMARY KEY (`id_pengiriman`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `session` (
    `id_session` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expiresAt` DATETIME(3) NULL,
    `id_user` INTEGER NOT NULL,

    UNIQUE INDEX `session_token_key`(`token`),
    PRIMARY KEY (`id_session`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rating` (
    `id_rating` INTEGER NOT NULL AUTO_INCREMENT,
    `rating` INTEGER NOT NULL,
    `id_penitip` INTEGER NOT NULL,
    `id_dtl_transaksi` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `rating_id_dtl_transaksi_key`(`id_dtl_transaksi`),
    PRIMARY KEY (`id_rating`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pegawai` ADD CONSTRAINT `fk_pegawai_to_user` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pegawai` ADD CONSTRAINT `pegawai_id_jabatan_fkey` FOREIGN KEY (`id_jabatan`) REFERENCES `jabatan`(`id_jabatan`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `organisasi` ADD CONSTRAINT `fk_organisasi_to_user` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE `gambar_barang` ADD CONSTRAINT `fk_gambar_barang_to_barang` FOREIGN KEY (`id_barang`) REFERENCES `barang`(`id_barang`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `diskusi` ADD CONSTRAINT `fk_diskusi_to_barang` FOREIGN KEY (`id_barang`) REFERENCES `barang`(`id_barang`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `diskusi` ADD CONSTRAINT `fk_diskusi_to_user` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaksi` ADD CONSTRAINT `fk_transaksi_to_pembeli` FOREIGN KEY (`id_pembeli`) REFERENCES `pembeli`(`id_pembeli`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaksi` ADD CONSTRAINT `fk_transaksi_to_alamat` FOREIGN KEY (`id_alamat`) REFERENCES `alamat`(`id_alamat`) ON DELETE SET NULL ON UPDATE CASCADE;

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
ALTER TABLE `pengiriman` ADD CONSTRAINT `fk_pengiriman_to_transaksi` FOREIGN KEY (`id_transaksi`) REFERENCES `transaksi`(`id_transaksi`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `session` ADD CONSTRAINT `fk_session_to_user` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rating` ADD CONSTRAINT `fk_rating_to_penitip` FOREIGN KEY (`id_penitip`) REFERENCES `penitip`(`id_penitip`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rating` ADD CONSTRAINT `fk_rating_to_dtl_transaksi` FOREIGN KEY (`id_dtl_transaksi`) REFERENCES `dtl_transaksi`(`id_dtl_transaksi`) ON DELETE CASCADE ON UPDATE CASCADE;
