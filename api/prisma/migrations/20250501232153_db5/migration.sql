/*
  Warnings:

  - You are about to alter the column `expiresAt` on the `PasswordResetTokens` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `userId` on the `PersonalInfo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `PersonalInfo` DROP FOREIGN KEY `PersonalInfo_userId_fkey`;

-- DropIndex
DROP INDEX `PersonalInfo_userId_key` ON `PersonalInfo`;

-- AlterTable
ALTER TABLE `PasswordResetTokens` MODIFY `expiresAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `PersonalInfo` DROP COLUMN `userId`,
    MODIFY `id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `PersonalInfo` ADD CONSTRAINT `PersonalInfo_id_fkey` FOREIGN KEY (`id`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
