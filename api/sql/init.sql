-- docker exec -i mysql_container mysql -uroot -proot academy < script.sql

USE academy;

-- Tablas existentes (sin cambios estructurales mayores, solo asegurar campos)
CREATE TABLE IF NOT EXISTS `Role` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `roleName` VARCHAR(50) UNIQUE NOT NULL, -- Ajustado tamaño y nombre consistente
    `description` TEXT,
    `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `active` TINYINT(1) DEFAULT 1,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `Users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `roleId` INT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) UNIQUE NOT NULL,
    `password` VARCHAR(255) NOT NULL, -- Almacenar HASH, no texto plano
    `identificationNumber` VARCHAR(50) UNIQUE, -- Ajustado tamaño
    `birthdate` DATE,
    `personalInfo` TEXT, -- Campo genérico para info extra (dirección, teléfono, etc.)
    `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `active` TINYINT(1) DEFAULT 1,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `Students` (
    `id` INT NOT NULL, -- Debe ser FK a Users.id
    `parentInfo` JSON, -- Info de padres/acudientes
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `ContractTypes` (
    `id` INT NOT NULL AUTO_INCREMENT, -- Usar INT si no esperas miles de millones
    `typeName` VARCHAR(100) UNIQUE NOT NULL, -- Ajustado tamaño
    `description` TEXT,
    `allowsExtensionCourse` TINYINT(1) DEFAULT 1, -- Permitir por defecto?
    `affectsSalary` TINYINT(1) DEFAULT 0, -- Campo del diseño anterior
    `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `active` TINYINT(1) DEFAULT 1,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `Teachers` (
    `id` INT NOT NULL, -- Debe ser FK a Users.id
    `contractTypeId` INT, -- Coincidir tipo con PK de ContractTypes
    `specialty` VARCHAR(255), -- Cambiado 'speciality' a 'specialty' (inglés)
    `experience` TEXT,
    `baseSalary` DECIMAL(10, 2), -- Campo del diseño anterior
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `AcademicPrograms` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `programName` VARCHAR(255) UNIQUE NOT NULL,
    `programCode` VARCHAR(50) UNIQUE, -- Ajustado tamaño
    `description` TEXT,
    -- `calendarInfo` TEXT, -- Campo del diseño anterior
    `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `active` TINYINT(1) DEFAULT 1,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- Tabla de Definición de Cursos (Solo definición)
CREATE TABLE IF NOT EXISTS `Courses` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `programId` INT NOT NULL, -- Un curso pertenece a UN programa
    `courseName` VARCHAR(255) NOT NULL,
    `courseCode` VARCHAR(50) UNIQUE NOT NULL, -- Código de la materia general
    `description` TEXT,
    `credits` INT, -- Opcional: créditos del curso
    `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `active` TINYINT(1) DEFAULT 1,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uq_course_program` (`programId`, `courseCode`) -- Código único dentro del programa
) ENGINE=InnoDB;

-- Tabla de Definición de Cursos de Extensión (Solo definición)
CREATE TABLE IF NOT EXISTS `ExtensionCourses` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `programId` INT, -- Puede o no pertenecer a un programa específico
    `courseName` VARCHAR(255) NOT NULL,
    `courseCode` VARCHAR(50) UNIQUE, -- Código opcional
    `description` TEXT,
    `durationHours` INT, -- Campo del diseño anterior
    `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `active` TINYINT(1) DEFAULT 1,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- ===============================
-- 2. Creación de Tablas de Instancias y Relaciones
-- ===============================

-- Tabla de Instancias de Cursos (Ofertas específicas)
CREATE TABLE IF NOT EXISTS `CourseInstances` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `courseId` INT NOT NULL, -- FK a Courses (la definición)
    `teacherId` INT, -- FK a Teachers (quién lo dicta ESTA vez)
    `semester` VARCHAR(20) NOT NULL, -- Ej: '2025-1', '2025-Summer'
    `groupCode` VARCHAR(20), -- Ej: 'G1', 'A' (si hay varios grupos)
    `maxStudents` INT NOT NULL,
    `scheduleInfo` JSON, -- [{ "day": "monday", "startTime": 800, "endTime": 1200, "classroom": "13A-2G4" }]
    `status` ENUM('Planned', 'Active', 'Finished', 'Cancelled') DEFAULT 'Planned',
    `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `active` TINYINT(1) DEFAULT 1,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uq_course_instance` (`courseId`, `semester`, `groupCode`) -- Clave única para una oferta
) ENGINE=InnoDB;

