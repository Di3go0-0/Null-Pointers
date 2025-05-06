/*
  Warnings:

  - You are about to alter the column `expiresAt` on the `PasswordResetTokens` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Made the column `programCode` on table `AcademicPrograms` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `AcademicPrograms` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `AcademicPrograms` MODIFY `programCode` VARCHAR(50) NOT NULL,
    MODIFY `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `PasswordResetTokens` MODIFY `expiresAt` DATETIME NOT NULL;
