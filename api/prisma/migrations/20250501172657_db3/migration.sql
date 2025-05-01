/*
  Warnings:

  - You are about to alter the column `expiresAt` on the `PasswordResetTokens` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `documentNumber` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `PasswordResetTokens` MODIFY `expiresAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Users` DROP COLUMN `documentNumber`;
