import { Injectable } from '@angular/core';
import { ApiService } from './solicitudes.service';
import { Observable } from 'rxjs';
import { StudentInfo } from '../models/student-info';
import { EstudiantesMatriculados } from '../models/reportes/estudiantes-matriculados';
import { Teacher } from '../models/teacher';
import { EnrollmentCourseEx } from '../models/enrollment-course-ex';
import { Course } from '../models/course';
import { CourseInstancia } from '../models/course-instancia';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private apiService: ApiService) { }

  getEstudiantes(): Observable<EstudiantesMatriculados[]> {
    return this.apiService.get<EstudiantesMatriculados[]>('/enrollments-programs');
  }

  getDocentes(): Observable<Teacher[]> {
    return this.apiService.get<Teacher[]>('/teachers');
  }

  getEnrollmentCourseExtension(): Observable<EnrollmentCourseEx[]> {
    return this.apiService.get<EnrollmentCourseEx[]>('/enrollments-extension');
  }
  //funcion para obtener el curso de extension desde la id de la instancia del curso de extension
  getCourseExtensionByInstanceId(instanceId: number): Observable<Course[]> {
    return this.apiService.get<CourseInstancia[]>(`/extesnion-courses-instances/search?id=${instanceId}`).pipe(
      // aseguramos que haya al menos un resultado
      switchMap((instances: CourseInstancia[]) => {
        const courseId = instances[0]?.extensionCourseId;
        if (!courseId) {
          throw new Error('No se encontró la instancia del curso de extensión');
        }
        return this.apiService.get<Course[]>(`/extension-courses/${courseId}`);
      })
    );
  }
  getStudentById(studentId: number): Observable<StudentInfo[]> {
    return this.apiService.get<StudentInfo[]>(`/students/${studentId}`);
  }
}
