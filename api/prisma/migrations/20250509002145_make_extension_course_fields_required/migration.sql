/*
  Warnings:

  - You are about to alter the column `expiresAt` on the `PasswordResetTokens` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Made the column `programId` on table `ExtensionCourses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `courseCode` on table `ExtensionCourses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `ExtensionCourses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `durationHours` on table `ExtensionCourses` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `ExtensionCourses` DROP FOREIGN KEY `ExtensionCourses_programId_fkey`;

-- DropIndex
DROP INDEX `ExtensionCourses_programId_fkey` ON `ExtensionCourses`;

-- AlterTable
ALTER TABLE `ExtensionCourses` MODIFY `programId` INTEGER NOT NULL,
    MODIFY `courseCode` VARCHAR(50) NOT NULL,
    MODIFY `description` TEXT NOT NULL,
    MODIFY `durationHours` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `PasswordResetTokens` MODIFY `expiresAt` DATETIME NOT NULL;

-- AddForeignKey
ALTER TABLE `ExtensionCourses` ADD CONSTRAINT `ExtensionCourses_programId_fkey` FOREIGN KEY (`programId`) REFERENCES `AcademicPrograms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