-- Tabla de Horarios para las Instancias de Cursos
-- CREATE TABLE IF NOT EXISTS `SchedulesCourses` (
--     `id` INT NOT NULL AUTO_INCREMENT,
--     `courseInstanceId` INT NOT NULL, -- A qué oferta de curso pertenece este horario
--     `scheduleInfo` JSON,
--     -- `dayOfWeek` ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
--     -- `startTime` TIME NOT NULL,
--     -- `endTime` TIME NOT NULL,
--     -- `classroom` VARCHAR(50), -- Salón específico para este bloque (puede diferir del principal)
--     `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
--     `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     `active` TINYINT(1) DEFAULT 1,
--     PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB;

-- Tabla de Matrículas en Programas Académicos (Sin cambios)
CREATE TABLE IF NOT EXISTS `EnrollmentsPrograms` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `studentId` INT NOT NULL, -- FK a Students
    `academicProgramId` INT NOT NULL, -- FK a AcademicPrograms
    `enrollmentDate` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `status` ENUM('Enrolled', 'Graduated', 'Withdrawn', 'Inactive') DEFAULT 'Enrolled',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uq_student_program` (`studentId`, `academicProgramId`)
) ENGINE=InnoDB;

-- Tabla de Matrículas en Instancias de Cursos (CORREGIDA)
CREATE TABLE IF NOT EXISTS `EnrollmentsCourses` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `studentId` INT NOT NULL, -- FK a Students
    `courseInstanceId` INT NOT NULL, -- FK a CourseInstances (la oferta específica)
    `enrollmentDate` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `status` ENUM('Enrolled', 'Dropped', 'Completed', 'Failed') DEFAULT 'Enrolled', -- Estados más específicos
    PRIMARY KEY (`id`),
    UNIQUE KEY `uq_student_course_instance` (`studentId`, `courseInstanceId`) -- Clave única
) ENGINE=InnoDB;

-- Tabla de Calificaciones
CREATE TABLE IF NOT EXISTS `Grades` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `enrollmentCourseId` INT NOT NULL, -- A qué matrícula de curso pertenece la nota
    `teacherId` INT, -- Quién registró la nota (opcional, pero útil)
    `gradeValue` DECIMAL(5, 2), -- Valor numérico (ej: 4.50) o NULL si es conceptual
    `gradeConcept` VARCHAR(50), -- Valor conceptual (ej: 'Aprobado', 'Reprobado')
    `gradeType` VARCHAR(100), -- Ej: 'Parcial 1', 'Quiz 2', 'Nota Final'
    `gradeDate` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `comments` TEXT, -- Comentarios adicionales del profesor
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- Tabla de Instancias de Cursos de Extensión
CREATE TABLE IF NOT EXISTS `ExtensionCourseInstances` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `extensionCourseId` INT NOT NULL, -- FK a ExtensionCourses (la definición)
    `teacherId` INT, -- FK a Teachers (quién lo dicta ESTA vez)
    `startDate` DATE NOT NULL,
    `endDate` DATE NOT NULL,
    `scheduleInfo` JSON, -- [{ "day": "monday", "startTime": 800, "endTime": 1200, "classroom": "13A-2G4" },]
    `location` VARCHAR(255), -- Lugar donde se imparte
    `maxStudents` INT,
    `publicationStatus` ENUM('Draft', 'Published', 'Cancelled', 'Completed') DEFAULT 'Draft',
    `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `active` TINYINT(1) DEFAULT 1,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- Tabla de Matrículas en Cursos de Extensión
CREATE TABLE IF NOT EXISTS `ExtensionCourseEnrollments` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `studentId` INT NOT NULL, -- FK a Students
    `extensionCourseInstanceId` INT NOT NULL, -- FK a ExtensionCourseInstances
    `enrollmentDate` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `status` ENUM('Enrolled', 'Cancelled', 'Completed') DEFAULT 'Enrolled',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uq_student_ext_course_instance` (`studentId`, `extensionCourseInstanceId`)
) ENGINE=InnoDB;

-- Tabla FAQs para el Chatbot (Del diseño anterior)
CREATE TABLE IF NOT EXISTS `Faqs` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `question` TEXT NOT NULL,
    `answer` TEXT NOT NULL,
    `category` VARCHAR(100),
    `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `active` TINYINT(1) DEFAULT 1,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;


-- ===============================
-- 3. Relaciones (FOREIGN KEYS - Revisado y Añadido)
-- ===============================

-- Users -> Role
ALTER TABLE `Users`
ADD CONSTRAINT `fk_Users_roleId_Role_id` -- Nombre consistente: fk_TablaOrigen_ColumnaFK_TablaDestino_ColumnaPK
FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`)
ON UPDATE CASCADE ON DELETE RESTRICT; -- RESTRICT es más seguro que SET NULL para roles

-- Students -> Users
ALTER TABLE `Students`
ADD CONSTRAINT `fk_Students_id_Users_id`
FOREIGN KEY (`id`) REFERENCES `Users`(`id`)
ON UPDATE CASCADE ON DELETE CASCADE; -- Si se borra el usuario, se borra el perfil de estudiante

-- Teachers -> Users
ALTER TABLE `Teachers`
ADD CONSTRAINT `fk_Teachers_id_Users_id`
FOREIGN KEY (`id`) REFERENCES `Users`(`id`)
ON UPDATE CASCADE ON DELETE CASCADE; -- Si se borra el usuario, se borra el perfil de profesor

-- Teachers -> ContractTypes
ALTER TABLE `Teachers`
ADD CONSTRAINT `fk_Teachers_contractTypeId_ContractTypes_id`
FOREIGN KEY (`contractTypeId`) REFERENCES `ContractTypes`(`id`)
ON UPDATE CASCADE ON DELETE RESTRICT; -- No borrar un tipo de contrato si un profe lo tiene

-- Courses -> AcademicPrograms
ALTER TABLE `Courses`
ADD CONSTRAINT `fk_Courses_programId_AcademicPrograms_id`
FOREIGN KEY (`programId`) REFERENCES `AcademicPrograms`(`id`)
ON UPDATE CASCADE ON DELETE CASCADE; -- Si se borra el programa, se borran sus cursos (discutible, RESTRICT podría ser mejor)

-- ExtensionCourses -> AcademicPrograms (Opcional)
ALTER TABLE `ExtensionCourses`
ADD CONSTRAINT `fk_ExtensionCourses_programId_AcademicPrograms_id`
FOREIGN KEY (`programId`) REFERENCES `AcademicPrograms`(`id`)
ON UPDATE CASCADE ON DELETE SET NULL; -- Si se borra el programa, el curso de ext. queda sin programa asociado

-- CourseInstances -> Courses (Definición)
ALTER TABLE `CourseInstances`
ADD CONSTRAINT `fk_CourseInstances_courseId_Courses_id`
FOREIGN KEY (`courseId`) REFERENCES `Courses`(`id`)
ON UPDATE CASCADE ON DELETE RESTRICT; -- No borrar definición si hay instancias

-- CourseInstances -> Teachers
ALTER TABLE `CourseInstances`
ADD CONSTRAINT `fk_CourseInstances_teacherId_Teachers_id`
FOREIGN KEY (`teacherId`) REFERENCES `Teachers`(`id`)
ON UPDATE CASCADE ON DELETE SET NULL; -- Si se borra el profe, la instancia queda sin profe asignado

-- SchedulesCourses -> CourseInstances
-- ALTER TABLE `SchedulesCourses`
-- ADD CONSTRAINT `fk_Schedules_courseInstanceId_CourseInstances_id`
-- FOREIGN KEY (`courseInstanceId`) REFERENCES `CourseInstances`(`id`)
-- ON UPDATE CASCADE ON DELETE CASCADE; -- Si se borra la instancia, se borran sus horarios

-- EnrollmentsPrograms -> Students
ALTER TABLE `EnrollmentsPrograms`
ADD CONSTRAINT `fk_EnrollmentsPrograms_studentId_Students_id` -- Nombre de tabla corregido
FOREIGN KEY (`studentId`) REFERENCES `Students`(`id`)
ON UPDATE CASCADE ON DELETE CASCADE; -- Si se borra el estudiante, se borran sus matrículas de programa

-- EnrollmentsPrograms -> AcademicPrograms
ALTER TABLE `EnrollmentsPrograms`
ADD CONSTRAINT `fk_EnrollmentsPrograms_academicProgramId_AP_id` -- Nombre de tabla corregido
FOREIGN KEY (`academicProgramId`) REFERENCES `AcademicPrograms`(`id`)
ON UPDATE CASCADE ON DELETE CASCADE; -- Si se borra el programa, se borran las matrículas (discutible)

-- EnrollmentsCourses -> Students (CORREGIDO)
ALTER TABLE `EnrollmentsCourses`
ADD CONSTRAINT `fk_EnrollmentsCourses_studentId_Students_id`
FOREIGN KEY (`studentId`) REFERENCES `Students`(`id`)
ON UPDATE CASCADE ON DELETE CASCADE; -- Si se borra el estudiante, se borran sus matrículas de curso

-- EnrollmentsCourses -> CourseInstances (CORREGIDO)
ALTER TABLE `EnrollmentsCourses`
ADD CONSTRAINT `fk_EnrollmentsCourses_courseInstanceId_CI_id`
FOREIGN KEY (`courseInstanceId`) REFERENCES `CourseInstances`(`id`)
ON UPDATE CASCADE ON DELETE CASCADE; -- Si se borra la instancia del curso, se borran las matrículas (importante!)

-- Grades -> EnrollmentsCourses
ALTER TABLE `Grades`
ADD CONSTRAINT `fk_Grades_enrollmentCourseId_EC_id`
FOREIGN KEY (`enrollmentCourseId`) REFERENCES `EnrollmentsCourses`(`id`)
ON UPDATE CASCADE ON DELETE CASCADE; -- Si se borra la matrícula, se borran las notas

-- Grades -> Teachers (Opcional)
ALTER TABLE `Grades`
ADD CONSTRAINT `fk_Grades_teacherId_Teachers_id`
FOREIGN KEY (`teacherId`) REFERENCES `Teachers`(`id`)
ON UPDATE CASCADE ON DELETE SET NULL; -- Si se borra el profe, la nota queda sin registrador asociado

-- ExtensionCourseInstances -> ExtensionCourses (Definición)
ALTER TABLE `ExtensionCourseInstances`
ADD CONSTRAINT `fk_ExtCourseInst_extCourseId_ExtCourses_id`
FOREIGN KEY (`extensionCourseId`) REFERENCES `ExtensionCourses`(`id`)
ON UPDATE CASCADE ON DELETE RESTRICT; -- No borrar definición si hay instancias

-- ExtensionCourseInstances -> Teachers
ALTER TABLE `ExtensionCourseInstances`
ADD CONSTRAINT `fk_ExtCourseInst_teacherId_Teachers_id`
FOREIGN KEY (`teacherId`) REFERENCES `Teachers`(`id`)
ON UPDATE CASCADE ON DELETE SET NULL; -- Si se borra el profe, la instancia ext. queda sin profe

-- ExtensionCourseEnrollments -> Students
ALTER TABLE `ExtensionCourseEnrollments`
ADD CONSTRAINT `fk_ExtCourseEnroll_studentId_Students_id`
FOREIGN KEY (`studentId`) REFERENCES `Students`(`id`)
ON UPDATE CASCADE ON DELETE CASCADE;

-- ExtensionCourseEnrollments -> ExtensionCourseInstances
ALTER TABLE `ExtensionCourseEnrollments`
ADD CONSTRAINT `fk_ExtCourseEnroll_extCourseInstId_ECI_id`
FOREIGN KEY (`extensionCourseInstanceId`) REFERENCES `ExtensionCourseInstances`(`id`)
ON UPDATE CASCADE ON DELETE CASCADE; -- Si se cancela/borra la instancia, se borran las matrículas
