/*
  Warnings:

  - You are about to drop the column `created_at` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_role_id_fkey`;

-- AlterTable
ALTER TABLE `Role` DROP COLUMN `created_at`,
    DROP COLUMN `name`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `roleName` ENUM('ADMIN', 'TEACHER', 'STUDENT') NOT NULL DEFAULT 'STUDENT',
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roleId` INTEGER NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PasswordResetTokens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `token` VARCHAR(255) NOT NULL,
    `expiresAt` DATETIME NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `PasswordResetTokens_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PasswordHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `passwordHash` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `idx_PasswordHistory_userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PersonalInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `identificationNumber` VARCHAR(255) NOT NULL,
    `birthdate` DATE NULL,
    `address` VARCHAR(255) NULL,
    `phoneNumber` VARCHAR(255) NULL,

    UNIQUE INDEX `PersonalInfo_userId_key`(`userId`),
    UNIQUE INDEX `PersonalInfo_identificationNumber_key`(`identificationNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Students` (
    `id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ParentsInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` INTEGER NULL,
    `relationship` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `phoneNumber` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContractTypes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `typeName` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    `allowsExtensionCourse` BOOLEAN NOT NULL DEFAULT true,
    `affectsSalary` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `ContractTypes_typeName_key`(`typeName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Teachers` (
    `id` INTEGER NOT NULL,
    `contractTypeId` INTEGER NULL,
    `specialty` VARCHAR(255) NULL,
    `experience` TEXT NULL,
    `baseSalary` DECIMAL(10, 2) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AcademicPrograms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `programName` VARCHAR(255) NOT NULL,
    `programCode` VARCHAR(50) NULL,
    `description` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `AcademicPrograms_programName_key`(`programName`),
    UNIQUE INDEX `AcademicPrograms_programCode_key`(`programCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Courses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `programId` INTEGER NOT NULL,
    `courseName` VARCHAR(255) NOT NULL,
    `courseCode` VARCHAR(50) NOT NULL,
    `description` TEXT NULL,
    `credits` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Courses_courseCode_key`(`courseCode`),
    UNIQUE INDEX `uq_course_program`(`programId`, `courseCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExtensionCourses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `programId` INTEGER NULL,
    `courseName` VARCHAR(255) NOT NULL,
    `courseCode` VARCHAR(50) NULL,
    `description` TEXT NULL,
    `durationHours` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `ExtensionCourses_courseCode_key`(`courseCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CourseInstances` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `courseId` INTEGER NOT NULL,
    `teacherId` INTEGER NULL,
    `semester` VARCHAR(20) NOT NULL,
    `groupCode` VARCHAR(20) NULL,
    `maxStudents` INTEGER NOT NULL,
    `status` ENUM('Planned', 'Active', 'Finished', 'Cancelled') NOT NULL DEFAULT 'Planned',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `uq_course_instance`(`courseId`, `semester`, `groupCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SchedulesCoursesInstances` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `courseInstanceId` INTEGER NOT NULL,
    `day` ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
    `startTime` TIME NOT NULL,
    `endTime` TIME NOT NULL,
    `classroom` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EnrollmentsPrograms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` INTEGER NOT NULL,
    `academicProgramId` INTEGER NOT NULL,
    `enrollmentDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` ENUM('Enrolled', 'Graduated', 'Withdrawn', 'Inactive') NOT NULL DEFAULT 'Enrolled',

    UNIQUE INDEX `uq_student_program`(`studentId`, `academicProgramId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EnrollmentsCourses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` INTEGER NOT NULL,
    `courseInstanceId` INTEGER NOT NULL,
    `enrollmentDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` ENUM('Enrolled', 'Dropped', 'Completed', 'Failed') NOT NULL DEFAULT 'Enrolled',

    UNIQUE INDEX `uq_student_course_instance`(`studentId`, `courseInstanceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Grades` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `enrollmentCourseId` INTEGER NOT NULL,
    `term1_grade` DECIMAL(5, 2) NULL,
    `term2_grade` DECIMAL(5, 2) NULL,
    `term3_grade` DECIMAL(5, 2) NULL,
    `lastUpdatedByTeacherId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Grades_enrollmentCourseId_key`(`enrollmentCourseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExtensionCourseInstances` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `extensionCourseId` INTEGER NOT NULL,
    `teacherId` INTEGER NULL,
    `startDate` DATE NOT NULL,
    `endDate` DATE NOT NULL,
    `location` VARCHAR(255) NULL,
    `maxStudents` INTEGER NULL,
    `publicationStatus` ENUM('Draft', 'Published', 'Cancelled', 'Completed') NOT NULL DEFAULT 'Draft',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SchedulesExtensionCourseInstances` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `extensionCourseInstanceId` INTEGER NOT NULL,
    `day` ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
    `startTime` TIME NOT NULL,
    `endTime` TIME NOT NULL,
    `classroom` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExtensionCourseEnrollments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` INTEGER NOT NULL,
    `extensionCourseInstanceId` INTEGER NOT NULL,
    `enrollmentDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` ENUM('Enrolled', 'Cancelled', 'Completed') NOT NULL DEFAULT 'Enrolled',

    UNIQUE INDEX `uq_student_ext_course_instance`(`studentId`, `extensionCourseInstanceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Faqs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question` TEXT NOT NULL,
    `answer` TEXT NOT NULL,
    `category` VARCHAR(100) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PasswordResetTokens` ADD CONSTRAINT `PasswordResetTokens_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PasswordHistory` ADD CONSTRAINT `PasswordHistory_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PersonalInfo` ADD CONSTRAINT `PersonalInfo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Students` ADD CONSTRAINT `Students_id_fkey` FOREIGN KEY (`id`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ParentsInfo` ADD CONSTRAINT `ParentsInfo_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Teachers` ADD CONSTRAINT `Teachers_id_fkey` FOREIGN KEY (`id`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Teachers` ADD CONSTRAINT `Teachers_contractTypeId_fkey` FOREIGN KEY (`contractTypeId`) REFERENCES `ContractTypes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Courses` ADD CONSTRAINT `Courses_programId_fkey` FOREIGN KEY (`programId`) REFERENCES `AcademicPrograms`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExtensionCourses` ADD CONSTRAINT `ExtensionCourses_programId_fkey` FOREIGN KEY (`programId`) REFERENCES `AcademicPrograms`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseInstances` ADD CONSTRAINT `CourseInstances_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseInstances` ADD CONSTRAINT `CourseInstances_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `Teachers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SchedulesCoursesInstances` ADD CONSTRAINT `SchedulesCoursesInstances_courseInstanceId_fkey` FOREIGN KEY (`courseInstanceId`) REFERENCES `CourseInstances`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnrollmentsPrograms` ADD CONSTRAINT `EnrollmentsPrograms_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnrollmentsPrograms` ADD CONSTRAINT `EnrollmentsPrograms_academicProgramId_fkey` FOREIGN KEY (`academicProgramId`) REFERENCES `AcademicPrograms`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnrollmentsCourses` ADD CONSTRAINT `EnrollmentsCourses_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnrollmentsCourses` ADD CONSTRAINT `EnrollmentsCourses_courseInstanceId_fkey` FOREIGN KEY (`courseInstanceId`) REFERENCES `CourseInstances`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Grades` ADD CONSTRAINT `Grades_enrollmentCourseId_fkey` FOREIGN KEY (`enrollmentCourseId`) REFERENCES `EnrollmentsCourses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Grades` ADD CONSTRAINT `Grades_lastUpdatedByTeacherId_fkey` FOREIGN KEY (`lastUpdatedByTeacherId`) REFERENCES `Teachers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExtensionCourseInstances` ADD CONSTRAINT `ExtensionCourseInstances_extensionCourseId_fkey` FOREIGN KEY (`extensionCourseId`) REFERENCES `ExtensionCourses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExtensionCourseInstances` ADD CONSTRAINT `ExtensionCourseInstances_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `Teachers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SchedulesExtensionCourseInstances` ADD CONSTRAINT `SchedulesExtensionCourseInstances_extensionCourseInstanceId_fkey` FOREIGN KEY (`extensionCourseInstanceId`) REFERENCES `ExtensionCourseInstances`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExtensionCourseEnrollments` ADD CONSTRAINT `ExtensionCourseEnrollments_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExtensionCourseEnrollments` ADD CONSTRAINT `ExtensionCourseEnrollments_extensionCourseInstanceId_fkey` FOREIGN KEY (`extensionCourseInstanceId`) REFERENCES `ExtensionCourseInstances`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
