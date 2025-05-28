-- AlterTable
ALTER TABLE `users` ADD COLUMN `fcm_token` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `notifikasi` (
    `id_notif` INTEGER NOT NULL AUTO_INCREMENT,
    `judul` VARCHAR(255) NOT NULL,
    `isi` TEXT NOT NULL,
    `id_user` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `fk_notifikasi_to_user`(`id_user`),
    PRIMARY KEY (`id_notif`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `notifikasi` ADD CONSTRAINT `fk_notifikasi_to_user` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
