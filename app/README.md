# School Management Frontend

A modern, responsive web application built with Angular 19 for managing educational institutions. This frontend provides an intuitive interface for students, teachers, and administrators to interact with the school management system.

## 🚀 Features

### Student Portal
- **Dashboard**: Personalized student dashboard with quick access to courses, grades, and schedules
- **Course Management**: View enrolled courses, browse available courses, and manage enrollments
- **Grade Tracking**: Monitor academic performance with detailed grade reports
- **Schedule Management**: View class schedules and timetables
- **Profile Management**: Update personal information and account settings

### Teacher Portal
- **Teacher Dashboard**: Overview of assigned courses and student enrollments
- **Course Management**: Create and manage course content, assignments, and materials
- **Grade Management**: Enter and update student grades with comprehensive grading tools
- **Schedule Management**: View teaching schedule and manage class times
- **Student Management**: Monitor student progress and enrollment status

### Administrator Portal
- **User Management**: Create and manage student, teacher, and administrator accounts
- **System Administration**: Configure system settings and manage institutional data
- **Reporting**: Generate comprehensive reports on students, courses, and institutional metrics
- **Academic Management**: Manage programs, courses, and curriculum

### Shared Features
- **Authentication**: Secure login system with role-based access control
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Chatbot Integration**: AI-powered assistance for common queries
- **Password Recovery**: Secure password reset functionality
- **Multi-language Support**: English language interface (extensible for other languages)

## 🛠️ Technology Stack

- **Framework**: Angular 19.2.0
- **Language**: TypeScript 5.7.2
- **UI Framework**: Bootstrap 5.3.6
- **Icons**: Bootstrap Icons 1.13.1
- **HTTP Client**: Angular HTTP Client with interceptors
- **Authentication**: JWT token management
- **PDF Generation**: jsPDF & jsPDF-AutoTable for reports
- **Screenshot**: html2canvas for visual reports
- **State Management**: Angular Services & RxJS
- **Testing**: Jasmine & Karma
- **Build Tool**: Angular CLI

## 📋 Prerequisites

- Node.js 18.x or higher
- Angular CLI 19.x or higher
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Access to the School Management API backend

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `src/environments/environment.ts` file:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000', // Your API URL
  jwtSecret: 'your-jwt-secret',    // For token validation (if needed)
};
```

For production, update `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-api-domain.com',
  jwtSecret: 'your-production-jwt-secret',
};
```

### 4. Start the Development Server

```bash
ng serve
```

The application will be available at `http://localhost:4200/`

### 5. Build for Production

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/          # Reusable components
│   ├── guards/              # Route guards
│   ├── models/              # TypeScript interfaces and models
│   ├── modules/             # Feature modules
│   │   ├── admin/           # Administrator features
│   │   ├── chatbot/         # Chatbot integration
│   │   ├── footer/          # Footer component
│   │   ├── forgot-password/ # Password recovery
│   │   ├── home/            # Home page
│   │   ├── login/           # Authentication
│   │   ├── profile/         # User profile management
│   │   ├── student/         # Student features
│   │   └── teacher/         # Teacher features
│   ├── services/            # API and business logic services
│   ├── app.component.ts     # Root component
│   ├── app.config.ts        # Application configuration
│   └── app.routes.ts        # Routing configuration
├── assets/                  # Static assets
├── environments/            # Environment configurations
└── styles/                  # Global styles
```

## 🔧 Development

### Available Scripts

```bash
# Development
ng serve                    # Start development server
ng serve --ssl              # Start with SSL
ng serve --port 4300        # Start on different port

# Building
ng build                    # Build for development
ng build --prod            # Build for production
ng build --configuration production --base-href /your-path/

# Testing
ng test                     # Run unit tests
ng test --watch             # Run tests in watch mode
ng test --code-coverage     # Run tests with coverage report

# Code Generation
ng generate component component-name    # Generate component
ng generate service service-name        # Generate service
ng generate module module-name          # Generate module
ng generate guard guard-name            # Generate guard
ng generate interface interface-name    # Generate interface

# Linting and Formatting
ng lint                     # Run linting
ng format                   # Format code (if configured)
```

### Component Generation

```bash
# Generate a new component in a specific module
ng generate component modules/student/new-feature --module=student

