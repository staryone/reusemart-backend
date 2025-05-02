/*
  Warnings:

  - The primary key for the `sessions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `sessions` table. All the data in the column will be lost.
  - Added the required column `id_session` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `sessions` DROP FOREIGN KEY `fk_sessions_to_users`;

-- AlterTable
ALTER TABLE `sessions` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `id_session` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id_session`);

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `fk_session_to_user` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
