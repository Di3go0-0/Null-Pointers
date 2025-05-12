/*
  Warnings:

  - You are about to alter the column `expiresAt` on the `PasswordResetTokens` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `endDate` to the `CourseInstances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `CourseInstances` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CourseInstances` ADD COLUMN `endDate` DATE NOT NULL,
    ADD COLUMN `minStudents` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `startDate` DATE NOT NULL;

-- AlterTable
ALTER TABLE `PasswordResetTokens` MODIFY `expiresAt` DATETIME NOT NULL;