# Generate a service
ng generate service services/auth

# Generate a guard
ng generate guard guards/auth --implements=CanActivate
```

## 🔐 Authentication

The application uses JWT-based authentication:

### Login Flow
1. User enters credentials on login page
2. Credentials are sent to the API
3. API validates and returns JWT token
4. Token is stored in localStorage
5. User is redirected to appropriate dashboard

### Route Guards
- `auth.guard.ts`: Protects routes requiring authentication
- Redirects unauthenticated users to login page
- Token validation and expiration handling

### Token Management
```typescript
// Authentication service methods
login(credentials: LoginRequest): Observable<AuthResponse>
logout(): void
isLoggedIn(): boolean
getCurrentUser(): User | null
getToken(): string | null
```

## 📊 Services Architecture

### Core Services

#### AuthService
```typescript
// Handles authentication, token management, and user session
login(credentials: LoginRequest)
logout()
register(userData: RegisterRequest)
forgotPassword(email: string)
resetPassword(token: string, newPassword: string)
```

#### UserService
```typescript
// Manages user data and profile information
getCurrentUser()
updateProfile(userData: Partial<User>)
changePassword(currentPassword: string, newPassword: string)
```

#### StudentService
```typescript
// Student-specific operations
getStudentData()
getEnrolledCourses()
getGrades()
getSchedule()
enrollInCourse(courseId: string)
dropCourse(courseId: string)
```

#### TeacherService
```typescript
// Teacher-specific operations
getTeacherData()
getAssignedCourses()
getCourseStudents(courseId: string)
updateGrades(courseId: string, grades: Grade[])
```

### HTTP Interceptors

#### AuthInterceptor
- Automatically adds JWT token to outgoing requests
- Handles token refresh and expiration
- Manages error responses for authentication failures

#### ErrorInterceptor
- Centralized error handling
- User-friendly error messages
- Logging for debugging

## 🎨 UI/UX Components

### Bootstrap Integration
- **Grid System**: Responsive layout using Bootstrap grid
- **Components**: Buttons, forms, modals, navigation
- **Utilities**: Spacing, colors, typography utilities

### Custom Components
- **Loading Indicators**: Spinners for async operations
- **Error Messages**: Consistent error display
- **Success Notifications**: Toast notifications for user feedback
- **Data Tables**: Sortable, paginated tables for data display
- **Charts**: Visual representations of academic data

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- **Mobile**: < 576px
- **Tablet**: 576px - 768px
- **Desktop**: 768px - 992px
- **Large Desktop**: > 992px

### Mobile Optimizations
- Touch-friendly interface
- Collapsible navigation
- Optimized form layouts
- Reduced data usage

## 🔧 Configuration

### Angular Configuration (`angular.json`)
Key configurations:
- Build optimizations
- Asset management
- Development server settings
- Testing configuration

### TypeScript Configuration (`tsconfig.json`)
- Strict type checking enabled
- Path mapping for clean imports
- Modern ES target for optimal performance

## 🧪 Testing

### Unit Testing
```bash
# Run all tests
ng test

# Run tests for specific file
ng test --include="**/auth.service.spec.ts"

# Run tests with coverage
ng test --code-coverage --watch=false
```

### Test Structure
- **Component Tests**: Test component behavior and rendering
- **Service Tests**: Test business logic and API interactions
- **Guard Tests**: Test route protection logic
- **Integration Tests**: Test component interactions

### Mock Services
Example of service mocking:
```typescript
class MockAuthService {
  login() {
    return of({ token: 'mock-token', user: mockUser });
  }
  
