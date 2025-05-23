-- CreateIndex
CREATE INDEX `barang_status_idx` ON `barang`(`status`);

-- CreateIndex
CREATE INDEX `transaksi_status_Pembayaran_idx` ON `transaksi`(`status_Pembayaran`);

-- CreateIndex
CREATE INDEX `transaksi_tanggal_pembayaran_idx` ON `transaksi`(`tanggal_pembayaran`);
