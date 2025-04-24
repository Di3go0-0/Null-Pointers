/*
  Warnings:

  - You are about to alter the column `expiresAt` on the `PasswordResetTokens` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[roleName]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - Made the column `roleId` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Users` DROP FOREIGN KEY `Users_roleId_fkey`;

-- DropIndex
DROP INDEX `Users_roleId_fkey` ON `Users`;

-- AlterTable
ALTER TABLE `PasswordResetTokens` MODIFY `expiresAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Role` ALTER COLUMN `roleName` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Users` MODIFY `roleId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Role_roleName_key` ON `Role`(`roleName`);

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
