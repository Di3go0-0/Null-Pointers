/*
  Warnings:

  - You are about to alter the column `expiresAt` on the `PasswordResetTokens` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `PasswordResetTokens` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true,
    MODIFY `expiresAt` DATETIME NOT NULL;
