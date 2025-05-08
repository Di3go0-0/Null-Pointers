/*
  Warnings:

  - You are about to alter the column `expiresAt` on the `PasswordResetTokens` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Made the column `description` on table `Courses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `credits` on table `Courses` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Courses` MODIFY `description` TEXT NOT NULL,
    MODIFY `credits` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `PasswordResetTokens` MODIFY `expiresAt` DATETIME NOT NULL;
