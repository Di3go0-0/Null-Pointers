# School Management API

A comprehensive RESTful API built with NestJS for managing educational institutions, including students, teachers, courses, schedules, and academic records.

## 🚀 Features

### Core Functionality
- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: Multi-role system (Admin, Teacher, Student)
- **Academic Management**: Courses, subjects, programs, and enrollments
- **Scheduling**: Class schedules and timetables
- **Grading**: Grade management and academic records
- **Reporting**: Comprehensive reports for students and courses
- **Email Notifications**: Automated email communication

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **Database**: MySQL with Prisma ORM
- **Validation**: Comprehensive input validation with class-validator
- **Documentation**: Swagger API documentation
- **Testing**: Unit and e2e testing with Jest
- **Security**: Password hashing, JWT tokens, and security best practices

## 🛠️ Technology Stack

- **Framework**: NestJS 11.x
- **Language**: TypeScript 5.x
- **Database**: MySQL
- **ORM**: Prisma 6.x
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: class-validator & class-transformer
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest & Supertest
- **Email**: Resend
- **Security**: bcrypt for password hashing

## 📋 Prerequisites

- Node.js 18.x or higher
- MySQL 8.0 or higher
- npm or yarn package manager
- Prisma CLI

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/school_db"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="24h"

# Email Service (Resend)
RESEND_API_KEY="your-resend-api-key"
FROM_EMAIL="noreply@yourschool.com"

# Application
PORT=3000
NODE_ENV=development
```

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database (optional)
npm run prisma:seed
```

### 5. Start the Application

```bash
# Development mode with hot reload
npm run start:dev

# Production mode
npm run build
npm run start:prod

# Debug mode
npm run start:debug
```

The API will be available at `http://localhost:3000`

## 📚 API Documentation

Once the server is running, visit `http://localhost:3000/api` to access the interactive Swagger documentation.

### Authentication Endpoints

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "STUDENT"
}
```

### Protected Routes

All protected endpoints require a JWT token in the Authorization header:

```http
Authorization: Bearer <your-jwt-token>
```

## 🗄️ Database Schema

The application manages the following main entities:

### Core Entities
- **Users**: Authentication and profile information
- **Students**: Student-specific data and enrollment records
- **Teachers**: Teacher information and contract details
- **Programs**: Academic programs and curricula
- **Courses**: Individual courses within programs
- **Subjects**: Subject matter and course content
- **Enrollments**: Student enrollment tracking
- **Schedules**: Class timetables and schedules
- **Grades**: Academic performance tracking

### Relationships
- Users can be Students or Teachers
- Students can enroll in multiple Programs and Courses
- Teachers can teach multiple Courses
- Programs contain multiple Courses
- Courses have specific Schedules and Grades

## 🔧 Development

### Available Scripts

```bash
# Development
npm run start:dev          # Start in development mode
npm run start:debug        # Start in debug mode

# Building
npm run build              # Build the application
npm run start:prod         # Start production build

# Testing
npm run test               # Run unit tests
npm run test:e2e           # Run end-to-end tests
npm run test:cov           # Run tests with coverage

# Code Quality
npm run lint               # Run ESLint
npm run format             # Format code with Prettier

# Database
npm run prisma:seed        # Seed database with initial data
npx prisma studio          # Open Prisma Studio
npx prisma migrate dev     # Create and apply migrations
```

### Database Migrations

```bash
# Create a new migration
npx prisma migrate dev --name migration-name

# Reset database
npx prisma migrate reset

# Deploy migrations to production
npx prisma migrate deploy
```

### Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e
```

## 🔒 Security Features

- **Password Hashing**: Using bcrypt for secure password storage
- **JWT Authentication**: Stateless authentication with configurable expiration
- **Role-Based Access Control**: Different permissions for Admin, Teacher, and Student roles
- **Input Validation**: Comprehensive validation using class-validator
- **Rate Limiting**: Built-in rate limiting for API endpoints
- **CORS**: Configurable CORS policies
- **Security Headers**: Security best practices implementation

## 📧 Email Integration

The API integrates with Resend for email notifications:

- **Password Reset**: Automated password reset emails
- **Account Notifications**: Important account updates
- **Academic Notifications**: Grade and enrollment notifications

## 🌍 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | MySQL database connection string | ✅ |
| `JWT_SECRET` | Secret key for JWT signing | ✅ |
| `JWT_EXPIRES_IN` | JWT token expiration time | ✅ |
| `RESEND_API_KEY` | Resend API key for email service | ✅ |
| `FROM_EMAIL` | Default sender email address | ✅ |
| `PORT` | Application port (default: 3000) | ❌ |
| `NODE_ENV` | Environment (development/production) | ❌ |

## 🐳 Docker Support

You can run the API using Docker:

```bash
# Build the image
docker build -t school-api .

# Run the container
docker run -p 3000:3000 --env-file .env school-api
```

## 📊 Monitoring & Logging

- **Structured Logging**: Consistent log format across the application
- **Error Handling**: Centralized error handling and logging
- **Health Checks**: Built-in health check endpoints
- **Performance Monitoring**: Request timing and performance metrics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/refresh` - Refresh JWT token
- `POST /auth/forgot-password` - Password reset request

### Users
- `GET /users` - Get all users (Admin only)
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user information
- `DELETE /users/:id` - Delete user (Admin only)

### Students
- `GET /students` - Get all students
- `GET /students/:id` - Get student by ID
- `POST /students` - Create new student
- `PUT /students/:id` - Update student information
- `GET /students/:id/grades` - Get student grades
- `GET /students/:id/schedule` - Get student schedule

### Teachers
- `GET /teachers` - Get all teachers
- `GET /teachers/:id` - Get teacher by ID
- `POST /teachers` - Create new teacher
- `PUT /teachers/:id` - Update teacher information
- `GET /teachers/:id/courses` - Get teacher courses
- `GET /teachers/:id/schedule` - Get teacher schedule

### Courses
- `GET /courses` - Get all courses
- `GET /courses/:id` - Get course by ID
- `POST /courses` - Create new course
- `PUT /courses/:id` - Update course information
- `DELETE /courses/:id` - Delete course
- `GET /courses/:id/students` - Get enrolled students
- `POST /courses/:id/enroll` - Enroll student in course

### Reports
- `GET /reports/students` - Student enrollment report
- `GET /reports/courses` - Course statistics report
- `GET /reports/grades/:studentId` - Student grade report

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the [API Documentation](http://localhost:3000/api)
- Review the [NestJS Documentation](https://docs.nestjs.com)

## 🔮 Future Enhancements

- Real-time notifications with WebSockets
- File upload for assignments and documents
- Advanced reporting and analytics
- Mobile API optimization
- Multi-language support
- Advanced permission system
- Audit logging
- Integration with third-party educational platforms