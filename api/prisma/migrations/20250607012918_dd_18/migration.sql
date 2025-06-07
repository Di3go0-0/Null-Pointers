/*
  Warnings:

  - You are about to drop the column `lastUpdatedByTeacherId` on the `Grades` table. All the data in the column will be lost.
  - You are about to alter the column `expiresAt` on the `PasswordResetTokens` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `Grades` DROP FOREIGN KEY `Grades_lastUpdatedByTeacherId_fkey`;

-- DropIndex
DROP INDEX `Grades_lastUpdatedByTeacherId_fkey` ON `Grades`;

-- AlterTable
ALTER TABLE `Grades` DROP COLUMN `lastUpdatedByTeacherId`,
    ADD COLUMN `final` DECIMAL(5, 2) NULL;

-- AlterTable
ALTER TABLE `PasswordResetTokens` MODIFY `expiresAt` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `ExtensionCourseGrades` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `extensionCourseEnrollmentId` INTEGER NOT NULL,
    `term1_grade` DECIMAL(5, 2) NULL,
    `term2_grade` DECIMAL(5, 2) NULL,
    `term3_grade` DECIMAL(5, 2) NULL,
    `final` DECIMAL(5, 2) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ExtensionCourseGrades_extensionCourseEnrollmentId_key`(`extensionCourseEnrollmentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ExtensionCourseGrades` ADD CONSTRAINT `ExtensionCourseGrades_extensionCourseEnrollmentId_fkey` FOREIGN KEY (`extensionCourseEnrollmentId`) REFERENCES `ExtensionCourseEnrollments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
