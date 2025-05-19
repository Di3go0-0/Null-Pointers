/*
  Warnings:

  - You are about to drop the column `location` on the `ExtensionCourseInstances` table. All the data in the column will be lost.
  - You are about to alter the column `expiresAt` on the `PasswordResetTokens` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `ExtensionCourseInstances` DROP COLUMN `location`;

-- AlterTable
ALTER TABLE `PasswordResetTokens` MODIFY `expiresAt` DATETIME NOT NULL;
