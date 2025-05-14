/*
  Warnings:

  - You are about to alter the column `expiresAt` on the `PasswordResetTokens` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `PasswordResetTokens` MODIFY `expiresAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `SchedulesCoursesInstances` MODIFY `startTime` INTEGER NOT NULL,
    MODIFY `endTime` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `SchedulesExtensionCourseInstances` MODIFY `startTime` INTEGER NOT NULL,
    MODIFY `endTime` INTEGER NOT NULL;
