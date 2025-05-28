
export const COURSES = {
  ALERT: {
    NOT_FOUND: 'Resource not found',
    COURSE_CODE: 'Group code already exists for the semester',
    TEACHER_NOT_FOUND: 'Teacher not found or inactive',
    COURSE_NOT_FOUND: 'Course instance not found or inactive',
    DUPLICATE_INSTANCE: 'A course instance with this combination of course, teacher, semester and group code already exists'
  },
  ERROR: {
    GET_COURSES: 'Failed to retrieve course instances',
    UPDATED_COURSES: 'Failed to update course instance',
    CREATE_COURSES: 'Failed to create course instance. Please verify that the combination of course, teacher, semester and group code is unique',
    DELETE_COURSES: 'Failed to delete course instance',
    VALIDATE_COURSES: 'Failed to validate course or teacher existence',
    VERIFY_COURSE_CODE: 'Failed to verify group code uniqueness',
    UNIQUE_CONSTRAINT: 'Cannot create duplicate course instance. Each combination of course, teacher, semester and group code must be unique',
    TEACHER_NOT_FOUND: 'Teacher not found or inactive',
    COURSE_NOT_FOUND: 'Course instance not found or inactive',
  },
};

