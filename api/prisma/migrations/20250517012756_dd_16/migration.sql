/*
  Warnings:

  - You are about to alter the column `expiresAt` on the `PasswordResetTokens` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Made the column `specialty` on table `Teachers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `experience` on table `Teachers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `baseSalary` on table `Teachers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `PasswordResetTokens` MODIFY `expiresAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Teachers` MODIFY `specialty` VARCHAR(255) NOT NULL,
    MODIFY `experience` TEXT NOT NULL,
    MODIFY `baseSalary` DECIMAL(10, 2) NOT NULL;
