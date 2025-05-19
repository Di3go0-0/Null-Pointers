export const EXTENSION = {
  ALERT: {
    NOT_FOUND: 'Resource not found',
    COURSE_CODE: 'Group code already exists ',
    TEACHER_NOT_FOUND: 'Teacher not found or inactive',
    COURSE_NOT_FOUND: 'Course extension instance not found or inactive',
    DUPLICATE_INSTANCE: 'A course instance with this combination of course, teacher and group code already exists'
  },
  ERROR: {
    GET_COURSES: 'Failed to retrieve course instances',
    UPDATED_COURSES: 'Failed to update course instance',
    CREATE_COURSES: 'Failed to create course instance. Please verify that the combination of course, teacher, semester and group code is unique',
    DELETE_COURSES: 'Failed to delete course instance',
    TEACHER: 'Failed Search teacher',
    VALIDATE_COURSES: 'Failed to validate course or teacher existence',
    VERIFY_COURSE_CODE: 'Failed to verify group code uniqueness',
    VERIFY_COURSE_CODE_OWNER: 'Failed to verify group code Owner',
    VERIFY_COURSE: 'Failed to verify course',
    UNIQUE_CONSTRAINT: 'Cannot create duplicate course instance. Each combination of course, teacher, semester and group code must be unique'
  },
};