  isLoggedIn() {
    return true;
  }
}
```

## 📦 PDF Generation

The application includes PDF generation capabilities:

### Features
- **Grade Reports**: Generate student grade reports
- **Schedule Reports**: Export class schedules
- **Enrollment Reports**: Create enrollment documentation
- **Custom Reports**: Flexible report generation

### Implementation
```typescript
// Example PDF generation
generateGradeReport(studentId: string): void {
  const doc = new jsPDF();
  autoTable(doc, {
    head: [['Course', 'Grade', 'Credits']],
    body: this.formatGradesForPDF(this.grades),
  });
  doc.save(`grade-report-${studentId}.pdf`);
}
```

## 🤖 Chatbot Integration

### Features
- **24/7 Support**: Automated assistance for common queries
- **Course Information**: Help with course-related questions
- **Technical Support**: Assistance with application usage
- **FAQ Integration**: Predefined responses to frequent questions

### Implementation
- Component-based architecture
- Configurable responses
- Fallback to human support
- Analytics integration for improvement

## 🔒 Security Best Practices

### Client-Side Security
- **XSS Prevention**: Input sanitization and output encoding
- **CSRF Protection**: Angular's built-in CSRF protection
- **Secure Storage**: Sensitive data in httpOnly cookies when possible
- **Content Security Policy**: Configurable CSP headers

### API Security
- **JWT Validation**: Token validation on every protected request
- **HTTPS Only**: Enforce secure connections in production
- **Rate Limiting**: Prevent abuse through rate limiting
- **Input Validation**: Client and server-side validation

## 🌍 Internationalization (i18n)

The application is structured for multi-language support:

### Current Support
- **English**: Primary language interface

### Future Enhancements
- **Spanish**: Full Spanish translation
- **French**: French language support
- **Dynamic Language Switching**: Runtime language switching

### Implementation
```typescript
// Example i18n structure
translate(key: string): string {
  return this.translations[this.currentLanguage][key] || key;
}
```

## 📊 Performance Optimization

### Lazy Loading
Feature modules are lazy-loaded for optimal initial load time:
```typescript
const routes: Routes = [
  {
    path: 'student',
    loadChildren: () => import('./modules/student/student.module').then(m => m.StudentModule)
  }
];
```

### Bundle Analysis
```bash
# Analyze bundle size
ng build --stats-json
npx webpack-bundle-analyzer dist/stats.json
```

### Optimization Techniques
- **Tree Shaking**: Eliminate unused code
- **AOT Compilation**: Ahead-of-time compilation for production
- **Minification**: Code and asset minification
- **Compression**: Gzip compression for assets

## 🚀 Deployment

### Build Process
```bash
# Production build
ng build --configuration production

# Build with specific base URL
ng build --configuration production --base-href /school-app/
```

### Deployment Options

#### Static Hosting
- **Netlify**: Easy deployment with continuous integration
- **Vercel**: Optimized for Angular applications
- **GitHub Pages**: Free hosting for public repositories
- **AWS S3**: Scalable static hosting

#### Server-Side Rendering
Future enhancement with Angular Universal for SEO benefits.

### Environment Configuration
Production environment variables are configured in:
- `src/environments/environment.prod.ts`
- Build-time configuration for security

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make changes with proper TypeScript typing
4. Add tests for new functionality
5. Run linting: `ng lint`
6. Run tests: `ng test`
7. Commit changes: `git commit -m 'Add new feature'`
8. Push branch: `git push origin feature/new-feature`
9. Create Pull Request

### Code Style
- **TypeScript**: Strict typing enabled
- **Angular Style Guide**: Follow Angular style recommendations
- **Component Naming**: PascalCase for components, kebab-case for files
- **Service Naming**: CamelCase with descriptive names
- **Consistent Imports**: Group imports by type

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the [Angular Documentation](https://angular.io/docs)
- Review the component documentation in the codebase

## 🔮 Future Enhancements

### Planned Features
- **Offline Support**: Progressive Web App (PWA) capabilities
- **Real-time Notifications**: WebSocket integration for live updates
- **Advanced Analytics**: Detailed learning analytics and insights
- **Mobile App**: Native mobile application using Ionic/NativeScript
- **Video Conferencing**: Integrated video classes and meetings
- **File Management**: Document upload and management system
- **Calendar Integration**: Sync with external calendar applications
- **Dark Mode**: Theme switching for user preference
- **Accessibility**: Enhanced WCAG compliance
- **Performance Dashboard**: Real-time application performance monitoring

### Technical Improvements
- **State Management**: Implement NgRx for complex state management
- **Micro-frontends**: Split application into independent micro-frontends
- **Web Workers**: Background processing for heavy computations
- **Service Workers**: Enhanced offline capabilities
- **GraphQL**: Consider GraphQL API integration
- **WebAssembly**: Performance-critical computations