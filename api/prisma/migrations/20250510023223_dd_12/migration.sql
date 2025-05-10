/*
  Warnings:

  - You are about to alter the column `expiresAt` on the `PasswordResetTokens` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Made the column `teacherId` on table `CourseInstances` required. This step will fail if there are existing NULL values in that column.
  - Made the column `groupCode` on table `CourseInstances` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `groupCode` to the `ExtensionCourseInstances` table without a default value. This is not possible if the table is not empty.
  - Made the column `teacherId` on table `ExtensionCourseInstances` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `CourseInstances` DROP FOREIGN KEY `CourseInstances_teacherId_fkey`;

-- DropForeignKey
ALTER TABLE `ExtensionCourseInstances` DROP FOREIGN KEY `ExtensionCourseInstances_teacherId_fkey`;

-- DropIndex
DROP INDEX `CourseInstances_teacherId_fkey` ON `CourseInstances`;

-- DropIndex
DROP INDEX `ExtensionCourseInstances_teacherId_fkey` ON `ExtensionCourseInstances`;

-- AlterTable
ALTER TABLE `CourseInstances` MODIFY `teacherId` INTEGER NOT NULL,
    MODIFY `groupCode` VARCHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE `ExtensionCourseInstances` ADD COLUMN `groupCode` VARCHAR(20) NOT NULL,
    MODIFY `teacherId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `PasswordResetTokens` MODIFY `expiresAt` DATETIME NOT NULL;

-- AddForeignKey
ALTER TABLE `CourseInstances` ADD CONSTRAINT `CourseInstances_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `Teachers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExtensionCourseInstances` ADD CONSTRAINT `ExtensionCourseInstances_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `Teachers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
